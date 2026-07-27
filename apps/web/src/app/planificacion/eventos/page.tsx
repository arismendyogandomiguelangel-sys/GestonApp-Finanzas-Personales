"use client";

import React, { useState } from "react";
import { FinancialEvent } from "@/server/planning";

const INITIAL_EVENTS: FinancialEvent[] = [
  {
    id: "e1",
    name: "Boda de Ensueño",
    eventType: "wedding",
    estimatedBudget: 350000,
    targetDate: "2027-06-20",
    items: [
      { id: "i1", name: "Reserva de Salón", estimatedCost: 100000, isPaid: true },
      { id: "i2", name: "Catering y Comida", estimatedCost: 120000, isPaid: false },
      { id: "i3", name: "Fotografía y Video", estimatedCost: 45000, isPaid: false },
      { id: "i4", name: "Trajes y Vestido", estimatedCost: 50000, isPaid: false },
    ],
  },
  {
    id: "e2",
    name: "Viaje a Europa",
    eventType: "travel",
    estimatedBudget: 180000,
    targetDate: "2027-09-10",
    items: [
      { id: "i5", name: "Boletos de Avión", estimatedCost: 85000, isPaid: false },
      { id: "i6", name: "Hospedaje y Hoteles", estimatedCost: 60000, isPaid: false },
      { id: "i7", name: "Seguro y Bolsillo", estimatedCost: 35000, isPaid: false },
    ],
  },
];

export default function PlanningEventsPage() {
  const [events] = useState<FinancialEvent[]>(INITIAL_EVENTS);

  return (
    <div style={{ padding: "24px", maxWidth: "1000px", margin: "0 auto", color: "#f8fafc" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: "700", margin: 0 }}>💍 Eventos Financieros Clave</h1>
          <p style={{ color: "#94a3b8", marginTop: "4px" }}>
            Planificación detallada de eventos importantes (Boda, Viajes, Vehículo, Vivienda).
          </p>
        </div>
        <button
          style={{
            backgroundColor: "#6366f1",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 18px",
            fontWeight: "600",
            cursor: "pointer",
          }}
          onClick={() => alert("Nuevo Evento: puedes configurar plantillas de Boda, Viaje, Vivienda, etc.")}
        >
          + Planificar Evento
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {events.map((event) => {
          const totalPaid = event.items.filter((i) => i.isPaid).reduce((acc, curr) => acc + curr.estimatedCost, 0);
          const totalEstimated = event.items.reduce((acc, curr) => acc + curr.estimatedCost, 0);

          return (
            <div
              key={event.id}
              style={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "12px",
                padding: "20px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: "600", margin: 0 }}>{event.name}</h3>
                  <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Fecha esperada: {event.targetDate}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "1.1rem", fontWeight: "700", color: "#818cf8" }}>
                    Presupuesto: RD$ {event.estimatedBudget.toLocaleString()}
                  </div>
                  <span style={{ fontSize: "0.8rem", color: "#10b981" }}>
                    Pagado: RD$ {totalPaid.toLocaleString()} / RD$ {totalEstimated.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid #334155", paddingTop: "12px" }}>
                {event.items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "#0f172a",
                      padding: "10px 14px",
                      borderRadius: "6px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ color: item.isPaid ? "#10b981" : "#94a3b8" }}>
                        {item.isPaid ? "✓" : "○"}
                      </span>
                      <span style={{ textDecoration: item.isPaid ? "line-through" : "none", color: item.isPaid ? "#94a3b8" : "#f8fafc" }}>
                        {item.name}
                      </span>
                    </div>
                    <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>RD$ {item.estimatedCost.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
