"use client";

import React from "react";
import { useProfile } from "@/ui/profile/profileContext";

export default function AgentMemoryPage() {
  const { getAgentDisplayName } = useProfile();

  const mockMemories = [
    { id: "m1", type: "Recurrente", fact: "Pago de luz EDENORTE por RD$2,300 el día 15 de cada mes", date: "2026-07-20" },
    { id: "m2", type: "Preferencia", fact: "Prefiere reportar presupuestos en DOP con conversión a USD", date: "2026-07-18" },
    { id: "m3", type: "Categoría", fact: "Gastos en supermercado agrupados en 'Alimentación'", date: "2026-07-15" },
  ];

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto", color: "#f8fafc" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: "700", marginBottom: "8px" }}>
        📚 Memoria y Conocimiento Adquirido de {getAgentDisplayName()}
      </h1>
      <p style={{ color: "#94a3b8", marginBottom: "24px" }}>
        Hechos, patrones e inferencias aprendidas progresivamente mediante tus interacciones.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {mockMemories.map((mem) => (
          <div
            key={mem.id}
            style={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "10px",
              padding: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "0.75rem",
                  backgroundColor: "rgba(16, 185, 129, 0.15)",
                  color: "#10b981",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontWeight: "600",
                  marginRight: "10px",
                }}
              >
                {mem.type}
              </span>
              <span style={{ fontSize: "0.95rem" }}>{mem.fact}</span>
            </div>
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>{mem.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
