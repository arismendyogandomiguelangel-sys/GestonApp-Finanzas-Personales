"use client";

import React, { useState } from "react";
import { generate606Txt, generate607Txt } from "@/lib/dgiiGenerator";

export default function VouchersDgiiPage() {
  const [period, setPeriod] = useState("202607");
  const [userRnc, setUserRnc] = useState("101999888");

  const mockVouchers = [
    { rncIssuer: "131888441", issuerName: "SUPERMERCADOS BRAVO S.A.S.", ncf: "B0100023489", voucherDate: "2026-07-25", totalAmount: 4850.00, itbisAmount: 739.83, category: "Alimentación" },
    { rncIssuer: "101844229", issuerName: "FARMACIAS CAROL", ncf: "B0100019942", voucherDate: "2026-07-22", totalAmount: 1250.00, itbisAmount: 190.68, category: "Salud" },
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
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto", color: "#f8fafc" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: "700", margin: 0 }}>🏛️ Asignación y Formatos DGII (606/607)</h1>
        <p style={{ color: "#94a3b8", marginTop: "4px" }}>
          Genera y descarga los archivos TXT oficiales compatibles con la Oficina Virtual de la DGII.
        </p>
      </div>

      <div style={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", color: "#cbd5e1", marginBottom: "6px" }}>RNC Declarante</label>
            <input
              type="text"
              value={userRnc}
              onChange={(e) => setUserRnc(e.target.value)}
              style={{ width: "100%", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "6px", padding: "10px", color: "#fff" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", color: "#cbd5e1", marginBottom: "6px" }}>Período Fiscal (AAAAMM)</label>
            <input
              type="text"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              style={{ width: "100%", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "6px", padding: "10px", color: "#fff" }}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={handleDownload606}
            style={{ backgroundColor: "#6366f1", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 18px", fontWeight: "600", cursor: "pointer" }}
          >
            📥 Descargar Formato 606 (.TXT)
          </button>
          <button
            onClick={handleDownload607}
            style={{ backgroundColor: "#10b981", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 18px", fontWeight: "600", cursor: "pointer" }}
          >
            📥 Descargar Formato 607 (.TXT)
          </button>
        </div>
      </div>
    </div>
  );
}
