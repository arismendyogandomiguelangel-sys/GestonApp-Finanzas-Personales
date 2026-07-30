"use client";

import React from "react";
import Link from "next/link";
import { ModuleHeaderIHA } from "@/ui/agent/ModuleHeaderIHA";
import styles from "../vouchers.module.css";

export default function VouchersListPage() {
  const mockVouchers = [
    {
      id: "v1",
      issuer: "SUPERMERCADOS BRAVO S.A.S.",
      rnc: "131888441",
      ncf: "B0100023489",
      total: 4850.00,
      itbis: 739.83,
      date: "2026-07-25",
      category: "Suministros Operativos",
      status: "Verificado DGII",
    },
    {
      id: "v2",
      issuer: "FARMACIAS CAROL",
      rnc: "101844229",
      ncf: "B0100019942",
      total: 1250.00,
      itbis: 190.68,
      date: "2026-07-22",
      category: "Salud & Seguros",
      status: "Verificado DGII",
    },
    {
      id: "v3",
      issuer: "ESTACION SUNIX (COMBUSTIBLE)",
      rnc: "130999882",
      ncf: "B0100088211",
      total: 3000.00,
      itbis: 0.00,
      date: "2026-07-20",
      category: "Transporte & Combustible",
      status: "Exento / No ITBIS",
    },
  ];

  return (
    <main className="container">
      <section className="panel">
        <ModuleHeaderIHA
          title="🧾 Historial de Vouchers y Comprobantes Fiscales"
          categoryCode="B"
          categoryLabel="Registro Financiero Diario · Archivo OCR"
          description="Directorio de comprobantes procesados con OCR de imágenes y archivados de forma permanente en la base de datos InsForge. Listos para fiscalización y contabilidad."
          agentContextLabel="Archivo InsForge DB • 100% Sincronizado"
        />

        <div className={styles.metricsRow} style={{ marginBlockEnd: "28px" }}>
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>Total Recibos Mes</span>
              <span className={styles.metricIcon}>📑</span>
            </div>
            <p className={styles.metricValue}>3 Comprobantes</p>
            <div className={styles.metricSub}>
              <span>RD$ 9,100.00 en gastos reportados</span>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>Crédito Fiscal (ITBIS)</span>
              <span className={styles.metricIcon}>🧾</span>
            </div>
            <p className={styles.metricValue}>RD$ 930.51</p>
            <div className={styles.metricSub}>
              <span>Deducible en formato 606</span>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>Alojamiento Cloudinary</span>
              <span className={styles.metricIcon}>☁️</span>
            </div>
            <p className={styles.metricValue}>Imágenes OK</p>
            <div className={styles.metricSub}>
              <span>Resolución OCR verificada</span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBlockEnd: "18px", flexWrap: "wrap", gap: "12px" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 850, margin: 0, color: "var(--text)" }}>
            Listado de Comprobantes Registrados
          </h2>
          <div style={{ display: "flex", gap: "12px" }}>
            <Link href="/vouchers" className={styles.btnSecondary} style={{ textDecoration: "none" }}>
              + Capturar Nuevo Voucher
            </Link>
            <Link href="/vouchers/dgii" className={styles.ocrButton} style={{ textDecoration: "none" }}>
              Exportar a Formato DGII →
            </Link>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {mockVouchers.map((v) => (
            <div
              key={v.id}
              style={{
                background: "var(--bg-subtle)",
                border: "1px solid var(--panel-border)",
                borderRadius: "var(--radius-lg)",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "16px",
                transition: "all var(--transition-smooth)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <h3 style={{ fontSize: "1.08rem", fontWeight: 800, margin: 0, color: "var(--text)" }}>
                    {v.issuer}
                  </h3>
                  <span
                    style={{
                      fontSize: "11.5px",
                      fontWeight: 750,
                      padding: "4px 10px",
                      borderRadius: "99px",
                      background: "hsl(158, 76%, 45%, 0.15)",
                      color: "var(--success)",
                      border: "1px solid hsl(158, 76%, 45%, 0.3)",
                    }}
                  >
                    {v.status}
                  </span>
                </div>
                <span style={{ fontSize: "13.5px", color: "var(--muted)" }}>
                  <strong>RNC:</strong> {v.rnc} • <strong>NCF:</strong> {v.ncf} • <strong>Fecha:</strong> {v.date} • <strong>Categoría:</strong> {v.category}
                </span>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "1.25rem", fontWeight: 850, color: "var(--text)" }}>
                  RD$ {v.total.toLocaleString("es-DO", { minimumFractionDigits: 2 })}
                </div>
                <span style={{ fontSize: "12.5px", fontWeight: 700, color: "var(--accent)" }}>
                  ITBIS: RD$ {v.itbis.toLocaleString("es-DO", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
