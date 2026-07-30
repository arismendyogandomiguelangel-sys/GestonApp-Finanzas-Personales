"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ModuleHeaderIHA } from "@/ui/agent/ModuleHeaderIHA";
import styles from "../clientes.module.css";

const HISTORY_DATA = [
  {
    id: "B0100000412",
    client: "INDUSTRIAS BANILEJAS C. X A.",
    rnc: "101002341",
    ncfType: "Factura de Crédito Fiscal",
    date: "25 Jul 2026",
    subtotal: "RD$ 150,000.00",
    itbis: "RD$ 27,000.00",
    retention: "-RD$ 15,000.00",
    totalPaid: "RD$ 162,000.00",
    status: "Pagada & Conciliada",
  },
  {
    id: "B0100000411",
    client: "GRUPO PUNTA CANA S.A.",
    rnc: "101998822",
    ncfType: "Factura de Crédito Fiscal",
    date: "15 Jul 2026",
    subtotal: "RD$ 280,000.00",
    itbis: "RD$ 50,400.00",
    retention: "-RD$ 28,000.00",
    totalPaid: "RD$ 302,400.00",
    status: "Pagada & Conciliada",
  },
  {
    id: "B0100000410",
    client: "BANCO POPULAR DOMINICANO S.A.",
    rnc: "101000216",
    ncfType: "Factura Gubernamental / Especial",
    date: "28 Jun 2026",
    subtotal: "RD$ 300,000.00",
    itbis: "RD$ 54,000.00",
    retention: "-RD$ 30,000.00",
    totalPaid: "RD$ 324,000.00",
    status: "Pagada & Conciliada",
  },
];

export default function ClientsHistoryPage() {
  const [filterRnc, setFilterRnc] = useState("ALL");

  const filteredHistory =
    filterRnc === "ALL" ? HISTORY_DATA : HISTORY_DATA.filter((i) => i.rnc === filterRnc);

  return (
    <div className={styles.clientesContainer}>
      <ModuleHeaderIHA
        title="Historial de Pagos & Retenciones por Suplidor"
        categoryCode="C"
        categoryLabel="AUDITORÍA FISCAL"
        description="Línea de tiempo auditada de facturación con desglose de ITBIS cobrado y retención de ISR (10% Normativa DGII)."
        agentContextLabel="Axelin: Retenciones de ITBIS e ISR conciliadas al 100% con formato 607/IT-1."
      />

      {/* Selector de Cliente / Suplidor */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
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

        <select
          value={filterRnc}
          onChange={(e) => setFilterRnc(e.target.value)}
          style={{
            background: "var(--panel-raised)",
            border: "1px solid var(--panel-border)",
            color: "var(--text)",
            borderRadius: "var(--radius-full)",
            padding: "10px 18px",
            fontSize: "13.5px",
            fontWeight: "700",
            outline: "none",
          }}
        >
          <option value="ALL">📋 Todos los Clientes (Historial Completo)</option>
          <option value="101002341">INDUSTRIAS BANILEJAS C. X A.</option>
          <option value="101998822">GRUPO PUNTA CANA S.A.</option>
          <option value="101000216">BANCO POPULAR DOMINICANO S.A.</option>
        </select>
      </div>

      {/* Tabla Stitch de Comprobantes Emitidos */}
      <div
        style={{
          background: "var(--panel-raised)",
          border: "1px solid var(--panel-border)",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--panel-border)" }}>
          <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "800" }}>
            📑 Registro de Comprobantes Fiscales Emitidos (NCF)
          </h3>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "var(--bg-subtle)", borderBottom: "1px solid var(--panel-border)" }}>
                <th style={{ padding: "14px 20px", fontSize: "12.5px", color: "var(--muted)" }}>NCF #</th>
                <th style={{ padding: "14px 20px", fontSize: "12.5px", color: "var(--muted)" }}>CLIENTE / RNC</th>
                <th style={{ padding: "14px 20px", fontSize: "12.5px", color: "var(--muted)" }}>FECHA</th>
                <th style={{ padding: "14px 20px", fontSize: "12.5px", color: "var(--muted)" }}>SUBTOTAL</th>
                <th style={{ padding: "14px 20px", fontSize: "12.5px", color: "var(--muted)" }}>ITBIS (18%)</th>
                <th style={{ padding: "14px 20px", fontSize: "12.5px", color: "var(--muted)" }}>RETENCIÓN ISR</th>
                <th style={{ padding: "14px 20px", fontSize: "12.5px", color: "var(--muted)" }}>NETO COBRADO</th>
                <th style={{ padding: "14px 20px", fontSize: "12.5px", color: "var(--muted)" }}>ESTATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: "1px solid var(--panel-border)",
                    transition: "background 0.2s",
                  }}
                >
                  <td style={{ padding: "16px 20px", fontWeight: "800", color: "var(--text)" }}>{item.id}</td>
                  <td style={{ padding: "16px 20px" }}>
                    <div style={{ fontWeight: "750", color: "var(--text)" }}>{item.client}</div>
                    <div style={{ fontSize: "12px", color: "var(--muted)" }}>RNC: {item.rnc}</div>
                  </td>
                  <td style={{ padding: "16px 20px", fontSize: "13.5px", color: "var(--muted)" }}>{item.date}</td>
                  <td style={{ padding: "16px 20px", fontWeight: "700" }}>{item.subtotal}</td>
                  <td style={{ padding: "16px 20px", color: "var(--accent)" }}>{item.itbis}</td>
                  <td style={{ padding: "16px 20px", color: "var(--danger)" }}>{item.retention}</td>
                  <td style={{ padding: "16px 20px", fontWeight: "850", color: "var(--success)" }}>
                    {item.totalPaid}
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <span
                      style={{
                        background: "hsl(158, 76%, 45%, 0.15)",
                        color: "var(--success)",
                        padding: "5px 12px",
                        borderRadius: "var(--radius-full)",
                        fontSize: "11.5px",
                        fontWeight: "750",
                        border: "1px solid hsl(158, 76%, 45%, 0.3)",
                      }}
                    >
                      ✓ {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
