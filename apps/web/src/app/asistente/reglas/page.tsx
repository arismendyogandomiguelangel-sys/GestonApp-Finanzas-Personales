"use client";

import React, { useState } from "react";
import { DEFAULT_BEHAVIOR_RULES, BehaviorRule } from "@/server/agent/behaviorRules";

export default function AgentRulesPage() {
  const [rules, setRules] = useState<BehaviorRule[]>(DEFAULT_BEHAVIOR_RULES);

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto", color: "#f8fafc" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: "700", marginBottom: "8px" }}>
        ⚙️ Reglas de Comportamiento de ALIAS
      </h1>
      <p style={{ color: "#94a3b8", marginBottom: "24px" }}>
        Configura cómo y cuándo tu asistente financiero interactúa contigo.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {rules.map((rule) => (
          <div
            key={rule.id}
            style={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "12px",
              padding: "20px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "600", margin: 0 }}>{rule.title}</h3>
                {rule.triggerSchedule && (
                  <span
                    style={{
                      fontSize: "0.75rem",
                      backgroundColor: "rgba(99, 102, 241, 0.2)",
                      color: "#818cf8",
                      padding: "2px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    {rule.triggerSchedule}
                  </span>
                )}
              </div>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem", margin: 0, lineHeight: "1.5" }}>
                {rule.description}
              </p>
            </div>

            <label style={{ display: "flex", alignItems: "center", cursor: "pointer", position: "relative" }}>
              <input
                type="checkbox"
                checked={rule.enabled}
                onChange={() => toggleRule(rule.id)}
                style={{ width: "20px", height: "20px", accentColor: "#6366f1", cursor: "pointer" }}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
