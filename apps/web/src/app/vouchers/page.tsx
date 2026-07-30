"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ModuleHeaderIHA } from "@/ui/agent/ModuleHeaderIHA";
import styles from "./vouchers.module.css";

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
    category: string;
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

    // Simular pipeline OCR multimodal con Gemini / OpenAI / Cloudinary
    setTimeout(() => {
      setIsProcessing(false);
      setExtractedData({
        rnc: "131888441",
        issuer: "SUPERMERCADOS BRAVO S.A.S.",
        ncf: "B0100023489",
        total: 4850.00,
        itbis: 739.83,
        date: "2026-07-25",
        category: "Gastos Operativos / Suministros",
      });
    }, 1200);
  };

  return (
    <main className="container">
      <section className="panel">
        <ModuleHeaderIHA
          title="📸 Captura Inteligente OCR & Vouchers DGII"
          categoryCode="B"
          categoryLabel="Registro Financiero Diario · OCR multicanal"
          description="Sube o fotografía comprobantes y facturas. El motor Gemini/OpenAI extrae automáticamente RNC, NCF, ITBIS y monto total, guardando en Cloudinary para preparar tus formatos 606 y 607."
          agentContextLabel="OCR Activo · Listo para exportación DGII"
        />

        {/* Indicadores de Comprobantes del Mes */}
        <div className={styles.metricsRow} style={{ marginBlockEnd: "32px" }}>
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>ITBIS Compras (606)</span>
              <span className={styles.metricIcon}>🧾</span>
            </div>
            <p className={styles.metricValue}>RD$ 18,450.00</p>
            <div className={styles.metricSub}>
              <span>14 comprobantes procesados con NCF</span>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>NCF de Ventas (607)</span>
              <span className={styles.metricIcon}>🏷️</span>
            </div>
            <p className={styles.metricValue}>RD$ 165,600.00</p>
            <div className={styles.metricSub}>
              <span>Iguala Fija + Tienda Online + Honorarios</span>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>Almacenamiento Cloudinary</span>
              <span className={styles.metricIcon}>☁️</span>
            </div>
            <p className={styles.metricValue}>100% Protegido</p>
            <div className={styles.metricSub}>
              <span>Enlaces permanentes de respaldo</span>
            </div>
          </div>
        </div>

        {/* Dropzone OCR de Vouchers */}
        <div className={styles.dropzoneBox}>
          <div className={styles.dropIconBox}>📑</div>
          <h2 className={styles.dropTitle}>
            {selectedFile ? `Archivo listo: ${selectedFile.name}` : "Arrastra tu factura o haz clic para subir"}
          </h2>
          <p className={styles.dropSub}>
            Compatible con fotos (JPG, PNG) y PDF de facturas con NCF. Axelin identificará automáticamente el RNC y calculará el 18% o tasa aplicable.
          </p>

          <label style={{ cursor: "pointer", marginBlockStart: "8px" }}>
            <span className={styles.ocrButton}>
              {selectedFile ? "Cambiar archivo" : "Seleccionar Comprobante / Voucher"}
            </span>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>

          {selectedFile && !extractedData && (
            <button
              onClick={handleProcessOcr}
              disabled={isProcessing}
              className={styles.ocrButton}
              style={{ marginBlockStart: "12px", background: "var(--agent-gradient)" }}
            >
              {isProcessing ? "🧠 Analizando con Gemini/OpenAI OCR..." : "✨ Extraer Datos del Voucher"}
            </button>
          )}
        </div>

        {/* Tarjeta de Datos Extraídos */}
        {extractedData && (
          <div className={styles.resultPanel} style={{ marginBlockStart: "32px" }}>
            <div className={styles.resultHeader}>
              <h3 className={styles.resultTitle}>
                <span>✨ Voucher Procesado y Validado</span>
              </h3>
              <span className={styles.dgiiTag}>
                🏛️ Listo para Formato 606 DGII
              </span>
            </div>

            <div className={styles.dataGrid}>
              <div className={styles.dataItem}>
                <span className={styles.dataLabel}>Emisor del Comprobante</span>
                <span className={styles.dataValue}>{extractedData.issuer}</span>
              </div>
              <div className={styles.dataItem}>
                <span className={styles.dataLabel}>RNC Verificado</span>
                <span className={styles.dataValue}>{extractedData.rnc}</span>
              </div>
              <div className={styles.dataItem}>
                <span className={styles.dataLabel}>NCF (Crédito Fiscal)</span>
                <span className={styles.dataValue}>{extractedData.ncf}</span>
              </div>
              <div className={styles.dataItem}>
                <span className={styles.dataLabel}>Fecha de Emisión</span>
                <span className={styles.dataValue}>{extractedData.date}</span>
              </div>
              <div className={styles.dataItem}>
                <span className={styles.dataLabel}>ITBIS Facturado (18%)</span>
                <span className={styles.dataValue} style={{ color: "var(--warning)" }}>
                  RD$ {extractedData.itbis.toFixed(2)}
                </span>
              </div>
              <div className={styles.dataItem}>
                <span className={styles.dataLabel}>Monto Total</span>
                <span className={styles.dataValue} style={{ color: "var(--success)" }}>
                  RD$ {extractedData.total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className={styles.actionRow}>
              <button
                className={styles.btnSecondary}
                onClick={() => {
                  setSelectedFile(null);
                  setExtractedData(null);
                }}
              >
                Escanear otro voucher
              </button>
              <Link href="/transactions" className={styles.ocrButton} style={{ textDecoration: "none" }}>
                Confirmar y Registrar Gasto →
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
