"use client";

import React from "react";

export default function VouchersListPage() {
  const mockVouchers = [
    { id: "v1", issuer: "SUPERMERCADOS BRAVO S.A.S.", rnc: "131888441", ncf: "B0100023489", total: 4850.00, itbis: 739.83, date: "2026-07-25" },
    { id: "v2", issuer: "FARMACIAS CAROL", rnc: "101844229", ncf: "B0100019942", total: 1250.00, itbis: 190.68, date: "2026-07-22" },
    { id: "v3", issuer: "ESTACION SUNIX", rnc: "130999882", ncf: "B0100088211", total: 3000.00, itbis: 0.00, date: "2026-07-20" },
  ];

  return (
    <div style={{ padding: "24px", maxWidth: "1000px", margin: "0 auto", color: "#f8fafc" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: "700", margin: 0 }}>🧾 Historial de Recibos y Vouchers</h1>
        <p style={{ color: "#94a3b8", marginTop: "4px" }}>
          Recibos procesados y guardados en tu espacio de trabajo.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {mockVouchers.map((v) => (
          <div
            key={v.id}
            style={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "10px",
              padding: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: "600", margin: "0 0 4px" }}>{v.issuer}</h3>
              <span style={{ fontSize: "0.825rem", color: "#94a3b8" }}>
                RNC: {v.rnc} • NCF: {v.ncf} • Fecha: {v.date}
              </span>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: "700" }}>RD$ {v.total.toLocaleString()}</div>
              <span style={{ fontSize: "0.75rem", color: "#818cf8" }}>ITBIS: RD$ {v.itbis.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
