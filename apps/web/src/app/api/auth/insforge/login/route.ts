/**
 * Sign in against InsForge and store the resulting session in HttpOnly cookies.
 *
 * The browser never sees the access or refresh token: InsForge sets its refresh
 * cookie on its own domain, so this route captures it and re-issues it under
 * the app's domain where proxy.ts can read it.
 */
import { z } from "zod";

import { signInWithPassword, InsforgeSignInError } from "@/server/insforgeAuth";
import { applyNoStoreHeaders, jsonNoStore } from "@/server/api/noStore";
import { handleRoute } from "@/server/api/handleRoute";
import { log } from "@/server/logger";

export const dynamic = "force-dynamic";

const SESSION_MAX_AGE_SECONDS = 604800;

const credentialsSchema = z.object({
  email: z.string().trim().min(1),
  password: z.string().min(1),
});

const cookieAttributes = (): string => {
  const cookieDomain = process.env.COOKIE_DOMAIN ?? "";
  const domainAttr = cookieDomain !== "" ? `; Domain=${cookieDomain}` : "";
  return `Path=/; Max-Age=${SESSION_MAX_AGE_SECONDS}; Secure; SameSite=Lax${domainAttr}`;
};

export const POST = async (request: Request): Promise<Response> =>
  handleRoute(
    { route: "/api/auth/insforge/login", method: "POST", internalErrorMessage: "Sign-in failed" },
    async (): Promise<Response> => {
      const parsed = credentialsSchema.safeParse(await request.json().catch(() => null));
      if (!parsed.success) {
        return jsonNoStore({ error: "Email and password are required" }, { status: 400 });
      }

      let session;
      try {
        session = await signInWithPassword(parsed.data.email, parsed.data.password);
      } catch (err) {
        if (err instanceof InsforgeSignInError) {
          // Log the reason server-side but never leak which factor failed.
          log({ domain: "auth", action: "insforge_sign_in_rejected", error: err.message });
          return jsonNoStore({ error: "Invalid credentials" }, { status: 401 });
        }
        throw err;
      }

      const attrs = cookieAttributes();
      const headers = applyNoStoreHeaders();
      headers.append("Set-Cookie", `session=${encodeURIComponent(session.accessToken)}; ${attrs}; HttpOnly`);
      headers.append("Set-Cookie", `refresh=${encodeURIComponent(session.refreshToken)}; ${attrs}; HttpOnly`);
      headers.append("Set-Cookie", `insforge_csrf=${encodeURIComponent(session.csrfToken)}; ${attrs}; HttpOnly`);
      // Non-HttpOnly indicator so the UI can tell it is signed in.
      headers.append("Set-Cookie", `logged_in=1; ${attrs}`);
      headers.set("Content-Type", "application/json");

      return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
    },
  );
