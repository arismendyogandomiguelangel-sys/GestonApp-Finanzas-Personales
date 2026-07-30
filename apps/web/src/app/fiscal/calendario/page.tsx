"use client";

import React from "react";
import { ModuleHeaderIHA } from "@/ui/agent/ModuleHeaderIHA";
import styles from "../fiscal.module.css";

export default function FiscalCalendarioPage() {
  const dates = [
    {
      day: "Día 15 de cada mes",
      title: "Retenciones de ISR (Formato IR-17)",
      desc: "Pago de retenciones por servicios profesionales a terceros y honorarios contables.",
      status: "Próximo Vencimiento",
      badgeColor: "var(--warning)",
    },
    {
      day: "Día 20 de cada mes",
      title: "Declaración y Pago de ITBIS (IT-1 / 606 / 607)",
      desc: "Presentación y pago del ITBIS mensual originado en tu iguala fija y ventas de tienda online.",
      status: "Principal Obligación",
      badgeColor: "var(--accent)",
    },
    {
      day: "Día 31 de marzo / abril",
      title: "Declaración Jurada Anual (IR-1 / IR-2)",
      desc: "Presentación de la renta anual para personas físicas o jurídicas según terminación fiscal.",
      status: "Anual",
      badgeColor: "var(--success)",
    },
    {
      day: "Anticipos de ISR (3 cuotas)",
      title: "Pago de Anticipos de Impuesto sobre la Renta",
      desc: "Cuotas en Junio (50%), Septiembre (30%) y Diciembre (20%) sobre el impuesto liquidado anterior.",
      status: "Cuota Planificada",
      badgeColor: "var(--muted)",
    },
  ];

  return (
    <main className="container">
      <section className="panel">
        <ModuleHeaderIHA
          title="📆 Calendario Tributario DGII & Fechas Límite"
          categoryCode="F"
          categoryLabel="Fiscalidad DGII · Prevención de Moras"
          description="Cronograma inteligente con alertas de vencimiento para evitar recargos (10% por mora + 4% de interés indemnizatorio mensual) ante la DGII."
          agentContextLabel="Alerta Tributaria · Sin Moras Registradas"
        />

        <div className={styles.calendarBox} style={{ marginBlockStart: "24px" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 850, margin: 0, color: "var(--text)" }}>
            ⏳ Obligaciones Tributarias del Contribuyente
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {dates.map((d, i) => (
              <div
                key={i}
                style={{
                  background: "var(--bg-subtle)",
                  border: "1px solid var(--panel-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "20px 24px",
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  transition: "all var(--transition-smooth)",
                }}
              >
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <div
                    style={{
                      background: "var(--agent-gradient)",
                      color: "#ffffff",
                      padding: "10px 18px",
                      borderRadius: "var(--radius-md)",
                      fontWeight: 800,
                      fontSize: "14px",
                      boxShadow: "0 4px 12px var(--agent-glow)",
                      textAlign: "center",
                      minWidth: "140px",
                    }}
                  >
                    {d.day}
                  </div>
                  <div>
                    <h3 style={{ margin: "0 0 6px", fontSize: "1.1rem", fontWeight: 800, color: "var(--text)" }}>
                      {d.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: "13.5px", color: "var(--muted)", maxWidth: "560px" }}>
                      {d.desc}
                    </p>
                  </div>
                </div>

                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 750,
                    padding: "6px 14px",
                    borderRadius: "99px",
                    background: "hsl(217, 33%, 17%)",
                    color: d.badgeColor,
                    border: "1px solid var(--panel-border)",
                  }}
                >
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
