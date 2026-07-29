/**
 * InsForge JWT verification for the web app.
 *
 * InsForge signs session tokens with RS256 and publishes the matching public key
 * at /.well-known/jwks.json, so the app never stores a signing secret. The
 * remote key set is cached and rotated by `jose` automatically.
 *
 * Used by proxy.ts to turn the `session` cookie into a trusted identity.
 */
import { createRemoteJWKSet, jwtVerify, errors as joseErrors } from "jose";

export type InsforgeIdentity = Readonly<{
  userId: string;
  email: string;
  emailVerified: boolean;
}>;

/** Thrown when the token is structurally valid but past its expiry. */
export class InsforgeTokenExpiredError extends Error {
  constructor() {
    super("InsForge session token expired");
    this.name = "InsforgeTokenExpiredError";
  }
}

const getBaseUrl = (): string => {
  const baseUrl = process.env.INSFORGE_BASE_URL ?? "";
  if (baseUrl === "") throw new Error("INSFORGE_BASE_URL is not configured");
  return baseUrl.replace(/\/+$/u, "");
};

let jwks: ReturnType<typeof createRemoteJWKSet> | undefined;
let jwksOrigin: string | undefined;

const getJwks = (): ReturnType<typeof createRemoteJWKSet> => {
  const baseUrl = getBaseUrl();
  // Rebuild the key set if the configured project changed (test/dev swaps).
  if (jwks !== undefined && jwksOrigin === baseUrl) return jwks;
  jwksOrigin = baseUrl;
  jwks = createRemoteJWKSet(new URL(`${baseUrl}/.well-known/jwks.json`));
  return jwks;
};

const readEmail = (payload: Record<string, unknown>): string => {
  const email = payload.email;
  if (typeof email !== "string" || email === "") {
    throw new Error("InsForge JWT payload missing email claim");
  }
  return email;
};

/**
 * InsForge does not put an email_verified claim in the access token: it refuses
 * to issue one at all until the project's verification policy is satisfied.
 * Holding a valid token therefore means the identity cleared that policy, so an
 * absent claim is read as verified. This value is only mirrored into `users`
 * for auditing — it is never used as an authorization gate.
 */
const readEmailVerified = (payload: Record<string, unknown>): boolean => {
  const claim = payload.email_verified ?? payload.emailVerified;
  return typeof claim === "boolean" ? claim : true;
};

const REFRESH_COOKIE_NAME = "insforge_refresh_token";

/**
 * Tokens returned by sign-in and refresh.
 *
 * The access token is short-lived (~15 min); the refresh token lives for a week
 * and is rotated on every refresh, so callers must persist the new value.
 * `csrfToken` is required by InsForge to accept a refresh call.
 */
export type InsforgeSession = Readonly<{
  accessToken: string;
  refreshToken: string;
  csrfToken: string;
}>;

export type InsforgeRegistration = Readonly<{
  requiresEmailVerification: boolean;
}>;

const getAnonKey = (): string => {
  const anonKey = process.env.INSFORGE_ANON_KEY ?? "";
  if (anonKey === "") throw new Error("INSFORGE_ANON_KEY is not configured");
  return anonKey;
};

/** Pull the rotated refresh token out of the Set-Cookie header InsForge returns. */
const readRefreshCookie = (response: Response): string => {
  const setCookie = response.headers.get("set-cookie") ?? "";
  const match = new RegExp(`${REFRESH_COOKIE_NAME}=([^;]+)`, "u").exec(setCookie);
  if (match === null) {
    throw new Error("InsForge did not return a refresh token cookie");
  }
  return match[1];
};

const readSession = async (response: Response): Promise<InsforgeSession> => {
  const body = await response.json() as Record<string, unknown>;
  const accessToken = body.accessToken;
  const csrfToken = body.csrfToken;
  if (typeof accessToken !== "string" || accessToken === "") {
    throw new Error("InsForge response did not include an access token");
  }
  if (typeof csrfToken !== "string" || csrfToken === "") {
    throw new Error("InsForge response did not include a CSRF token");
  }
  return { accessToken, refreshToken: readRefreshCookie(response), csrfToken };
};

/** Thrown when InsForge rejects the credentials (wrong password, unverified email). */
export class InsforgeSignInError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "InsforgeSignInError";
    this.status = status;
  }
}

export const signInWithPassword = async (
  email: string,
  password: string,
): Promise<InsforgeSession> => {
  const response = await fetch(`${getBaseUrl()}/api/auth/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAnonKey()}`,
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({})) as Record<string, unknown>;
    const message = typeof body.message === "string" ? body.message : "Sign-in failed";
    throw new InsforgeSignInError(message, response.status);
  }

  return readSession(response);
};

export const registerWithPassword = async (
  email: string,
  password: string,
): Promise<InsforgeRegistration> => {
  const response = await fetch(`${getBaseUrl()}/api/auth/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAnonKey()}`,
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({})) as Record<string, unknown>;
    const message = typeof body.message === "string" ? body.message : "Registration failed";
    throw new InsforgeSignInError(message, response.status);
  }

  const body = await response.json() as Record<string, unknown>;
  return { requiresEmailVerification: body.requireEmailVerification === true };
};

export const verifyEmailCode = async (
  email: string,
  otp: string,
): Promise<InsforgeSession> => {
  const response = await fetch(`${getBaseUrl()}/api/auth/email/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAnonKey()}`,
    },
    body: JSON.stringify({ email, otp }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({})) as Record<string, unknown>;
    const message = typeof body.message === "string" ? body.message : "Email verification failed";
    throw new InsforgeSignInError(message, response.status);
  }

  return readSession(response);
};

/**
 * Exchange a refresh token for a fresh access token. InsForge rotates the
 * refresh token on every call, so the returned session must replace the stored
 * one or the next refresh will fail.
 */
export const refreshInsforgeSession = async (
  refreshToken: string,
  csrfToken: string,
): Promise<InsforgeSession> => {
  const response = await fetch(`${getBaseUrl()}/api/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAnonKey()}`,
      Cookie: `${REFRESH_COOKIE_NAME}=${refreshToken}`,
      "x-csrf-token": csrfToken,
    },
  });

  if (!response.ok) {
    throw new Error(`InsForge refresh failed: ${response.status}`);
  }

  return readSession(response);
};

export const verifyInsforgeToken = async (token: string): Promise<InsforgeIdentity> => {
  try {
    const { payload } = await jwtVerify(token, getJwks(), {
      algorithms: ["RS256"],
    });

    const sub = payload.sub;
    if (typeof sub !== "string" || sub === "") {
      throw new Error("InsForge JWT payload missing sub claim");
    }

    return {
      userId: sub,
      email: readEmail(payload as Record<string, unknown>),
      emailVerified: readEmailVerified(payload as Record<string, unknown>),
    };
  } catch (err) {
    if (err instanceof joseErrors.JWTExpired) {
      throw new InsforgeTokenExpiredError();
    }
    throw err;
  }
};
