import { log } from "@/server/logger";

export type BehaviorRuleType =
  | "sunday_planning"
  | "silent_register"
  | "pre_billing"
  | "goal_alert";

export interface BehaviorRule {
  id: string;
  type: BehaviorRuleType;
  title: string;
  description: string;
  enabled: boolean;
  triggerSchedule?: string;
}

export const DEFAULT_BEHAVIOR_RULES: BehaviorRule[] = [
  {
    id: "rule_1",
    type: "sunday_planning",
    title: "Planificación Dominical",
    description: "Domingos entre 6:00 AM y 10:00 AM, ALIAS abre sesión de preguntas para organizar el presupuesto semanal.",
    enabled: true,
    triggerSchedule: "Domingos 8:00 AM",
  },
  {
    id: "rule_2",
    type: "silent_register",
    title: "Registro Silencioso",
    description: "Lunes a Sábado de 8:00 AM a 9:00 PM, ALIAS solo registra transacciones sin notificaciones ni preguntas.",
    enabled: false,
  },
  {
    id: "rule_3",
    type: "pre_billing",
    title: "Pre-Cobro de Ingresos Recurrentes",
    description: "1 día antes de las fechas de cobro de nómina (ej. 14 y 29), ALIAS sugiere reorganizar el presupuesto.",
    enabled: true,
    triggerSchedule: "14 y 29 de cada mes",
  },
  {
    id: "rule_4",
    type: "goal_alert",
    title: "Alerta de Desviación de Objetivos",
    description: "Emite una alerta si un gasto no planificado excede el umbral y compromete una meta de ahorro activa.",
    enabled: true,
  },
];

export async function getBehaviorRules(_workspaceId: string): Promise<BehaviorRule[]> {
  return DEFAULT_BEHAVIOR_RULES;
}
