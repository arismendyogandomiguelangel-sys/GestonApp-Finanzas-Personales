import { log } from "@/server/logger";

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate?: string;
  category: string;
  status: "active" | "achieved" | "paused";
}

export interface FinancialEventItem {
  id: string;
  name: string;
  estimatedCost: number;
  isPaid: boolean;
}

export interface FinancialEvent {
  id: string;
  name: string;
  eventType: "wedding" | "travel" | "car" | "housing" | "pregnancy" | "custom";
  estimatedBudget: number;
  items: FinancialEventItem[];
  targetDate?: string;
}

export interface RecurringExpense {
  id: string;
  name: string;
  amount: number;
  frequency: "monthly" | "biweekly" | "weekly" | "annual";
  dueDay: number;
  isVariable: boolean;
  category: string;
  paidThisMonth?: boolean;
}

const DEMO_SAVINGS_GOALS: SavingsGoal[] = [
  { id: "g1", name: "Fondo de Emergencia (6 meses)", targetAmount: 150000, currentAmount: 85000, targetDate: "2026-12-31", category: "Seguridad", status: "active" },
  { id: "g2", name: "Pie para Carro", targetAmount: 200000, currentAmount: 120000, targetDate: "2027-04-30", category: "Vehículo", status: "active" },
  { id: "g3", name: "Vacaciones en Punta Cana", targetAmount: 45000, currentAmount: 45000, targetDate: "2026-08-15", category: "Viajes", status: "achieved" },
];

const DEMO_EVENTS: FinancialEvent[] = [
  {
    id: "e1",
    name: "Boda de Ensueno",
    eventType: "wedding",
    estimatedBudget: 350000,
    targetDate: "2027-06-20",
    items: [
      { id: "i1", name: "Reserva de Salón", estimatedCost: 100000, isPaid: true },
      { id: "i2", name: "Catering y Comida", estimatedCost: 120000, isPaid: false },
      { id: "i3", name: "Fotografía y Video", estimatedCost: 45000, isPaid: false },
      { id: "i4", name: "Trajes y Vestido", estimatedCost: 50000, isPaid: false },
    ],
  },
  {
    id: "e2",
    name: "Viaje a Europa",
    eventType: "travel",
    estimatedBudget: 180000,
    targetDate: "2027-09-10",
    items: [
      { id: "i5", name: "Boletos de Avión", estimatedCost: 85000, isPaid: false },
      { id: "i6", name: "Hospedaje y Hoteles", estimatedCost: 60000, isPaid: false },
      { id: "i7", name: "Seguro y Bolsillo", estimatedCost: 35000, isPaid: false },
    ],
  },
];

const DEMO_RECURRING: RecurringExpense[] = [
  { id: "r1", name: "Alquiler Apartamento", amount: 22000, frequency: "monthly", dueDay: 5, isVariable: false, category: "Vivienda", paidThisMonth: true },
  { id: "r2", name: "Luz EDENORTE", amount: 2800, frequency: "monthly", dueDay: 15, isVariable: true, category: "Servicios", paidThisMonth: true },
  { id: "r3", name: "Agua CAASD", amount: 450, frequency: "monthly", dueDay: 20, isVariable: false, category: "Servicios", paidThisMonth: false },
  { id: "r4", name: "Internet Claro", amount: 2150, frequency: "monthly", dueDay: 25, isVariable: false, category: "Servicios", paidThisMonth: false },
];

export async function getSavingsGoals(_workspaceId: string): Promise<SavingsGoal[]> {
  return DEMO_SAVINGS_GOALS;
}

export async function getFinancialEvents(_workspaceId: string): Promise<FinancialEvent[]> {
  return DEMO_EVENTS;
}

export async function getRecurringExpenses(_workspaceId: string): Promise<RecurringExpense[]> {
  return DEMO_RECURRING;
}
