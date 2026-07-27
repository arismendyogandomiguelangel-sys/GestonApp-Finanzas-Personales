"use client";

import React from "react";

export default function FiscalCalendarioPage() {
  const dates = [
    { day: "Día 15", title: "Retenciones de ISR (IR-17)", desc: "Pago de retenciones a terceros" },
    { day: "Día 20", title: "Declaración Jurada ITBIS (IT-1 / 606 / 607)", desc: "Presentación y pago del ITBIS mensual" },
  ];

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto", color: "#f8fafc" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: "700", marginBottom: "8px" }}>📆 Calendario de Obligaciones Fiscales DGII</h1>
      <p style={{ color: "#94a3b8", marginBottom: "24px" }}>
        Fechas límite de presentación y pago para evitar recargos e intereses indemnizatorios.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {dates.map((d, i) => (
          <div key={i} style={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "10px", padding: "16px", display: "flex", gap: "16px", alignItems: "center" }}>
            <div style={{ backgroundColor: "#6366f1", color: "#fff", padding: "8px 14px", borderRadius: "8px", fontWeight: "700", fontSize: "0.9rem" }}>
              {d.day}
            </div>
            <div>
              <h3 style={{ margin: "0 0 4px", fontSize: "1.05rem" }}>{d.title}</h3>
              <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>{d.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
