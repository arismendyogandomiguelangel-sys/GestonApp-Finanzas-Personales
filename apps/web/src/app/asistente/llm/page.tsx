"use client";

import React from "react";
import { LlmProviderSelector } from "@/ui/agent/LlmProviderSelector";

import { useProfile } from "@/ui/profile/profileContext";

export default function LlmPage() {
  const { profile, toggleAiModule } = useProfile();

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto", color: "#f8fafc" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: "700", margin: 0 }}>
            🤖 Proveedores de Inteligencia Artificial (Multi-LLM)
          </h1>
          <p style={{ color: "#94a3b8", marginTop: "4px" }}>
            Selecciona y prueba el modelo de lenguaje que alimentará a tu agente ALIAS.
          </p>
        </div>

        <button
          onClick={() => toggleAiModule(!profile.aiModuleEnabled)}
          style={{
            backgroundColor: profile.aiModuleEnabled ? "rgba(239, 68, 68, 0.2)" : "rgba(16, 185, 129, 0.2)",
            color: profile.aiModuleEnabled ? "#ef4444" : "#10b981",
            border: `1px solid ${profile.aiModuleEnabled ? "#ef4444" : "#10b981"}`,
            padding: "8px 16px",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          {profile.aiModuleEnabled ? "🚫 Apagar Módulo IA" : "⚡ Activar Módulo IA"}
        </button>
      </div>

      {!profile.aiModuleEnabled ? (
        <div style={{ backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid #ef4444", borderRadius: "10px", padding: "16px", marginBottom: "20px", color: "#fca5a5" }}>
          ⚠️ <strong>Módulo de IA Desactivado por el Administrador:</strong> Las funciones agénticas de ALIAS están apagadas. Puedes reactivarlas arriba o desde Configuración → Agente IA.
        </div>
      ) : (
        <LlmProviderSelector />
      )}
    </div>
  );
}
