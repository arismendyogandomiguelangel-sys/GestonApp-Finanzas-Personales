import { z } from "zod";

import { InsforgeSignInError, verifyEmailCode } from "@/server/insforgeAuth";
import { handleRoute } from "@/server/api/handleRoute";
import { applyNoStoreHeaders, jsonNoStore } from "@/server/api/noStore";
import { log } from "@/server/logger";

export const dynamic = "force-dynamic";

const verificationSchema = z.object({
  email: z.string().trim().email(),
  code: z.string().regex(/^\d{6}$/u),
});

const SESSION_MAX_AGE_SECONDS = 604800;

const cookieAttributes = (): string => {
  const cookieDomain = process.env.COOKIE_DOMAIN ?? "";
  const domainAttr = cookieDomain !== "" ? `; Domain=${cookieDomain}` : "";
  return `Path=/; Max-Age=${SESSION_MAX_AGE_SECONDS}; Secure; SameSite=Lax${domainAttr}`;
};

export const POST = async (request: Request): Promise<Response> =>
  handleRoute(
    { route: "/api/auth/insforge/verify-email", method: "POST", internalErrorMessage: "Email verification failed" },
    async (): Promise<Response> => {
      const parsed = verificationSchema.safeParse(await request.json().catch(() => null));
      if (!parsed.success) {
        return jsonNoStore({ error: "Escribe el código de 6 dígitos enviado a tu correo" }, { status: 400 });
      }

      try {
        const session = await verifyEmailCode(parsed.data.email, parsed.data.code);
        const attrs = cookieAttributes();
        const headers = applyNoStoreHeaders();
        headers.append("Set-Cookie", `session=${encodeURIComponent(session.accessToken)}; ${attrs}; HttpOnly`);
        headers.append("Set-Cookie", `refresh=${encodeURIComponent(session.refreshToken)}; ${attrs}; HttpOnly`);
        headers.append("Set-Cookie", `insforge_csrf=${encodeURIComponent(session.csrfToken)}; ${attrs}; HttpOnly`);
        headers.append("Set-Cookie", `logged_in=1; ${attrs}`);
        headers.set("Content-Type", "application/json");
        return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
      } catch (err) {
        if (err instanceof InsforgeSignInError) {
          log({ domain: "auth", action: "insforge_email_verification_rejected", error: err.message });
          return jsonNoStore({ error: "El código es inválido o venció. Solicita uno nuevo." }, { status: 400 });
        }
        throw err;
      }
    },
  );
