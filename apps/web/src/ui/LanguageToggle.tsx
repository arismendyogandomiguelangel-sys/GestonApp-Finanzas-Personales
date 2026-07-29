"use client";

import { type ReactElement, useState } from "react";

import { fetchWithCsrf } from "@/lib/csrf";
import type { SupportedLocale } from "@/lib/locale";

import styles from "./AppearanceControls.module.css";

type Props = Readonly<{
  locale: SupportedLocale;
}>;

export const LanguageToggle = (props: Props): ReactElement => {
  const { locale } = props;
  const [saving, setSaving] = useState(false);
  const nextLocale: SupportedLocale = locale === "es" ? "en" : "es";
  const label = locale === "es" ? "Cambiar a inglés" : "Switch to Spanish";

  const changeLanguage = async (): Promise<void> => {
    setSaving(true);
    try {
      const response = await fetchWithCsrf("/api/user-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: nextLocale }),
      });
      if (!response.ok) throw new Error("Unable to save language preference");
      window.location.reload();
    } finally {
      setSaving(false);
    }
  };

  return (
    <button className={styles.languageButton} type="button" onClick={() => { void changeLanguage(); }} disabled={saving} aria-label={label} title={label}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>
      <span>{locale === "es" ? "ES" : "EN"}</span>
    </button>
  );
};
