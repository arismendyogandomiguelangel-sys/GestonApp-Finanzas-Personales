export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body || {};

    if (!email || !password || !name) {
      return new Response(
        JSON.stringify({ error: "Todos los campos son obligatorios." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        user: {
          name,
          email,
        },
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `auth_user=${encodeURIComponent(email)}; Path=/; HttpOnly; SameSite=Lax`,
        },
      }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Error en el servidor al registrar usuario." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
