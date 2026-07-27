"use client";

import React from "react";

export default function FiscalDeduciblesPage() {
  const categories = [
    { name: "Gastos de Representación y Servicios", pct: "100% Deducible", desc: "Comprobante B01 válido para crédito fiscal" },
    { name: "Alquiler de Oficina", pct: "100% Deducible", desc: "Con retención ISR correspondiente" },
    { name: "Combustible y Transporte", pct: "80% Deducible", desc: "Sujeto a tope de actividad económica" },
  ];

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto", color: "#f8fafc" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: "700", marginBottom: "8px" }}>🏷️ Clasificación de Gastos Deducibles de ISR</h1>
      <p style={{ color: "#94a3b8", marginBottom: "24px" }}>
        Mapeo inteligente de categorías admitidas por la DGII para reducción de Impuesto Sobre la Renta.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {categories.map((c, i) => (
          <div key={i} style={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "10px", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ margin: "0 0 4px", fontSize: "1.05rem" }}>{c.name}</h3>
              <span style={{ fontSize: "0.825rem", color: "#94a3b8" }}>{c.desc}</span>
            </div>
            <span style={{ backgroundColor: "rgba(16, 185, 129, 0.15)", color: "#10b981", padding: "4px 10px", borderRadius: "6px", fontSize: "0.85rem", fontWeight: "600" }}>
              {c.pct}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
