"use client";

import { useState, type FormEvent, type ReactElement } from "react";

import { fetchWithCsrf } from "@/lib/csrf";

import styles from "./LoginForm.module.css";

/**
 * Minimal sign-in form for AUTH_MODE=insforge.
 *
 * Credentials are posted to the app's own route, which exchanges them with
 * InsForge server-side; no token ever reaches client JavaScript.
 */
export const LoginForm = (): ReactElement => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetchWithCsrf("/api/auth/insforge/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({})) as { error?: string };
        setError(body.error ?? "No se pudo iniciar sesión");
        return;
      }

      // Full reload so the proxy re-runs and issues the workspace bootstrap.
      const returnTo = new URLSearchParams(window.location.search).get("returnTo");
      window.location.href = returnTo !== null && returnTo.startsWith("/") && !returnTo.startsWith("//")
        ? returnTo
        : "/";
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      <form className={styles.card} onSubmit={onSubmit}>
        <h1 className={styles.title}>GestionIHA Finanzas</h1>
        <p className={styles.subtitle}>Inicia sesión para continuar</p>

        <label className={styles.label} htmlFor="email">Correo</label>
        <input
          id="email"
          className={styles.input}
          type="email"
          value={email}
          autoComplete="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className={styles.label} htmlFor="password">Contraseña</label>
        <div className={styles.passwordField}>
          <input
            id="password"
            className={`${styles.input} ${styles.passwordInput}`}
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            autoComplete="current-password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={styles.passwordToggle}
            type="button"
            aria-label={isPasswordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
            aria-pressed={isPasswordVisible}
            title={isPasswordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
            onClick={() => setIsPasswordVisible((visible) => !visible)}
          >
            {isPasswordVisible ? (
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m3 3 18 18" />
                <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                <path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c5 0 8.8 4.2 9.8 6.1a1.9 1.9 0 0 1 0 1.8 16.1 16.1 0 0 1-3.1 4" />
                <path d="M6.2 6.2A16.3 16.3 0 0 0 2.2 10a1.9 1.9 0 0 0 0 1.8C3.2 13.8 7 18 12 18c1.1 0 2.2-.2 3.2-.6" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2.2 10.1a1.9 1.9 0 0 0 0 1.8C3.2 13.8 7 18 12 18s8.8-4.2 9.8-6.1a1.9 1.9 0 0 0 0-1.8C20.8 8.2 17 4 12 4S3.2 8.2 2.2 10.1Z" />
                <circle cx="12" cy="11" r="3" />
              </svg>
            )}
          </button>
        </div>

        {error !== "" && <p className={styles.error} role="alert">{error}</p>}

        <button className={styles.button} type="submit" disabled={submitting}>
          {submitting ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </main>
  );
};
