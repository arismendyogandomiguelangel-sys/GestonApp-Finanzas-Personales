export type AuthMode = "none" | "cognito" | "insforge";

type AuthModeEnv = Readonly<{
  AUTH_MODE?: string;
  NODE_ENV?: string;
  HOST?: string;
  CORS_ORIGIN?: string;
  INSFORGE_BASE_URL?: string;
}>;

const LOCAL_HOSTS: ReadonlySet<string> = new Set([
  "127.0.0.1",
  "localhost",
  "::1",
]);

const normalizeHost = (value: string): string =>
  value.replace(/^\[(.*)\]$/u, "$1").trim().toLowerCase();

const isLocalHost = (value: string): boolean =>
  LOCAL_HOSTS.has(normalizeHost(value));

const isLocalHttpOrigin = (value: string): boolean => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" && isLocalHost(url.hostname);
  } catch {
    return false;
  }
};

const isHttpsUrl = (value: string): boolean => {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
};

/**
 * AUTH_MODE=insforge — identity comes from an InsForge-issued RS256 JWT held in
 * the `session` cookie and verified against the project JWKS. Unlike "none",
 * this mode is safe in production: every request carries a signed identity.
 */
const getInsforgeValidationErrors = (env: AuthModeEnv): ReadonlyArray<string> => {
  const errors: Array<string> = [];

  const baseUrl = env.INSFORGE_BASE_URL;
  if (baseUrl === undefined || baseUrl.trim() === "") {
    errors.push("AUTH_MODE=insforge requires INSFORGE_BASE_URL (e.g. https://<app>.insforge.app)");
  } else if (!isHttpsUrl(baseUrl)) {
    errors.push(`AUTH_MODE=insforge requires INSFORGE_BASE_URL to be an https URL. Received "${baseUrl}"`);
  }

  const corsOrigin = env.CORS_ORIGIN;
  if (corsOrigin === undefined || corsOrigin.trim() === "") {
    errors.push("AUTH_MODE=insforge requires CORS_ORIGIN to be set (required for CSRF protection)");
  } else if (!isHttpsUrl(corsOrigin) && !isLocalHttpOrigin(corsOrigin)) {
    errors.push(
      `AUTH_MODE=insforge requires CORS_ORIGIN to be an https origin (or a local http origin in dev). Received "${corsOrigin}"`,
    );
  }

  return errors;
};

export const getAuthModeValidationErrors = (env: AuthModeEnv): ReadonlyArray<string> => {
  const rawAuthMode = env.AUTH_MODE;
  if (rawAuthMode === undefined || rawAuthMode.trim() === "") {
    return ['AUTH_MODE must be set explicitly to "none" or "cognito"'];
  }

  if (rawAuthMode !== "none" && rawAuthMode !== "cognito" && rawAuthMode !== "insforge") {
    return [`Invalid AUTH_MODE="${rawAuthMode}". Expected "none", "cognito", or "insforge"`];
  }

  if (rawAuthMode === "cognito") {
    return [];
  }

  if (rawAuthMode === "insforge") {
    return getInsforgeValidationErrors(env);
  }

  const errors: Array<string> = [];

  if (env.NODE_ENV === "production") {
    errors.push("AUTH_MODE=none is not allowed when NODE_ENV=production");
  }

  const host = env.HOST ?? "127.0.0.1";
  if (!isLocalHost(host)) {
    errors.push(`AUTH_MODE=none requires HOST to be localhost, 127.0.0.1, or ::1. Received "${host}"`);
  }

  const corsOrigin = env.CORS_ORIGIN;
  if (corsOrigin === undefined || corsOrigin.trim() === "") {
    errors.push("AUTH_MODE=none requires CORS_ORIGIN to be set to a local http origin");
  } else if (!isLocalHttpOrigin(corsOrigin)) {
    errors.push(
      `AUTH_MODE=none requires CORS_ORIGIN to be a local http origin (localhost, 127.0.0.1, or ::1). Received "${corsOrigin}"`,
    );
  }

  return errors;
};

export const getConfiguredAuthMode = (env: AuthModeEnv): AuthMode => {
  const errors = getAuthModeValidationErrors(env);
  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }

  const authMode = env.AUTH_MODE;
  if (authMode === "none" || authMode === "cognito" || authMode === "insforge") {
    return authMode;
  }

  throw new Error('AUTH_MODE must be set explicitly to "none", "cognito", or "insforge"');
};
