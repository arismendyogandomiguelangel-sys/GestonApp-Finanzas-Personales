"use client";

import React from "react";
import { ModuleHeaderIHA } from "@/ui/agent/ModuleHeaderIHA";
import styles from "../fiscal.module.css";

export default function FiscalDeduciblesPage() {
  const categories = [
    {
      name: "Servicios Tecnológicos & Hosting Vercel/InsForge",
      pct: "100% Deducible",
      desc: "Gastos operativos indispensables de tu infraestructura digital e iguala fija.",
      badgeColor: "var(--success)",
    },
    {
      name: "Suministros Operativos & Compra para Tienda Online",
      pct: "100% Deducible",
      desc: "Costo de ventas e inventario facturado con NCF de crédito fiscal (B01).",
      badgeColor: "var(--success)",
    },
    {
      name: "Honorarios de Servicios Contables",
      pct: "100% Deducible",
      desc: "Servicios profesionales prestados con retención del 10% según Norma 02-05.",
      badgeColor: "var(--success)",
    },
    {
      name: "Combustible, Movilidad & Transporte",
      pct: "80% Deducible",
      desc: "Proporcional a la actividad económica de consultoría y gestión operativa.",
      badgeColor: "var(--warning)",
    },
  ];

  return (
    <main className="container">
      <section className="panel">
        <ModuleHeaderIHA
          title="💡 Clasificación de Gastos Deducibles de ISR"
          categoryCode="F"
          categoryLabel="Fiscalidad DGII · Optimización Tributaria Legal"
          description="Mapeo inteligente del Código Tributario Dominicano para deducir gastos admitidos y optimizar tu carga fiscal del Impuesto sobre la Renta."
          agentContextLabel="Auditoría Deducibles · 85.4% de Gastos Admitidos"
        />

        <div style={{ marginBlockStart: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          {categories.map((c, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg-subtle)",
                border: "1px solid var(--panel-border)",
                borderRadius: "var(--radius-lg)",
                padding: "22px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
                transition: "all var(--transition-smooth)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <h3 style={{ margin: 0, fontSize: "1.12rem", fontWeight: 850, color: "var(--text)" }}>
                  {c.name}
                </h3>
                <span style={{ fontSize: "13.5px", color: "var(--muted)" }}>
                  {c.desc}
                </span>
              </div>

              <span
                style={{
                  background: "hsl(158, 76%, 45%, 0.15)",
                  color: c.badgeColor,
                  padding: "6px 14px",
                  borderRadius: "99px",
                  fontSize: "12.5px",
                  fontWeight: 750,
                  border: "1px solid hsl(158, 76%, 45%, 0.3)",
                }}
              >
                {c.pct}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
