"use client";

import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useProfile } from "@/ui/profile/profileContext";
import styles from "./FloatingAgentBar.module.css";

export function FloatingAgentBar() {
  const { profile, getAgentDisplayName } = useProfile();
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!profile.aiModuleEnabled) {
    return null;
  }

  const handleSend = () => {
    if (!input.trim()) return;
    // Redirect or send to chat
    window.location.href = `/chat?q=${encodeURIComponent(input.trim())}`;
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const toggleVoiceInput = () => {
    if (typeof window === "undefined") return;

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Su navegador no soporta reconocimiento de voz Web Speech API.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "es-DO";
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      window.location.href = `/vouchers?upload=1`;
    }
  };

  return (
    <div className={styles.barContainer}>
      <div className={styles.agentBadge}>
        <span className={styles.agentDot} />
        <span>{getAgentDisplayName()}</span>
      </div>

      <input
        type="text"
        className={styles.input}
        placeholder={t("agent.barPlaceholder", { defaultValue: "¿En qué puedo ayudarte hoy?" })}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*,.pdf"
        onChange={handleFileChange}
      />

      <div className={styles.actionButtons}>
        <button
          className={`${styles.iconBtn} ${isListening ? styles.iconBtnActive : ""}`}
          onClick={toggleVoiceInput}
          title={isListening ? "Escuchando..." : "Dictado por voz"}
          aria-label="Voz"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        </button>

        <button
          className={styles.iconBtn}
          onClick={handleFileClick}
          title="Adjuntar factura u OCR"
          aria-label="Adjuntar"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
          </svg>
        </button>

        <button className={styles.sendBtn} onClick={handleSend} title="Enviar" aria-label="Enviar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
