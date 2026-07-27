"use client";

import React from "react";

export default function PlanningCalendarPage() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const eventsMap: Record<number, { title: string; type: "payday" | "bill" }[]> = {
    5: [{ title: "Alquiler Apartamento (RD$ 22,000)", type: "bill" }],
    14: [{ title: "Cobro de Nómina (RD$ 65,000)", type: "payday" }],
    15: [{ title: "Luz EDENORTE (RD$ 2,800)", type: "bill" }],
    20: [{ title: "Agua CAASD (RD$ 450)", type: "bill" }],
    25: [{ title: "Internet Claro (RD$ 2,150)", type: "bill" }],
    29: [{ title: "Cobro de Nómina (RD$ 65,000)", type: "payday" }],
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1000px", margin: "0 auto", color: "#f8fafc" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: "700", margin: 0 }}>📅 Calendario Financiero Mensual</h1>
        <p style={{ color: "#94a3b8", marginTop: "4px" }}>
          Fechas límite de pagos recurrentes y días de cobro de nómina/ingresos.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "8px",
          backgroundColor: "#0f172a",
          padding: "16px",
          borderRadius: "12px",
          border: "1px solid #334155",
        }}
      >
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((dayName) => (
          <div key={dayName} style={{ textAlign: "center", fontWeight: "700", color: "#64748b", fontSize: "0.85rem", paddingBottom: "8px" }}>
            {dayName}
          </div>
        ))}

        {days.map((day) => {
          const items = eventsMap[day] || [];
          const hasItems = items.length > 0;

          return (
            <div
              key={day}
              style={{
                backgroundColor: hasItems ? "#1e293b" : "rgba(30, 41, 59, 0.4)",
                border: "1px solid #334155",
                borderRadius: "8px",
                minHeight: "80px",
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <span style={{ fontSize: "0.85rem", fontWeight: "600", color: hasItems ? "#818cf8" : "#64748b" }}>
                {day}
              </span>

              {items.map((it, idx) => (
                <div
                  key={idx}
                  style={{
                    fontSize: "0.7rem",
                    padding: "2px 4px",
                    borderRadius: "4px",
                    backgroundColor: it.type === "payday" ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)",
                    color: it.type === "payday" ? "#10b981" : "#fca5a5",
                    lineHeight: "1.2",
                  }}
                >
                  {it.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
