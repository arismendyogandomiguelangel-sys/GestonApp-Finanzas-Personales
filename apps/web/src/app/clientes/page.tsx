"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ModuleHeaderIHA } from "@/ui/agent/ModuleHeaderIHA";
import styles from "./clientes.module.css";

const CLIENTS_DATA = [
  {
    id: 1,
    name: "INDUSTRIAS BANILEJAS C. X A. (INDUBAN)",
    rnc: "101002341",
    phone: "809-555-0199",
    email: "contacto@induban.com.do",
    channel: "Consultorías IA / ERP",
    billed: "RD$ 450,000.00",
    status: "RNC Activo DGII",
    lastPayment: "25 Jul 2026",
  },
  {
    id: 2,
    name: "GRUPO PUNTA CANA S.A.",
    rnc: "101998822",
    phone: "809-555-8822",
    email: "compras@puntacana.com",
    channel: "Proyectos Web / E-Commerce",
    billed: "RD$ 280,000.00",
    status: "RNC Activo DGII",
    lastPayment: "15 Jul 2026",
  },
  {
    id: 3,
    name: "BANCO POPULAR DOMINICANO S.A.",
    rnc: "101000216",
    phone: "809-544-5000",
    email: "pago.proveedores@bpd.com.do",
    channel: "Consultorías IA / Automatización",
    billed: "RD$ 720,000.00",
    status: "RNC Activo DGII",
    lastPayment: "28 Jul 2026",
  },
  {
    id: 4,
    name: "INMOBILIARIA CARIBE RESIDENCIAL",
    rnc: "131449901",
    phone: "809-533-4011",
    email: "rentas@cariberesidencial.do",
    channel: "Rentas / Inversión",
    billed: "RD$ 195,000.00",
    status: "RNC Activo DGII",
    lastPayment: "01 Jul 2026",
  },
];

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = CLIENTS_DATA.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.rnc.includes(searchTerm) ||
      c.channel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.clientesContainer}>
      <ModuleHeaderIHA
        title="CRM de Clientes & Suplidores"
        categoryCode="C"
        categoryLabel="CRM & COBROS"
        description="Directorio inteligente, canales de ingresos e historial de facturación con validación fiscal DGII."
        agentContextLabel="Axelin: 4 Canales Activos • Recordatorios programados"
      />

      {/* Métricas del Directorio */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Facturado Acumulado</span>
            <span className={styles.metricIcon}>📈</span>
          </div>
          <p className={styles.metricValue}>RD$ 1,645,000.00</p>
          <span className={styles.metricSub}>✓ 4 clientes recurrentes en 2026</span>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Ticket Promedio por Canal</span>
            <span className={styles.metricIcon}>💎</span>
          </div>
          <p className={styles.metricValue}>RD$ 411,250.00</p>
          <span className={styles.metricSub}>✓ Top canal: Consultorías IA</span>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Validación Tributaria</span>
            <span className={styles.metricIcon}>🛡️</span>
          </div>
          <p className={styles.metricValue}>100% RNC Válidos</p>
          <span className={styles.metricSub}>✓ Verificados en DGII (607/IT-1)</span>
        </div>
      </div>

      {/* Subnav Hacia Historial y Frecuencia */}
      <div className={styles.subnavGrid}>
        <Link href="/clientes/historial" className={styles.subnavCard}>
          <h3 className={styles.subnavTitle}>
            <span>📜 Historial de Pagos</span>
            <span>→</span>
          </h3>
          <p className={styles.subnavDesc}>
            Consulta la línea de tiempo completa de facturas pagadas, retenciones de ITBIS/ISR y comprobantes emitidos.
          </p>
        </Link>

        <Link href="/clientes/frecuencia" className={styles.subnavCard}>
          <h3 className={styles.subnavTitle}>
            <span>🔄 Frecuencia & Recurrencia</span>
            <span>→</span>
          </h3>
          <p className={styles.subnavDesc}>
            Analiza la ciclicidad de cobros, contratos mensuales activos y predicción de flujo de efectivo por suplidor.
          </p>
        </Link>
      </div>

      {/* Barra Superior con Buscador y Acción */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="🔍 Buscar cliente por RNC, nombre o canal..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            minWidth: "280px",
            background: "var(--bg-subtle)",
            border: "1px solid var(--panel-border)",
            borderRadius: "var(--radius-full)",
            padding: "12px 20px",
            color: "var(--text)",
            fontSize: "14px",
            outline: "none",
          }}
        />

        <button
          className={styles.btnAction}
          onClick={() => alert("Asistente IA: Listo para agregar nuevo cliente o importar desde portal DGII.")}
        >
          + Nuevo Cliente / Suplidor
        </button>
      </div>

      {/* Directorio de Clientes */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
        {filteredClients.map((client) => (
          <div key={client.id} className={styles.clientCard}>
            <div className={styles.clientHeader}>
              <div>
                <h3 className={styles.clientName}>{client.name}</h3>
                <span className={styles.clientRnc}>RNC: {client.rnc}</span>
              </div>
              <span className={styles.clientBadge}>{client.status}</span>
            </div>

            <div style={{ fontSize: "12.5px", color: "var(--accent)", fontWeight: "750" }}>
              Canal Principal: {client.channel}
            </div>

            <div className={styles.clientContact}>
              <span>📞 Teléfono: {client.phone}</span>
              <span>✉️ Facturación: {client.email}</span>
            </div>

            <div className={styles.clientFooter}>
              <div>
                <span style={{ color: "var(--muted)", display: "block", fontSize: "12px" }}>
                  Último Pago: {client.lastPayment}
                </span>
                <strong style={{ color: "var(--success)", fontSize: "1.1rem" }}>{client.billed}</strong>
              </div>
              <Link
                href={`/clientes/historial?rnc=${client.rnc}`}
                style={{
                  color: "var(--accent)",
                  fontWeight: "700",
                  textDecoration: "none",
                  fontSize: "13px",
                }}
              >
                Ver Facturas →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
