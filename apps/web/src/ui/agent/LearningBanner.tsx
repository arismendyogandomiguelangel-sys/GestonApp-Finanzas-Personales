"use client";

import React, { useState } from "react";
import { useProfile } from "@/ui/profile/profileContext";
import styles from "./LearningBanner.module.css";

export function LearningBanner() {
  const { profile, getAgentDisplayName } = useProfile();
  const [dismissed, setDismissed] = useState(false);
  const [answered, setAnswered] = useState(false);

  // Demo active learning question (max 1 per session)
  const [question] = useState({
    id: "learn_demo_1",
    text: "Vi que pagaste luz EDENORTE por RD$2,300. ¿Quieres que lo guarde como gasto recurrente mensual?",
  });

  if (!profile.aiModuleEnabled || dismissed) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <div className={styles.agentAvatar}>A</div>
        <span className={styles.questionText}>
          <strong>[{getAgentDisplayName()}]</strong>: {answered ? "¡Gracias! Aprendido." : question.text}
        </span>
      </div>

      {!answered ? (
        <div className={styles.actions}>
          <button
            className={styles.yesBtn}
            onClick={() => {
              setAnswered(true);
              setTimeout(() => setDismissed(true), 2000);
            }}
          >
            Sí, guardar
          </button>
          <button className={styles.ignoreBtn} onClick={() => setDismissed(true)}>
            Ignorar
          </button>
        </div>
      ) : null}
    </div>
  );
}
