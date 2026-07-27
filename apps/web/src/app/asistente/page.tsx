"use client";

import React from "react";
import { useProfile } from "@/ui/profile/profileContext";

export default function AsistenteMainPage() {
  const { getAgentDisplayName } = useProfile();

  return (
    <div style={{ padding: "24px", maxWidth: "1000px", margin: "0 auto", color: "#f8fafc" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: "700", margin: 0 }}>
            🧠 Centro de Control Agéntico — {getAgentDisplayName()}
          </h1>
          <p style={{ color: "#94a3b8", marginTop: "4px" }}>
            Tu asistente financiero personal e inteligencia activa del workspace.
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
        <a
          href="/chat"
          style={{
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "12px",
            padding: "20px",
            color: "inherit",
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div style={{ fontSize: "1.5rem" }}>💬</div>
          <h3 style={{ margin: 0, fontSize: "1.1rem" }}>Chat Completo con ALIAS</h3>
          <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.875rem" }}>
            Conversa en pantalla completa con tus datos financieros.
          </p>
        </a>

        <a
          href="/asistente/memoria"
          style={{
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "12px",
            padding: "20px",
            color: "inherit",
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div style={{ fontSize: "1.5rem" }}>📚</div>
          <h3 style={{ margin: 0, fontSize: "1.1rem" }}>Memoria & Aprendizaje</h3>
          <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.875rem" }}>
            Revisa los patrones y reglas que ALIAS ha aprendido sobre ti.
          </p>
        </a>

        <a
          href="/asistente/reglas"
          style={{
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "12px",
            padding: "20px",
            color: "inherit",
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div style={{ fontSize: "1.5rem" }}>⚙️</div>
          <h3 style={{ margin: 0, fontSize: "1.1rem" }}>Reglas de Comportamiento</h3>
          <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.875rem" }}>
            Programa la proactividad, alertas y notificaciones del agente.
          </p>
        </a>

        <a
          href="/asistente/llm"
          style={{
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "12px",
            padding: "20px",
            color: "inherit",
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div style={{ fontSize: "1.5rem" }}>🤖</div>
          <h3 style={{ margin: 0, fontSize: "1.1rem" }}>Proveedores Multi-LLM</h3>
          <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.875rem" }}>
            Configura Ollama local, Gemini, ChatGPT o Alibaba.
          </p>
        </a>
      </div>
    </div>
  );
}
