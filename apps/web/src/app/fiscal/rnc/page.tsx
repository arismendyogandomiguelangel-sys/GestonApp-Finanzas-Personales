"use client";

import React from "react";

export default function FiscalRncPage() {
  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto", color: "#f8fafc" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: "700", marginBottom: "8px" }}>🆔 Perfiles RNC Registrados</h1>
      <p style={{ color: "#94a3b8", marginBottom: "24px" }}>
        Gestión de registros RNC de tu empresa o servicios profesionales.
      </p>

      <div style={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: "1.1rem" }}>SERVICIOS TECNOLOGICOS ALIANED S.R.L.</h3>
            <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>RNC: 131-99882-1 • Persona Jurídica</span>
          </div>
          <span style={{ backgroundColor: "rgba(16, 185, 129, 0.15)", color: "#10b981", padding: "4px 10px", borderRadius: "6px", fontSize: "0.8rem", fontWeight: "600" }}>
            ACTIVO DGII
          </span>
        </div>
      </div>
    </div>
  );
}
