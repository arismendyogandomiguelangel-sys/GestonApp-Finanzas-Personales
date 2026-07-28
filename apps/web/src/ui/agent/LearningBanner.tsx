"use client";

import React, { useEffect, useState } from "react";
import { useProfile } from "@/ui/profile/profileContext";
import { fetchWithCsrf } from "@/lib/csrf";
import styles from "./LearningBanner.module.css";

// "Max 1 question per session" (checklist 2.4) is enforced here: once resolved
// once this tab session, never fetch/show another, even if more are pending.
const SESSION_FLAG_KEY = "alias_learning_shown_this_session";

type LearningQuestion = Readonly<{
  id: string;
  question: string;
}>;

export function LearningBanner() {
  const { profile, getAgentDisplayName } = useProfile();
  const [question, setQuestion] = useState<LearningQuestion | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    if (!profile.aiModuleEnabled) return;
    if (sessionStorage.getItem(SESSION_FLAG_KEY) === "1") return;

    fetch("/api/alias/next-question")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { question: LearningQuestion | null } | null) => {
        if (data?.question) setQuestion(data.question);
      })
      .catch(() => {
        // No question available — banner stays hidden
      });
  }, [profile.aiModuleEnabled]);

  const resolve = (action: "answer" | "dismiss"): void => {
    if (!question) return;
    sessionStorage.setItem(SESSION_FLAG_KEY, "1");
    fetchWithCsrf(`/api/alias/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId: question.id }),
    }).catch(() => {
      // Best-effort — the UI already reflects the resolution
    });
  };

  if (!profile.aiModuleEnabled || dismissed || !question) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <div className={styles.agentAvatar}>A</div>
        <span className={styles.questionText}>
          <strong>[{getAgentDisplayName()}]</strong>: {answered ? "¡Gracias! Aprendido." : question.question}
        </span>
      </div>

      {!answered ? (
        <div className={styles.actions}>
          <button
            className={styles.yesBtn}
            onClick={() => {
              resolve("answer");
              setAnswered(true);
              setTimeout(() => setDismissed(true), 2000);
            }}
          >
            Sí, guardar
          </button>
          <button
            className={styles.ignoreBtn}
            onClick={() => {
              resolve("dismiss");
              setDismissed(true);
            }}
          >
            Ignorar
          </button>
        </div>
      ) : null}
    </div>
  );
}
