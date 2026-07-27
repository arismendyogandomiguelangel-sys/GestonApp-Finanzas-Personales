"use client";

import React from "react";

export default function ClientsPage() {
  const clients = [
    { name: "INDUSTRIAS BANILEJAS C. X A.", rnc: "101002341", phone: "809-555-0199", email: "contacto@induban.com.do", billed: "RD$ 450,000.00" },
    { name: "GRUPO PUNTA CANA S.A.", rnc: "101998822", phone: "809-555-8822", email: "compras@puntacana.com", billed: "RD$ 280,000.00" },
  ];

  return (
    <div style={{ padding: "24px", maxWidth: "1000px", margin: "0 auto", color: "#f8fafc" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: "700", margin: 0 }}>👥 Directorio de Clientes y Suplidores</h1>
          <p style={{ color: "#94a3b8", marginTop: "4px" }}>
            Gestión comercial y CRM ligero para facturación y cobros.
          </p>
        </div>
        <button
          style={{ backgroundColor: "#6366f1", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 18px", fontWeight: "600", cursor: "pointer" }}
          onClick={() => alert("Nuevo Cliente: agregar RNC/Cédula y datos de contacto.")}
        >
          + Agregar Cliente
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
        {clients.map((c, i) => (
          <div key={i} style={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "20px" }}>
            <h3 style={{ margin: "0 0 6px", fontSize: "1.1rem" }}>{c.name}</h3>
            <span style={{ fontSize: "0.85rem", color: "#94a3b8", display: "block", marginBottom: "12px" }}>RNC: {c.rnc}</span>
            <div style={{ fontSize: "0.85rem", color: "#cbd5e1", display: "flex", flexDirection: "column", gap: "4px" }}>
              <span>📞 {c.phone}</span>
              <span>✉️ {c.email}</span>
            </div>
            <div style={{ borderTop: "1px solid #334155", marginTop: "12px", paddingTop: "12px", display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
              <span style={{ color: "#94a3b8" }}>Total Facturado:</span>
              <strong style={{ color: "#10b981" }}>{c.billed}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
