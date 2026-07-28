"use client";

/**
 * Centralized client-side error logging. The browser can't reach the server's
 * structured logger (server/logger.ts) — this is its client-side counterpart:
 * one sink, instead of scattered raw console.error calls across components.
 */
export const logClientError = (context: string, error: unknown): void => {
  // eslint-disable-next-line no-console
  console.error(`[${context}]`, error);
};
