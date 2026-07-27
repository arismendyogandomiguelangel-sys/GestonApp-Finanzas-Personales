"use client";

import React from "react";

export default function ClientsHistoryPage() {
  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto", color: "#f8fafc" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: "700", marginBottom: "8px" }}>📜 Historial de Transacciones por Cliente</h1>
      <p style={{ color: "#94a3b8", marginBottom: "24px" }}>
        Registro detallado de facturas emitidas y pagos recibidos por cliente.
      </p>

      <div style={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "10px", padding: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem" }}>
          <span>Factura #B0100023489 — INDUSTRIAS BANILEJAS</span>
          <strong style={{ color: "#10b981" }}>RD$ 150,000.00</strong>
        </div>
      </div>
    </div>
  );
}
