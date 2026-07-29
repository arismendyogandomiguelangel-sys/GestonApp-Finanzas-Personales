"use client";

import { useState, type FormEvent, type ReactElement } from "react";

import { fetchWithCsrf } from "@/lib/csrf";

import styles from "./LoginForm.module.css";

type AuthMode = "signIn" | "signUp" | "verifyEmail";

/**
 * Minimal sign-in form for AUTH_MODE=insforge.
 *
 * Credentials are posted to the app's own route, which exchanges them with
 * InsForge server-side; no token ever reaches client JavaScript.
 */
export const LoginForm = (): ReactElement => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [mode, setMode] = useState<AuthMode>("signIn");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const finishSignIn = (): void => {
    const returnTo = new URLSearchParams(window.location.search).get("returnTo");
    window.location.href = returnTo !== null && returnTo.startsWith("/") && !returnTo.startsWith("//")
      ? returnTo
      : "/";
  };

  const changeMode = (nextMode: AuthMode): void => {
    setMode(nextMode);
    setError("");
    setNotice("");
    setPassword("");
    setVerificationCode("");
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError("");
    setNotice("");
    setSubmitting(true);

    try {
      const endpoint = mode === "signIn"
        ? "/api/auth/insforge/login"
        : mode === "signUp"
          ? "/api/auth/insforge/register"
          : "/api/auth/insforge/verify-email";
      const body = mode === "verifyEmail"
        ? { email, code: verificationCode }
        : { email, password };
      const response = await fetchWithCsrf(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({})) as { error?: string };
        setError(body.error ?? "No se pudo iniciar sesión");
        return;
      }

      if (mode === "signUp") {
        const result = await response.json() as { requiresEmailVerification?: boolean };
        if (result.requiresEmailVerification) {
          setMode("verifyEmail");
          setPassword("");
          setNotice("Te enviamos un código de 6 dígitos. Revisa tu bandeja de entrada y spam.");
          return;
        }
      }

      finishSignIn();
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
        <p className={styles.subtitle}>
          {mode === "signIn"
            ? "Inicia sesión para continuar"
            : mode === "signUp"
              ? "Crea tu cuenta para comenzar"
              : "Confirma tu correo para activar tu cuenta"}
        </p>

        <label className={styles.label} htmlFor="email">Correo</label>
        <input
          id="email"
          className={styles.input}
          type="email"
          value={email}
          autoComplete="email"
          required
          disabled={mode === "verifyEmail"}
          onChange={(e) => setEmail(e.target.value)}
        />

        {mode === "verifyEmail" ? (
          <>
            <label className={styles.label} htmlFor="verification-code">Código de verificación</label>
            <input
              id="verification-code"
              className={styles.input}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              maxLength={6}
              value={verificationCode}
              required
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/gu, ""))}
            />
          </>
        ) : (
          <>
            <label className={styles.label} htmlFor="password">Contraseña</label>
            <div className={styles.passwordField}>
              <input
                id="password"
                className={`${styles.input} ${styles.passwordInput}`}
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                autoComplete={mode === "signUp" ? "new-password" : "current-password"}
                minLength={6}
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
          </>
        )}

        {error !== "" && <p className={styles.error} role="alert">{error}</p>}
        {notice !== "" && <p className={styles.notice} role="status">{notice}</p>}

        <button className={styles.button} type="submit" disabled={submitting}>
          {submitting
            ? "Procesando…"
            : mode === "signIn"
              ? "Entrar"
              : mode === "signUp"
                ? "Crear cuenta"
                : "Verificar correo"}
        </button>

        {mode === "signIn" && (
          <p className={styles.modeSwitch}>
            ¿Primera vez? <button type="button" onClick={() => changeMode("signUp")}>Crear cuenta</button>
          </p>
        )}
        {mode === "signUp" && (
          <p className={styles.modeSwitch}>
            ¿Ya tienes cuenta? <button type="button" onClick={() => changeMode("signIn")}>Iniciar sesión</button>
          </p>
        )}
        {mode === "verifyEmail" && (
          <p className={styles.modeSwitch}>
            ¿Usaste otro correo? <button type="button" onClick={() => changeMode("signUp")}>Volver al registro</button>
          </p>
        )}
      </form>
    </main>
  );
};
