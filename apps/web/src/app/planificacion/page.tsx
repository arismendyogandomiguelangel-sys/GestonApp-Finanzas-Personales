"use client";

import React, { useState } from "react";
import { SavingsGoal } from "@/server/planning";

const INITIAL_GOALS: SavingsGoal[] = [
  { id: "g1", name: "Fondo de Emergencia (6 meses)", targetAmount: 150000, currentAmount: 85000, targetDate: "2026-12-31", category: "Seguridad", status: "active" },
  { id: "g2", name: "Pie para Carro", targetAmount: 200000, currentAmount: 120000, targetDate: "2027-04-30", category: "Vehículo", status: "active" },
  { id: "g3", name: "Vacaciones en Punta Cana", targetAmount: 45000, currentAmount: 45000, targetDate: "2026-08-15", category: "Viajes", status: "achieved" },
];

export default function PlanningGoalsPage() {
  const [goals] = useState<SavingsGoal[]>(INITIAL_GOALS);

  return (
    <div style={{ padding: "24px", maxWidth: "1000px", margin: "0 auto", color: "#f8fafc" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: "700", margin: 0 }}>🎯 Metas de Ahorro</h1>
          <p style={{ color: "#94a3b8", marginTop: "4px" }}>
            Visualiza tu progreso y asignación activa hacia tus objetivos financieros.
          </p>
        </div>
        <button
          style={{
            backgroundColor: "#6366f1",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 18px",
            fontWeight: "600",
            cursor: "pointer",
          }}
          onClick={() => alert("Nueva meta: puedes agregar metas interactivas.")}
        >
          + Nueva Meta
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
        {goals.map((goal) => {
          const pct = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
          const isCompleted = pct >= 100;

          return (
            <div
              key={goal.id}
              style={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "12px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      backgroundColor: isCompleted ? "rgba(16, 185, 129, 0.15)" : "rgba(99, 102, 241, 0.15)",
                      color: isCompleted ? "#10b981" : "#818cf8",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      fontWeight: "600",
                    }}
                  >
                    {goal.category}
                  </span>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "600", margin: "6px 0 0" }}>{goal.name}</h3>
                </div>
                <span style={{ fontSize: "1.2rem", fontWeight: "700", color: isCompleted ? "#10b981" : "#818cf8" }}>
                  {pct}%
                </span>
              </div>

              {/* Progress bar */}
              <div style={{ width: "100%", height: "8px", backgroundColor: "#0f172a", borderRadius: "4px", overflow: "hidden" }}>
                <div
                  style={{
                    width: `${pct}%`,
                    height: "100%",
                    background: isCompleted
                      ? "linear-gradient(90deg, #10b981 0%, #059669 100%)"
                      : "linear-gradient(90deg, #6366f1 0%, #a855f7 100%)",
                    transition: "width 500ms ease",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "#94a3b8" }}>
                <span>RD$ {goal.currentAmount.toLocaleString()} de RD$ {goal.targetAmount.toLocaleString()}</span>
                {goal.targetDate && <span>Meta: {goal.targetDate}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
