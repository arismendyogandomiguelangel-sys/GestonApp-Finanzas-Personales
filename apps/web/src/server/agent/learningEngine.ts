import { log } from "@/server/logger";

export interface LearningItem {
  id: string;
  question: string;
  contextData?: Record<string, unknown>;
  priority: number;
  status: "pending" | "answered" | "ignored" | "expired";
  ignoredCount: number;
}

// In-memory fallback / demo learning queue manager
const MEMORY_LEARNING_QUEUE: LearningItem[] = [
  {
    id: "learn_1",
    question: "Vi que pagaste luz EDENORTE por RD$2,300. ¿Es un gasto fijo mensual?",
    contextData: { category: "Servicios", amount: 2300 },
    priority: 1,
    status: "pending",
    ignoredCount: 0,
  },
];

export async function getNextLearningQuestion(
  _workspaceId: string
): Promise<LearningItem | null> {
  try {
    const active = MEMORY_LEARNING_QUEUE.find(
      (item) => item.status === "pending" && item.ignoredCount < 3
    );

    if (!active) return null;
    return active;
  } catch (err) {
    log({
      domain: "api",
      action: "error",
      route: "/agent/learning",
      method: "GET",
      error: err instanceof Error ? err.message : String(err),
    });
    return null;
  }
}

export async function handleQuestionResponse(
  questionId: string,
  response: "answer" | "ignore",
  _answerData?: string
): Promise<void> {
  const item = MEMORY_LEARNING_QUEUE.find((q) => q.id === questionId);
  if (!item) return;

  if (response === "answer") {
    item.status = "answered";
  } else {
    item.ignoredCount += 1;
    if (item.ignoredCount >= 3) {
      item.status = "expired";
    } else {
      item.status = "ignored";
    }
  }
}
