export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body || {};

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "El correo y la contraseña son obligatorios." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Autenticación exitosa (en modo local / demo o mediante proxy)
    return new Response(
      JSON.stringify({
        success: true,
        user: {
          email,
          name: email.split("@")[0],
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `auth_user=${encodeURIComponent(email)}; Path=/; HttpOnly; SameSite=Lax`,
        },
      }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Error en el servidor al autenticar." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
