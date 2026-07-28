/**
 * Applies the "Orientado a Objetivos" assistance mode (plan maestro section 4):
 * when a spend transaction is created and the workspace has active savings
 * goals, queue a learning question about its impact. In "Asistencia Eventual"
 * mode this never fires — that mode is silent by design.
 */
import { queryAs } from "@/server/db";
import { log } from "@/server/logger";
import { getAgentProfile } from "@/server/agent/systemPrompt";
import { enqueueLearningQuestion } from "@/server/agent/learningEngine";

type LedgerEntryForGoalCheck = Readonly<{
  amount: number;
  currency: string;
  kind: string;
  category: string | null;
}>;

const findActiveGoal = async (
  userId: string,
  workspaceId: string,
): Promise<{ id: string; name: string } | null> => {
  const result = await queryAs(
    userId, workspaceId,
    `SELECT id, name FROM savings_goals
     WHERE workspace_id = $1 AND status = 'active'
     ORDER BY created_at ASC LIMIT 1`,
    [workspaceId],
  );
  if (result.rows.length === 0) return null;
  const row = result.rows[0] as { id: string; name: string };
  return row;
};

/** Best-effort: never throws, callers should fire-and-forget this. */
export const maybeQueueGoalImpactQuestion = async (
  userId: string,
  workspaceId: string,
  entry: LedgerEntryForGoalCheck,
): Promise<void> => {
  try {
    if (entry.kind !== "spend") return;

    const profile = await getAgentProfile(userId, workspaceId);
    if (profile.assistanceMode !== "objective") return;

    const goal = await findActiveGoal(userId, workspaceId);
    if (goal === null) return;

    const amountText = `${entry.amount.toLocaleString("es-DO", { maximumFractionDigits: 2 })} ${entry.currency}`;
    const categoryText = entry.category !== null && entry.category !== "" ? ` (${entry.category})` : "";
    await enqueueLearningQuestion(
      userId,
      workspaceId,
      `Acabas de gastar ${amountText}${categoryText}. ¿Esto afecta tu meta "${goal.name}"?`,
      { goalId: goal.id, amount: entry.amount, currency: entry.currency },
      2,
    );
  } catch (err) {
    log({
      domain: "api",
      action: "error",
      route: "/server/agent/goalImpact",
      method: "internal",
      error: err instanceof Error ? err.message : String(err),
    });
  }
};
