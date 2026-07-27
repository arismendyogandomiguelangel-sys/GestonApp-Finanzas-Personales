"use client";

import React from "react";

export default function ExportPage() {
  const handleExportCsv = () => {
    const csvContent = "data:text/csv;charset=utf-8,Fecha,Descripcion,Monto,Moneda\n2026-07-25,Supermercado,4850.00,DOP\n2026-07-22,Farmacia,1250.00,DOP\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "reporte_finanzas_gfp.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto", color: "#f8fafc" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: "700", margin: 0 }}>📤 Centro de Exportación Multi-Formato</h1>
        <p style={{ color: "#94a3b8", marginTop: "4px" }}>
          Exportación de reportes y datos financieros en CSV, Excel (.xlsx), PDF y TXT.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
        <div style={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "20px" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>📊</div>
          <h3 style={{ margin: "0 0 6px", fontSize: "1.1rem" }}>Exportar a CSV / Excel</h3>
          <p style={{ color: "#94a3b8", fontSize: "0.875rem", marginBottom: "16px" }}>
            Formato estándar abierto para hojas de cálculo.
          </p>
          <button
            onClick={handleExportCsv}
            style={{ backgroundColor: "#6366f1", color: "#fff", border: "none", borderRadius: "6px", padding: "8px 16px", fontWeight: "600", cursor: "pointer" }}
          >
            Descargar CSV
          </button>
        </div>

        <div style={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "20px" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>🏛️</div>
          <h3 style={{ margin: "0 0 6px", fontSize: "1.1rem" }}>Formatos DGII (606/607)</h3>
          <p style={{ color: "#94a3b8", fontSize: "0.875rem", marginBottom: "16px" }}>
            Archivos TXT para Oficina Virtual DGII.
          </p>
          <a
            href="/vouchers/dgii"
            style={{ backgroundColor: "#10b981", color: "#fff", border: "none", borderRadius: "6px", padding: "8px 16px", fontWeight: "600", textDecoration: "none", display: "inline-block" }}
          >
            Ir a Formatos DGII
          </a>
        </div>
      </div>
    </div>
  );
}
