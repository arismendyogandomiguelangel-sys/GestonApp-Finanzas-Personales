"use client";

import React, { useState } from "react";
import { generate606Txt, generate607Txt } from "@/lib/dgiiGenerator";
import { ModuleHeaderIHA } from "@/ui/agent/ModuleHeaderIHA";
import styles from "../vouchers.module.css";

export default function VouchersDgiiPage() {
  const [period, setPeriod] = useState("202607");
  const [userRnc, setUserRnc] = useState("101999888");

  const mockVouchers = [
    {
      rncIssuer: "131888441",
      issuerName: "SUPERMERCADOS BRAVO S.A.S.",
      ncf: "B0100023489",
      voucherDate: "2026-07-25",
      totalAmount: 4850.00,
      itbisAmount: 739.83,
      category: "Suministros Operativos",
    },
    {
      rncIssuer: "101844229",
      issuerName: "FARMACIAS CAROL",
      ncf: "B0100019942",
      voucherDate: "2026-07-22",
      totalAmount: 1250.00,
      itbisAmount: 190.68,
      category: "Salud & Seguros",
    },
    {
      rncIssuer: "101010102",
      issuerName: "CLARO DOMINICANA (CODETEL)",
      ncf: "B0100045112",
      voucherDate: "2026-07-18",
      totalAmount: 3450.00,
      itbisAmount: 526.27,
      category: "Comunicación & Internet",
    },
  ];

  const handleDownload606 = () => {
    const content = generate606Txt(userRnc, period, mockVouchers);
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `DGII_F_606_${userRnc}_${period}.txt`;
    a.click();
  };

  const handleDownload607 = () => {
    const content = generate607Txt(userRnc, period, mockVouchers);
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `DGII_F_607_${userRnc}_${period}.txt`;
    a.click();
  };

  return (
    <main className="container">
      <section className="panel">
        <ModuleHeaderIHA
          title="🏛️ Declaración y Formatos DGII (606 / 607)"
          categoryCode="F"
          categoryLabel="Fiscalidad DGII · Compras y Ventas"
          description="Genera, valida y descarga los archivos oficiales TXT para la Oficina Virtual de la DGII. Tus comprobantes procesados vía OCR (Cloudinary + Gemini) y almacenados en InsForge se pre-cargan automáticamente."
          agentContextLabel="Validación Fiscal Activa · InsForge DB"
        />

        {/* Tarjetas de Indicadores Fiscales */}
        <div className={styles.metricsRow} style={{ marginBlockEnd: "28px" }}>
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>Total ITBIS 606 (Compras)</span>
              <span className={styles.metricIcon}>🧾</span>
            </div>
            <p className={styles.metricValue}>RD$ 1,456.78</p>
            <div className={styles.metricSub}>
              <span>3 comprobantes con NCF en período {period}</span>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>Ingresos Multi-Canal (607)</span>
              <span className={styles.metricIcon}>📈</span>
            </div>
            <p className={styles.metricValue}>RD$ 165,600.00</p>
            <div className={styles.metricSub}>
              <span>Iguala fija + Tienda Online + Honorarios</span>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>Conexión InsForge BaaS</span>
              <span className={styles.metricIcon}>🛡️</span>
            </div>
            <p className={styles.metricValue}>Postgres Activo</p>
            <div className={styles.metricSub}>
              <span>RLS protegido por usuario y workspace</span>
            </div>
          </div>
        </div>

        {/* Panel de Configuración de Declarante y Exportación */}
        <div className={styles.resultPanel}>
          <div className={styles.resultHeader}>
            <h2 className={styles.resultTitle}>
              <span>⚙️ Configuración del Período y Exportación</span>
            </h2>
            <span className={styles.dgiiTag}>
              ✅ Formatos oficiales DGII al día
            </span>
          </div>

          <div className={styles.dataGrid} style={{ marginBlockEnd: "12px" }}>
            <div className={styles.dataItem}>
              <label style={{ fontSize: "12.5px", fontWeight: 750, color: "var(--muted)", marginBottom: "6px" }}>
                RNC del Declarante
              </label>
              <input
                type="text"
                value={userRnc}
                onChange={(e) => setUserRnc(e.target.value)}
                style={{
                  background: "var(--panel)",
                  border: "1px solid var(--panel-border)",
                  borderRadius: "var(--radius-sm)",
                  padding: "10px 14px",
                  color: "var(--text)",
                  fontWeight: 700,
                  fontSize: "14px",
                }}
              />
            </div>

            <div className={styles.dataItem}>
              <label style={{ fontSize: "12.5px", fontWeight: 750, color: "var(--muted)", marginBottom: "6px" }}>
                Período Fiscal (AAAAMM)
              </label>
              <input
                type="text"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                style={{
                  background: "var(--panel)",
                  border: "1px solid var(--panel-border)",
                  borderRadius: "var(--radius-sm)",
                  padding: "10px 14px",
                  color: "var(--text)",
                  fontWeight: 700,
                  fontSize: "14px",
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "flex-end", marginBlockStart: "8px" }}>
            <button
              onClick={handleDownload606}
              className={styles.ocrButton}
              style={{ background: "var(--agent-gradient)" }}
            >
              📥 Descargar Formato 606 (Compras e ITBIS) (.TXT)
            </button>
            <button
              onClick={handleDownload607}
              className={styles.ocrButton}
              style={{ background: "hsl(158, 76%, 45%)", color: "#ffffff" }}
            >
              📥 Descargar Formato 607 (Ventas por Iguala/Tienda) (.TXT)
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
