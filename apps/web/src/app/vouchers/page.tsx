"use client";

import React, { useState } from "react";

export default function VouchersCapturePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<{
    rnc: string;
    issuer: string;
    ncf: string;
    total: number;
    itbis: number;
    date: string;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
      setExtractedData(null);
    }
  };

  const handleProcessOcr = () => {
    if (!selectedFile) return;
    setIsProcessing(true);

    // Simular pipeline OCR multimodal de voucher
    setTimeout(() => {
      setIsProcessing(false);
      setExtractedData({
        rnc: "131888441",
        issuer: "SUPERMERCADOS BRAVO S.A.S.",
        ncf: "B0100023489",
        total: 4850.00,
        itbis: 739.83,
        date: "2026-07-25",
      });
    }, 1500);
  };

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto", color: "#f8fafc" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: "700", margin: 0 }}>📸 Captura de Vouchers u OCR</h1>
        <p style={{ color: "#94a3b8", marginTop: "4px" }}>
          Sube la foto de tu recibo para extraer RNC, NCF, ITBIS y monto automáticamente.
        </p>
      </div>

      <div style={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          style={{ marginBottom: "16px", color: "#94a3b8" }}
        />

        {selectedFile && (
          <button
            onClick={handleProcessOcr}
            disabled={isProcessing}
            style={{
              backgroundColor: "#6366f1",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              fontWeight: "600",
              cursor: "pointer",
              display: "block",
            }}
          >
            {isProcessing ? "Procesando OCR con IA..." : "Extraer Datos del Voucher"}
          </button>
        )}
      </div>

      {extractedData && (
        <div style={{ backgroundColor: "#0f172a", border: "1px solid #10b981", borderRadius: "12px", padding: "20px" }}>
          <h3 style={{ margin: "0 0 16px", color: "#10b981", fontSize: "1.1rem" }}>✅ Voucher Procesado con Éxito</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "0.95rem" }}>
            <div><strong>Emisor:</strong> {extractedData.issuer}</div>
            <div><strong>RNC:</strong> {extractedData.rnc}</div>
            <div><strong>NCF:</strong> {extractedData.ncf}</div>
            <div><strong>Fecha:</strong> {extractedData.date}</div>
            <div><strong>Monto Total:</strong> RD$ {extractedData.total.toFixed(2)}</div>
            <div><strong>ITBIS (18%):</strong> RD$ {extractedData.itbis.toFixed(2)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
