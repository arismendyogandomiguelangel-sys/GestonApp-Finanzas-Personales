"use client";

import React from "react";

export default function ClientsFrequencyPage() {
  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto", color: "#f8fafc" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: "700", marginBottom: "8px" }}>📈 Análisis de Frecuencia y Promedios de Compra</h1>
      <p style={{ color: "#94a3b8", marginBottom: "24px" }}>
        Frecuencia de recompra y comportamiento comercial de tus clientes.
      </p>

      <div style={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "10px", padding: "16px", display: "flex", justifyContent: "space-between" }}>
        <span>INDUSTRIAS BANILEJAS</span>
        <span style={{ color: "#818cf8", fontWeight: "600" }}>Frecuencia: Cada 15 días</span>
      </div>
    </div>
  );
}
