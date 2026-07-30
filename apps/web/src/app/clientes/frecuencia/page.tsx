"use client";

import React from "react";
import Link from "next/link";
import { ModuleHeaderIHA } from "@/ui/agent/ModuleHeaderIHA";
import styles from "../clientes.module.css";

const FREQUENCY_DATA = [
  {
    name: "INDUSTRIAS BANILEJAS C. X A. (INDUBAN)",
    rnc: "101002341",
    cycle: "Mensual (Día 25)",
    avgTicket: "RD$ 150,000.00",
    reliability: "100%",
    progress: 85,
    nextBilling: "25 Ago 2026",
    status: "Recurrencia Alta",
  },
  {
    name: "GRUPO PUNTA CANA S.A.",
    rnc: "101998822",
    cycle: "Mensual (Día 15)",
    avgTicket: "RD$ 140,000.00",
    reliability: "98%",
    progress: 92,
    nextBilling: "15 Ago 2026",
    status: "Recurrencia Alta",
  },
  {
    name: "BANCO POPULAR DOMINICANO S.A.",
    rnc: "101000216",
    cycle: "Bimestral",
    avgTicket: "RD$ 300,000.00",
    reliability: "100%",
    progress: 60,
    nextBilling: "30 Ago 2026",
    status: "Contrato Institucional",
  },
  {
    name: "INMOBILIARIA CARIBE RESIDENCIAL",
    rnc: "131449901",
    cycle: "Mensual (Día 01)",
    avgTicket: "RD$ 65,000.00",
    reliability: "100%",
    progress: 100,
    nextBilling: "01 Ago 2026",
    status: "Arrendamiento Fijo",
  },
];

export default function ClientsFrequencyPage() {
  return (
    <div className={styles.clientesContainer}>
      <ModuleHeaderIHA
        title="Análisis de Frecuencia & Predictibilidad de Flujo"
        categoryCode="C"
        categoryLabel="CASHFLOW PREDICTIVO"
        description="Inteligencia de recurrencia de cobro, contratos de servicios activos y pronóstico de facturación en tus 4 canales."
        agentContextLabel="Axelin: Proyectando RD$ 655k asegurados en Agosto basado en patrones periódicos."
      />

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <Link
          href="/clientes"
          style={{
            background: "var(--bg-subtle)",
            color: "var(--text)",
            padding: "10px 18px",
            borderRadius: "var(--radius-full)",
            textDecoration: "none",
            fontSize: "13.5px",
            fontWeight: "700",
            border: "1px solid var(--panel-border)",
          }}
        >
          ← Volver a Directorio
        </Link>
      </div>

      {/* KPI Cards de Frecuencia */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Índice de Retención CRM</span>
            <span className={styles.metricIcon}>💎</span>
          </div>
          <p className={styles.metricValue}>99.5%</p>
          <span className={styles.metricSub}>✓ 0 abandonos de contrato en el año</span>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Ciclo Promedio de Cobro</span>
            <span className={styles.metricIcon}>⏱️</span>
          </div>
          <p className={styles.metricValue}>22.4 Días</p>
          <span className={styles.metricSub}>✓ El pago más rápido: Caribe Residencial</span>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Proyección Mes Próximo</span>
            <span className={styles.metricIcon}>📈</span>
          </div>
          <p className={styles.metricValue}>RD$ 655,000.00</p>
          <span className={styles.metricSub}>✓ Cobro periódico programado</span>
        </div>
      </div>

      {/* Gráfico SVG de Recurrencia por Canal */}
      <div
        style={{
          background: "var(--panel-raised)",
          border: "1px solid var(--panel-border)",
          borderRadius: "var(--radius-xl)",
          padding: "24px",
        }}
      >
        <h3 style={{ margin: "0 0 16px", fontSize: "1.1rem", fontWeight: "800" }}>
          📊 Ciclicidad Mensual de Ingresos y Cobros (Jul - Oct 2026)
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {[
            { month: "Julio (Actual)", amount: "RD$ 625,000.00", pct: 92, color: "var(--accent)" },
            { month: "Agosto (Proyectado)", amount: "RD$ 655,000.00", pct: 96, color: "var(--success)" },
            { month: "Septiembre (Proyectado)", amount: "RD$ 580,000.00", pct: 85, color: "var(--info)" },
            { month: "Octubre (Estimado)", amount: "RD$ 690,000.00", pct: 100, color: "var(--purple)" },
          ].map((bar, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ width: "160px", fontSize: "13.5px", fontWeight: "750", color: "var(--text)" }}>
                {bar.month}
              </span>
              <div
                style={{
                  flex: 1,
                  background: "var(--bg-subtle)",
                  borderRadius: "var(--radius-full)",
                  height: "14px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${bar.pct}%`,
                    height: "100%",
                    background: bar.color,
                    borderRadius: "var(--radius-full)",
                  }}
                />
              </div>
              <span style={{ width: "130px", textAlign: "right", fontSize: "13.5px", fontWeight: "800" }}>
                {bar.amount}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tarjetas de Análisis Individual por Suplidor */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
        {FREQUENCY_DATA.map((item, idx) => (
          <div key={idx} className={styles.clientCard}>
            <div className={styles.clientHeader}>
              <div>
                <h3 className={styles.clientName}>{item.name}</h3>
                <span className={styles.clientRnc}>RNC: {item.rnc}</span>
              </div>
              <span className={styles.clientBadge}>{item.status}</span>
            </div>

            <div style={{ fontSize: "13.5px", color: "var(--text)", display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--muted)" }}>Ciclo: {item.cycle}</span>
              <strong>{item.avgTicket}</strong>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--muted)" }}>
                <span>Índice de Confiabilidad: {item.reliability}</span>
                <span>{item.progress}% completado del ciclo</span>
              </div>
              <div
                style={{
                  background: "var(--panel-border)",
                  borderRadius: "var(--radius-full)",
                  height: "8px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${item.progress}%`,
                    height: "100%",
                    background: "var(--agent-gradient)",
                  }}
                />
              </div>
            </div>

            <div className={styles.clientFooter}>
              <span style={{ color: "var(--muted)" }}>Próxima Facturación:</span>
              <strong style={{ color: "var(--success)" }}>{item.nextBilling}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
