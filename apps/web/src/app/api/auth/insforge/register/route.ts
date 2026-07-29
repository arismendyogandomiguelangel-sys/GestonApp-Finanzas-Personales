import { z } from "zod";

import { InsforgeSignInError, registerWithPassword } from "@/server/insforgeAuth";
import { handleRoute } from "@/server/api/handleRoute";
import { jsonNoStore } from "@/server/api/noStore";
import { log } from "@/server/logger";

export const dynamic = "force-dynamic";

const registrationSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6),
});

export const POST = async (request: Request): Promise<Response> =>
  handleRoute(
    { route: "/api/auth/insforge/register", method: "POST", internalErrorMessage: "Registration failed" },
    async (): Promise<Response> => {
      const parsed = registrationSchema.safeParse(await request.json().catch(() => null));
      if (!parsed.success) {
        return jsonNoStore({ error: "Usa un correo válido y una contraseña de al menos 6 caracteres" }, { status: 400 });
      }

      try {
        const registration = await registerWithPassword(parsed.data.email, parsed.data.password);
        return jsonNoStore({ requiresEmailVerification: registration.requiresEmailVerification });
      } catch (err) {
        if (err instanceof InsforgeSignInError) {
          log({ domain: "auth", action: "insforge_registration_rejected", error: err.message });
          const error = err.status === 409
            ? "Este correo ya está registrado. Inicia sesión."
            : "No se pudo crear la cuenta";
          return jsonNoStore({ error }, { status: err.status });
        }
        throw err;
      }
    },
  );
