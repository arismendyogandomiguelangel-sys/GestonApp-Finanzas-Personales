"use client";

import React from "react";
import Link from "next/link";
import { useProfile } from "@/ui/profile/profileContext";
import { ModuleHeaderIHA } from "@/ui/agent/ModuleHeaderIHA";
import styles from "../page.module.css";

const AGENT_AREAS = [
  {
    id: "chat",
    href: "/chat",
    title: "Chat en Pantalla Completa",
    desc: "Abre una sesión inmersiva para conversar con tus transacciones, presupuestos y saldos reales en tu idioma.",
    badge: "E1",
    icon: "💬",
  },
  {
    id: "memoria",
    href: "/asistente/memoria",
    title: "Memoria & Patrones",
    desc: "Revisa las clasificaciones automáticas aprendidas de tus comercios, RNC y preferencias de cuentas.",
    badge: "E2",
    icon: "📚",
  },
  {
    id: "reglas",
    href: "/asistente/reglas",
    title: "Reglas de Comportamiento",
    desc: "Define umbrales de alerta, notificaciones de objetivos y comportamiento proactivo del asistente Axelin.",
    badge: "E3",
    icon: "⚙️",
  },
  {
    id: "llm",
    href: "/asistente/llm",
    title: "Orquestación Multi-LLM",
    desc: "Elige entre modelos locales (Ollama), OpenAI, Google Gemini o Antigravity según tus requisitos de privacidad.",
    badge: "E4",
    icon: "🤖",
  },
];

export default function AsistenteMainPage() {
  const { getAgentDisplayName } = useProfile();
  const agentName = getAgentDisplayName() || "Axelin";

  return (
    <main className="container">
      <section className="panel">
        <ModuleHeaderIHA
          title={`Asistente IA: ${agentName}`}
          categoryCode="E"
          categoryLabel="Asistente IA ALIAS / Axelin"
          description="Una conversación inteligente conectada con tus finanzas personales y empresariales. Axelin organiza, sugiere y explica; tú conservas el control y confirmas cada acción."
          agentContextLabel="Motor Inteligente Activo · 65% del Objetivo"
        />

        <div className={styles.categoryGrid}>
          {AGENT_AREAS.map((area) => (
            <Link key={area.id} href={area.href} className={styles.categoryCard}>
              <div className={styles.categoryTop}>
                <div className={styles.categoryBadgeIcon}>
                  {area.icon}
                </div>
                <div>
                  <h3 className={styles.categoryTitle}>{area.title}</h3>
                  <p className={styles.categoryDesc}>{area.desc}</p>
                </div>
              </div>

              <div className={styles.categoryFooter}>
                <span>Sección {area.badge} · Abrir módulo</span>
                <span className={styles.arrowIcon}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
