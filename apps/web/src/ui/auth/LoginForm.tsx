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
        <input
          id="password"
          className={styles.input}
          type="password"
          value={password}
          autoComplete="current-password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        {error !== "" && <p className={styles.error} role="alert">{error}</p>}

        <button className={styles.button} type="submit" disabled={submitting}>
          {submitting ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </main>
  );
};
