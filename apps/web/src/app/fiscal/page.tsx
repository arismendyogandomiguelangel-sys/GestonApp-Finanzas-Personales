"use client";

import React from "react";
import Link from "next/link";
import { ModuleHeaderIHA } from "@/ui/agent/ModuleHeaderIHA";
import styles from "./fiscal.module.css";

export default function FiscalOverviewPage() {
  return (
    <main className="container">
      <section className="panel">
        <ModuleHeaderIHA
          title="🏛️ Hub de Fiscalidad DGII & Gestión Tributaria"
          categoryCode="F"
          categoryLabel="Fiscalidad DGII · Conectado a InsForge & Hermes"
          description="Monitorea tus obligaciones tributarias, ITBIS por acreditar, anticipos y calendarios fiscales para tus 4 canales de ingreso en República Dominicana."
          agentContextLabel="Cumplimiento Tributario Activo · Período 2026-07"
        />

        {/* Tarjetas de Métricas Fiscales */}
        <div className={styles.metricsGrid} style={{ marginBlockEnd: "32px" }}>
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>ITBIS Estimado a Pagar</span>
              <span className={styles.metricIcon}>🧾</span>
            </div>
            <p className={styles.metricValue}>RD$ 18,450.00</p>
            <div className={styles.metricSub}>
              <span>Vence el 20 del próximo mes (IT-1)</span>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>Gastos Deducibles ISR</span>
              <span className={styles.metricIcon}>📉</span>
            </div>
            <p className={styles.metricValue}>85.4% Deducible</p>
            <div className={styles.metricSub}>
              <span>Respaldado por NCF de Crédito Fiscal</span>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>Estado Formatos 606 / 607</span>
              <span className={styles.metricIcon}>🏛️</span>
            </div>
            <p className={styles.metricValue} style={{ color: "var(--success)" }}>100% Al Día</p>
            <div className={styles.metricSub}>
              <span>Archivos TXT listos para Oficina Virtual</span>
            </div>
          </div>
        </div>

        {/* Accesos Rápidos a las Subpáginas Fiscales */}
        <h2 style={{ fontSize: "1.2rem", fontWeight: 850, marginBlockEnd: "16px", color: "var(--text)" }}>
          Módulos y Subpáginas Fiscales
        </h2>

        <div className={styles.subnavGrid}>
          <Link href="/fiscal/formatos" className={styles.subnavCard}>
            <div className={styles.subnavTitle}>
              <span>📑 Formatos 606 / 607</span>
              <span>→</span>
            </div>
            <p className={styles.subnavDesc}>
              Genera y descarga los archivos de texto (TXT) de compras, ventas y retenciones para la DGII.
            </p>
          </Link>

          <Link href="/fiscal/calendario" className={styles.subnavCard}>
            <div className={styles.subnavTitle}>
              <span>📅 Calendario Tributario</span>
              <span>→</span>
            </div>
            <p className={styles.subnavDesc}>
              Fechas de vencimiento de IT-1, anticipos de ISR, IR-17 y declaraciones juradas.
            </p>
          </Link>

          <Link href="/fiscal/rnc" className={styles.subnavCard}>
            <div className={styles.subnavTitle}>
              <span>🔍 Consulta de RNC & NCF</span>
              <span>→</span>
            </div>
            <p className={styles.subnavDesc}>
              Valida la razón social y estatus de contribuyentes e igualas ante la DGII en tiempo real.
            </p>
          </Link>

          <Link href="/fiscal/deducibles" className={styles.subnavCard}>
            <div className={styles.subnavTitle}>
              <span>💡 Análisis de Deducibles</span>
              <span>→</span>
            </div>
            <p className={styles.subnavDesc}>
              Auditoría por canal de gasto con sugerencias para optimizar tu carga fiscal legalmente.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
