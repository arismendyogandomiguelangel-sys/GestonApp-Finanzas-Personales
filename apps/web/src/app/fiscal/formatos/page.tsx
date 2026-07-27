"use client";

import React from "react";

export default function FiscalFormatosPage() {
  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto", color: "#f8fafc" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: "700", marginBottom: "8px" }}>📊 Formatos Tributarios (606 / 607 / 608 / IT-1)</h1>
      <p style={{ color: "#94a3b8", marginBottom: "24px" }}>
        Generación directa de declaraciones mensuales y formatos de envío.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
        <div style={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "20px" }}>
          <h3 style={{ margin: "0 0 8px" }}>Formato 606</h3>
          <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Compras de Bienes y Servicios.</p>
          <a href="/vouchers/dgii" style={{ color: "#818cf8", fontWeight: "600", textDecoration: "none" }}>Generar 606 →</a>
        </div>
        <div style={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "20px" }}>
          <h3 style={{ margin: "0 0 8px" }}>Formato 607</h3>
          <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Ventas de Bienes y Servicios.</p>
          <a href="/vouchers/dgii" style={{ color: "#10b981", fontWeight: "600", textDecoration: "none" }}>Generar 607 →</a>
        </div>
      </div>
    </div>
  );
}
