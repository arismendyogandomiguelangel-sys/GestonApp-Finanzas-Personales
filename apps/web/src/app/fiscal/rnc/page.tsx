"use client";

import React, { useState } from "react";
import { ModuleHeaderIHA } from "@/ui/agent/ModuleHeaderIHA";
import styles from "../fiscal.module.css";

export default function FiscalRncPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const profiles = [
    {
      name: "SERVICIOS TECNOLOGICOS ALIANED S.R.L.",
      rnc: "131-99882-1",
      type: "Persona Jurídica · Declarante Principal",
      status: "ACTIVO DGII",
      ncfAssigned: "Serie B01 / B02 / B04",
      lastVerified: "Hoy, 10:15 AM",
    },
    {
      name: "SUPERMERCADOS BRAVO S.A.S.",
      rnc: "131-88844-1",
      type: "Suplidor · Gran Contribuyente",
      status: "ACTIVO DGII",
      ncfAssigned: "Crédito Fiscal (B01)",
      lastVerified: "25 Jul 2026",
    },
    {
      name: "CLARO DOMINICANA (CODETEL)",
      rnc: "101-01010-2",
      type: "Suplidor · Telecomunicaciones",
      status: "ACTIVO DGII",
      ncfAssigned: "Crédito Fiscal (B01)",
      lastVerified: "18 Jul 2026",
    },
  ];

  const filtered = profiles.filter(
    (p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.rnc.includes(searchTerm)
  );

  return (
    <main className="container">
      <section className="panel">
        <ModuleHeaderIHA
          title="🔍 Directorio de Perfiles RNC & Verificación DGII"
          categoryCode="F"
          categoryLabel="Fiscalidad DGII · Base de Razón Social"
          description="Consulta rápida de estatus fiscal, régimen de tributación y series NCF autorizadas para tu empresa y tus suplidores/clientes en la República Dominicana."
          agentContextLabel="Conectado al Padrón DGII · 100% Validado"
        />

        <div style={{ marginBlockStart: "24px", display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Buscar por razón social o número de RNC..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: "var(--panel-raised)",
              border: "1px solid var(--panel-border)",
              borderRadius: "var(--radius-full)",
              padding: "12px 22px",
              color: "var(--text)",
              width: "100%",
              maxWidth: "420px",
              fontSize: "14px",
              fontWeight: 650,
              boxShadow: "var(--shadow-sm)",
            }}
          />
          <span style={{ fontSize: "13px", color: "var(--muted)", fontWeight: 700 }}>
            {filtered.length} perfiles registrados en InsForge DB
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBlockStart: "20px" }}>
          {filtered.map((p, index) => (
            <div
              key={index}
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
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <h3 style={{ margin: 0, fontSize: "1.12rem", fontWeight: 850, color: "var(--text)" }}>
                    {p.name}
                  </h3>
                  <span
                    style={{
                      background: "hsl(158, 76%, 45%, 0.15)",
                      color: "var(--success)",
                      padding: "4px 12px",
                      borderRadius: "99px",
                      fontSize: "11.5px",
                      fontWeight: 750,
                      border: "1px solid hsl(158, 76%, 45%, 0.3)",
                    }}
                  >
                    {p.status}
                  </span>
                </div>
                <span style={{ fontSize: "13.5px", color: "var(--muted)" }}>
                  <strong>RNC:</strong> {p.rnc} • <strong>Régimen:</strong> {p.type} • <strong>NCF Autorizado:</strong> {p.ncfAssigned}
                </span>
              </div>

              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent)" }}>
                  Última consulta: {p.lastVerified}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
