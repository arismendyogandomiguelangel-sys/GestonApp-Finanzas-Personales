"use client";

import { logClientError } from "@/lib/clientLogger";

export const logBudgetTableError = (
  operation: string,
  error: unknown,
): void => {
  logClientError(`BudgetTable.${operation}`, error);
};
