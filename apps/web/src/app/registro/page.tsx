"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "../login/login.module.css";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al registrar cuenta.");
        setLoading(false);
        return;
      }

      window.location.href = "/";
    } catch {
      setError("No se pudo conectar con el servidor.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logoIcon}>G</div>
          <h1 className={styles.title}>Crear Cuenta</h1>
          <p className={styles.subtitle}>Empieza a organizar tus finanzas con ALIAS</p>
        </div>

        {error && <div className={styles.alertError}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Nombre Completo</label>
            <input
              type="text"
              required
              className={styles.input}
              placeholder="Tu Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Correo Electrónico</label>
            <input
              type="email"
              required
              className={styles.input}
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Contraseña</label>
            <input
              type="password"
              required
              className={styles.input}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? "Creando cuenta..." : "Registrarme"}
          </button>
        </form>

        <div className={styles.footer}>
          ¿Ya tienes cuenta?
          <Link href="/login" className={styles.link}>
            Inicia Sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
