"use client";

import React from "react";
import styles from "./ModuleHeaderIHA.module.css";

export interface ModuleHeaderIHAProps {
  title: string;
  categoryCode: "A" | "B" | "C" | "D" | "E" | "F";
  categoryLabel: string;
  description: string;
  agentContextLabel?: string;
}

export function ModuleHeaderIHA(props: ModuleHeaderIHAProps) {
  const {
    title,
    categoryCode,
    categoryLabel,
    description,
    agentContextLabel = "Axelin coordinado en esta vista",
  } = props;

  return (
    <div className={styles.headerContainer}>
      <div className={styles.leftSection}>
        <div className={styles.titleRow}>
          <h1 className={styles.moduleTitle}>{title}</h1>
          <span className={styles.categoryBadge}>
            Cat. {categoryCode} · {categoryLabel}
          </span>
        </div>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.agentContextPill} title="Axelin tiene contexto del módulo abierto para sugerir transacciones y categorías">
          <span className={styles.pulseDot} />
          <span>{agentContextLabel}</span>
        </div>
      </div>
    </div>
  );
}
