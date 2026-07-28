"use client";

// Web Speech API TTS (checklist 2.2/2.3): browsers don't reliably expose voice
// gender metadata cross-platform, so gender is applied via pitch — the one
// signal every implementation of SpeechSynthesisUtterance supports.
export type TtsGender = "masculine" | "feminine" | "neutral";

const PITCH_BY_GENDER: Record<TtsGender, number> = {
  masculine: 0.85,
  feminine: 1.25,
  neutral: 1,
};

export const isTtsSupported = (): boolean =>
  typeof window !== "undefined" && "speechSynthesis" in window;

export const speakText = (text: string, gender: TtsGender, locale = "es-DO"): void => {
  if (!isTtsSupported() || text.trim().length === 0) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = locale;
  utterance.pitch = PITCH_BY_GENDER[gender];
  utterance.rate = 1;
  window.speechSynthesis.speak(utterance);
};
