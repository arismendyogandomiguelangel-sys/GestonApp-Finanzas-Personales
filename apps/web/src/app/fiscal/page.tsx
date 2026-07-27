"use client";

import React from "react";

export default function FiscalOverviewPage() {
  return (
    <div style={{ padding: "24px", maxWidth: "1000px", margin: "0 auto", color: "#f8fafc" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: "700", margin: 0 }}>🏢 Panel Fiscal DGII</h1>
        <p style={{ color: "#94a3b8", marginTop: "4px" }}>
          Control tributario para emprendedores y profesionales independientes en República Dominicana.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
        <div style={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "20px" }}>
          <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>ITBIS a Pagar Estimado (Mes)</span>
          <div style={{ fontSize: "1.75rem", fontWeight: "700", color: "#818cf8", margin: "6px 0" }}>RD$ 18,450.00</div>
          <span style={{ fontSize: "0.75rem", color: "#10b981" }}>Vence el día 20 del mes próximo</span>
        </div>

        <div style={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "20px" }}>
          <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Gastos Deducibles ISR</span>
          <div style={{ fontSize: "1.75rem", fontWeight: "700", color: "#10b981", margin: "6px 0" }}>85% Deducible</div>
          <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Basado en comprobantes válidos</span>
        </div>
      </div>
    </div>
  );
}
