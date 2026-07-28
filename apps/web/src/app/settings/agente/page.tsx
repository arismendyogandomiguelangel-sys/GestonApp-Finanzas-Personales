"use client";

import React from "react";
import { useProfile } from "@/ui/profile/profileContext";

export default function SettingsAgentPage() {
  const { profile, toggleAiModule, updateProfile, getAgentDisplayName } = useProfile();

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto", color: "#f8fafc" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: "700", margin: 0 }}>⚙️ Configuración del Agente IA (ALIAS)</h1>
        <p style={{ color: "#94a3b8", marginTop: "4px" }}>
          Administra la presencia de la Inteligencia Artificial y los permisos globales del workspace.
        </p>
      </div>

      <div style={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "24px", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "600", margin: 0 }}>Módulo de IA (ALIAS)</h3>
              <span
                style={{
                  fontSize: "0.75rem",
                  backgroundColor: "rgba(99, 102, 241, 0.2)",
                  color: "#818cf8",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontWeight: "600",
                }}
              >
                Control de Administrador
              </span>
            </div>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: "6px", marginBottom: 0 }}>
              Apaga o enciende totalmente las funciones de asistencia IA, barra flotante, dictado por voz y preguntas de aprendizaje.
            </p>
          </div>

          <label style={{ position: "relative", display: "inline-block", width: "50px", height: "26px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={profile.aiModuleEnabled}
              onChange={(e) => toggleAiModule(e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span
              style={{
                position: "absolute",
                cursor: "pointer",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: profile.aiModuleEnabled ? "#10b981" : "#475569",
                transition: "0.3s",
                borderRadius: "34px",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  content: '""',
                  height: "20px",
                  width: "20px",
                  left: profile.aiModuleEnabled ? "26px" : "3px",
                  bottom: "3px",
                  backgroundColor: "white",
                  transition: "0.3s",
                  borderRadius: "50%",
                }}
              />
            </span>
          </label>
        </div>

        <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #334155", fontSize: "0.875rem", color: profile.aiModuleEnabled ? "#10b981" : "#ef4444" }}>
          Estado actual: <strong>{profile.aiModuleEnabled ? "Habilitado (IA Activa)" : "Desactivado por el Administrador"}</strong>
        </div>
      </div>

      {profile.aiModuleEnabled && (
        <div style={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "24px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "600", margin: "0 0 16px" }}>Identidad de {getAgentDisplayName()}</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", color: "#cbd5e1", marginBottom: "6px" }}>Nombre del Asistente</label>
              <input
                type="text"
                value={profile.agentName}
                onChange={(e) => updateProfile({ agentName: e.target.value })}
                style={{ width: "100%", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "6px", padding: "10px", color: "#fff" }}
              />
            </div>

            <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "0.9rem" }}>
              <input
                type="checkbox"
                checked={profile.showAliasPrefix}
                onChange={(e) => updateProfile({ showAliasPrefix: e.target.checked })}
              />
              <span>Mostrar prefijo ALIAS en la interfaz de usuario</span>
            </label>

            <div>
              <label style={{ display: "block", fontSize: "0.875rem", color: "#cbd5e1", marginBottom: "6px" }}>Tono de género</label>
              <select
                value={profile.agentGender}
                onChange={(e) => updateProfile({ agentGender: e.target.value as typeof profile.agentGender })}
                style={{ width: "100%", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "6px", padding: "10px", color: "#fff" }}
              >
                <option value="masculine">Masculino</option>
                <option value="feminine">Femenino</option>
                <option value="neutral">Neutro</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.875rem", color: "#cbd5e1", marginBottom: "6px" }}>Modo de asistencia</label>
              <select
                value={profile.assistanceMode}
                onChange={(e) => updateProfile({ assistanceMode: e.target.value as typeof profile.assistanceMode })}
                style={{ width: "100%", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "6px", padding: "10px", color: "#fff" }}
              >
                <option value="objective">Orientado a Objetivos</option>
                <option value="eventual">Asistencia Eventual</option>
              </select>
            </div>

            <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "0.9rem" }}>
              <input
                type="checkbox"
                checked={profile.voiceEnabled}
                onChange={(e) => updateProfile({ voiceEnabled: e.target.checked })}
              />
              <span>Modo voz (respuestas habladas)</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
