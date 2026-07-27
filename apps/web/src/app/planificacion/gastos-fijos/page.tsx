"use client";

import React, { useState } from "react";
import { RecurringExpense } from "@/server/planning";

const INITIAL_RECURRING: RecurringExpense[] = [
  { id: "r1", name: "Alquiler Apartamento", amount: 22000, frequency: "monthly", dueDay: 5, isVariable: false, category: "Vivienda", paidThisMonth: true },
  { id: "r2", name: "Luz EDENORTE", amount: 2800, frequency: "monthly", dueDay: 15, isVariable: true, category: "Servicios", paidThisMonth: true },
  { id: "r3", name: "Agua CAASD", amount: 450, frequency: "monthly", dueDay: 20, isVariable: false, category: "Servicios", paidThisMonth: false },
  { id: "r4", name: "Internet Claro", amount: 2150, frequency: "monthly", dueDay: 25, isVariable: false, category: "Servicios", paidThisMonth: false },
];

export default function PlanningFixedPage() {
  const [expenses, setExpenses] = useState<RecurringExpense[]>(INITIAL_RECURRING);

  const togglePaid = (id: string) => {
    setExpenses((prev) =>
      prev.map((item) => (item.id === id ? { ...item, paidThisMonth: !item.paidThisMonth } : item))
    );
  };

  const totalMonthly = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div style={{ padding: "24px", maxWidth: "1000px", margin: "0 auto", color: "#f8fafc" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: "700", margin: 0 }}>🏠 Gastos Fijos Recurrentes</h1>
          <p style={{ color: "#94a3b8", marginTop: "4px" }}>
            Lista maestra de pagos mensuales recurrentes con estado de cumplimiento.
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Total Estimado Mensual</span>
          <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#818cf8" }}>
            RD$ {totalMonthly.toLocaleString()}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {expenses.map((expense) => (
          <div
            key={expense.id}
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
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <input
                type="checkbox"
                checked={expense.paidThisMonth || false}
                onChange={() => togglePaid(expense.id)}
                style={{ width: "20px", height: "20px", accentColor: "#10b981", cursor: "pointer" }}
              />
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: "600", margin: 0 }}>{expense.name}</h3>
                  {expense.isVariable && (
                    <span style={{ fontSize: "0.7rem", backgroundColor: "rgba(245, 158, 11, 0.2)", color: "#f59e0b", padding: "1px 6px", borderRadius: "4px" }}>
                      Variable
                    </span>
                  )}
                </div>
                <span style={{ fontSize: "0.825rem", color: "#94a3b8" }}>
                  Vence el día {expense.dueDay} de cada mes • {expense.category}
                </span>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "1.1rem", fontWeight: "700" }}>RD$ {expense.amount.toLocaleString()}</span>
              <div style={{ fontSize: "0.75rem", color: expense.paidThisMonth ? "#10b981" : "#ef4444" }}>
                {expense.paidThisMonth ? "✓ Pagado este mes" : "Pendiente de pago"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
