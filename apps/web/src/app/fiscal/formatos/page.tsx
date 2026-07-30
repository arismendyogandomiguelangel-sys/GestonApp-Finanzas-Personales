"use client";

import React from "react";
import Link from "next/link";
import { ModuleHeaderIHA } from "@/ui/agent/ModuleHeaderIHA";
import styles from "../fiscal.module.css";

export default function FiscalFormatosPage() {
  return (
    <main className="container">
      <section className="panel">
        <ModuleHeaderIHA
          title="📑 Generador de Formatos DGII (606 / 607 / 608 / IT-1)"
          categoryCode="F"
          categoryLabel="Fiscalidad DGII · Exportador Oficial"
          description="Consolida automáticamente compras, ventas y comprobantes anulados registrados en la base de datos InsForge para generar los archivos de envío a la Oficina Virtual."
          agentContextLabel="Formatos 606/607/IT-1 · Listos para Declarar"
        />

        <div className={styles.subnavGrid} style={{ marginBlockStart: "24px" }}>
          <Link href="/vouchers/dgii" className={styles.subnavCard}>
            <div className={styles.subnavTitle}>
              <span>🧾 Formato 606 (Compras e ITBIS)</span>
              <span style={{ color: "var(--accent)" }}>→</span>
            </div>
            <p className={styles.subnavDesc}>
              Reporte de compras de bienes y servicios con NCF de crédito fiscal y retenciones de ITBIS o ISR.
            </p>
          </Link>

          <Link href="/vouchers/dgii" className={styles.subnavCard}>
            <div className={styles.subnavTitle}>
              <span>🏷️ Formato 607 (Ventas e Ingresos)</span>
              <span style={{ color: "var(--success)" }}>→</span>
            </div>
            <p className={styles.subnavDesc}>
              Reporte de facturación por tus 4 canales de ingreso (Iguala fija, Tienda Online, YouTube y Honorarios).
            </p>
          </Link>

          <div className={styles.subnavCard} style={{ cursor: "default" }}>
            <div className={styles.subnavTitle}>
              <span>❌ Formato 608 (Comprobantes Anulados)</span>
              <span style={{ color: "var(--muted)" }}>0</span>
            </div>
            <p className={styles.subnavDesc}>
              Registro de NCF no utilizados o anulados por error en digitación o devolución de clientes.
            </p>
          </div>

          <div className={styles.subnavCard} style={{ cursor: "default" }}>
            <div className={styles.subnavTitle}>
              <span>📋 Declaración Jurada IT-1</span>
              <span style={{ color: "var(--warning)" }}>En curso</span>
            </div>
            <p className={styles.subnavDesc}>
              Liquidación mensual del ITBIS cobrado vs. ITBIS pagado y créditos arrastrados de meses anteriores.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
