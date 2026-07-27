export async function GET() {
  return new Response(
    JSON.stringify({
      name: "GestionIHA-Finanzas MCP Server",
      version: "1.0.0",
      description: "Servidor MCP interno para integración agéntica con Hermes y el Ecosistema AlianeD",
      capabilities: {
        tools: ["query_sql", "get_balances", "get_budget", "get_dgii_606"],
        prompts: ["financial_summary", "tax_recommendations"],
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { method, params } = body || {};

    if (method === "tools/list") {
      return new Response(
        JSON.stringify({
          tools: [
            { name: "get_balances_summary", description: "Obtiene el resumen de saldos por cuenta y moneda." },
            { name: "get_budget_matrix", description: "Obtiene la matriz presupuestaria mensual." },
          ],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ result: "MCP call processed", method, params }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid MCP request" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}
