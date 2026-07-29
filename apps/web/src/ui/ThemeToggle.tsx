"use client";

import type { ReactElement } from "react";

import type { Theme } from "@/lib/theme";

import styles from "./AppearanceControls.module.css";

type Props = Readonly<{
  initialTheme: Theme;
  locale: "en" | "es" | string;
}>;

export const ThemeToggle = (props: Props): ReactElement => {
  const { initialTheme, locale } = props;
  const isDark = initialTheme === "dark";
  const label = locale === "es"
    ? (isDark ? "Usar tema claro" : "Usar tema oscuro")
    : (isDark ? "Use light theme" : "Use dark theme");

  const toggleTheme = (): void => {
    const nextTheme: Theme = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    document.cookie = `theme=${nextTheme}; path=/; max-age=31536000; samesite=lax`;
    window.location.reload();
  };

  return (
    <button className={styles.iconButton} type="button" onClick={toggleTheme} aria-label={label} title={label}>
      {isDark ? (
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" /></svg>
      )}
    </button>
  );
};
