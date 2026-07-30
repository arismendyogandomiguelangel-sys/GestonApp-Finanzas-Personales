"use client";

import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { useProfile } from "@/ui/profile/profileContext";
import { NAVIGATION_STRUCTURE } from "@/lib/navigation";
import { speakText } from "@/lib/tts";
import styles from "./FloatingAgentBar.module.css";

const ACK_BY_GENDER: Record<string, string> = {
  masculine: "Listo, lo envié a ALIAS.",
  feminine: "Lista, lo envié a ALIAS.",
  neutral: "Enviado a ALIAS.",
};

interface WidgetMessage {
  id: string;
  sender: "agent" | "user";
  text: string;
}

export function FloatingAgentBar() {
  const { profile, getAgentDisplayName } = useProfile();
  const { t } = useTranslation();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<WidgetMessage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!profile.aiModuleEnabled) {
    return null;
  }

  // Context-aware: module location travels with message
  const currentModule = NAVIGATION_STRUCTURE.find((item) =>
    item.baseHref === "/"
      ? pathname === "/" || pathname === "/actividad"
      : pathname.startsWith(item.baseHref)
  );
  const moduleLabel = currentModule ? t(currentModule.labelKey) : "Finanzas Personales";

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    const newMsg: WidgetMessage = {
      id: `${Date.now()}-u`,
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    if (profile.voiceEnabled) {
      speakText(ACK_BY_GENDER[profile.agentGender] ?? ACK_BY_GENDER.neutral, profile.agentGender);
    }

    // Respuesta asistida inmediata de ALIAS / Axelin o redirigir si es consulta extensa
    setTimeout(() => {
      const agentReply: WidgetMessage = {
        id: `${Date.now()}-a`,
        sender: "agent",
        text: `He tomado nota de "${userText}" en el contexto de ${moduleLabel}. ¿Deseas guardar un borrador confirmado o ver el análisis completo en el chat principal?`,
      };
      setMessages((prev) => [...prev, agentReply]);
    }, 450);
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

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleOpenFullscreen = () => {
    const params = new URLSearchParams();
    if (moduleLabel) params.set("context", moduleLabel);
    if (input.trim()) params.set("q", input.trim());
    window.location.href = `/chat?${params.toString()}`;
  };

  return (
    <>
      {/* Botón flotante opcional (Widget Toggle Icon) */}
      <div className={styles.triggerContainer}>
        <button
          type="button"
          className={styles.triggerButton}
          onClick={() => setIsOpen((prev) => !prev)}
          title="Abrir o cerrar asistente ALIAS / Axelin"
          aria-label="Toggle Axelin AI Widget"
        >
          <div className={styles.triggerAvatar}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"/>
              <path d="M4 11h16"/>
              <path d="M5 11v6a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-6"/>
              <circle cx="9" cy="15" r="1"/>
              <circle cx="15" cy="15" r="1"/>
            </svg>
            <span className={styles.agentDot} />
          </div>
          <div className={styles.triggerLabel}>
            <span>{getAgentDisplayName()}</span>
            <span className={styles.triggerSub}>{moduleLabel}</span>
          </div>
        </button>
      </div>

      {/* Widget Flotante Conversacional en Vivo */}
      {isOpen && (
        <div className={styles.widgetContainer} aria-label="Widget Conversacional Axelin">
          <div className={styles.widgetHeader}>
            <div className={styles.headerLeft}>
              <div>
                <div className={styles.headerTitle}>{getAgentDisplayName()} · Asistente IHA</div>
                <div className={styles.headerContext}>
                  <span>Módulo activo:</span>
                  <span className={styles.contextPill}>{moduleLabel}</span>
                </div>
              </div>
            </div>
            <div className={styles.headerActions}>
              <button
                type="button"
                className={styles.headerIconButton}
                onClick={handleOpenFullscreen}
                title="Expandir a chat pantalla completa"
                aria-label="Pantalla completa"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              </button>
              <button
                type="button"
                className={styles.headerIconButton}
                onClick={() => setIsOpen(false)}
                title="Cerrar widget"
                aria-label="Cerrar"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Indicador de Objetivo Activo y Progreso IHA */}
          <div className={styles.objectiveBanner}>
            <div className={styles.objectiveTop}>
              <span>Objetivo activo: Organizar mis finanzas del mes</span>
              <span>65% listo</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: "65%" }} />
            </div>
          </div>

          {/* Conversación Contextual */}
          <div className={styles.widgetBody}>
            <div className={styles.agentBubble}>
              <strong>Hola, soy {getAgentDisplayName()}.</strong> Estoy coordinado con tu contexto de <em>{moduleLabel}</em>. ¿En qué paso te puedo asistir? Recuerda que tú decides y confirmas antes de guardar datos.
            </div>

            {messages.map((m) =>
              m.sender === "user" ? (
                <div key={m.id} className={styles.userBubble}>
                  {m.text}
                </div>
              ) : (
                <div key={m.id} className={styles.agentBubble}>
                  {m.text}
                </div>
              )
            )}

            <div className={styles.suggestionPills}>
              <button
                type="button"
                className={styles.pillBtn}
                onClick={() => handleSuggestionClick("Registrar cobro de RD$45,000")}
              >
                + Ingreso / Cobro
              </button>
              <button
                type="button"
                className={styles.pillBtn}
                onClick={() => handleSuggestionClick("Consultar disponibilidad para presupuesto mensual")}
              >
                Revisar presupuesto
              </button>
              <button
                type="button"
                className={styles.pillBtn}
                onClick={() => handleSuggestionClick("Estado de conexión MCP y agentes")}
              >
                Auditar permisos
              </button>
            </div>
          </div>

          {/* Barra de Entrada en el propio Widget */}
          <div className={styles.widgetFooter}>
            <input
              type="text"
              className={styles.input}
              placeholder="Pregunta a Axelin o dicta un movimiento..."
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
                type="button"
                className={`${styles.iconBtn} ${isListening ? styles.iconBtnActive : ""}`}
                onClick={toggleVoiceInput}
                title={isListening ? "Escuchando..." : "Dictado por voz"}
                aria-label="Voz"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="23"/>
                  <line x1="8" y1="23" x2="16" y2="23"/>
                </svg>
              </button>

              <button
                type="button"
                className={styles.iconBtn}
                onClick={handleFileClick}
                title="Adjuntar factura u OCR"
                aria-label="Adjuntar"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                </svg>
              </button>

              <button type="button" className={styles.sendBtn} onClick={handleSend} title="Enviar" aria-label="Enviar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
