import { log } from "@/server/logger";
import { queryAs } from "@/server/db";

export interface LearningItem {
  id: string;
  question: string;
  contextData: Record<string, unknown>;
  priority: number;
  status: "pending" | "answered" | "ignored" | "expired";
  ignoredCount: number;
}

type LearningRow = Readonly<{
  id: string;
  question: string;
  context_data: Record<string, unknown>;
  priority: number;
  status: LearningItem["status"];
  ignored_count: number;
}>;

const toLearningItem = (row: LearningRow): LearningItem => ({
  id: row.id,
  question: row.question,
  contextData: row.context_data,
  priority: row.priority,
  status: row.status,
  ignoredCount: row.ignored_count,
});

/**
 * Returns the single highest-priority pending question for this workspace,
 * or null if there is none. Ignored 3+ times = expired (excluded here).
 * "Max 1 question per session" is enforced client-side (LearningBanner),
 * since a session isn't a DB concept for this queue.
 */
export async function getNextLearningQuestion(
  userId: string,
  workspaceId: string,
): Promise<LearningItem | null> {
  try {
    const result = await queryAs(
      userId, workspaceId,
      `SELECT id, question, context_data, priority, status, ignored_count
       FROM agent_learning_queue
       WHERE workspace_id = $1 AND status = 'pending' AND ignored_count < 3
       ORDER BY priority DESC, created_at ASC
       LIMIT 1`,
      [workspaceId],
    );
    if (result.rows.length === 0) return null;
    return toLearningItem(result.rows[0] as LearningRow);
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

/** Adds a question to the workspace's learning queue (called by the learning/observation flow). */
export async function enqueueLearningQuestion(
  userId: string,
  workspaceId: string,
  question: string,
  contextData: Record<string, unknown> = {},
  priority = 1,
): Promise<void> {
  await queryAs(
    userId, workspaceId,
    `INSERT INTO agent_learning_queue (workspace_id, question, context_data, priority)
     VALUES ($1, $2, $3, $4)`,
    [workspaceId, question, JSON.stringify(contextData), priority],
  );
}

export async function handleQuestionResponse(
  userId: string,
  workspaceId: string,
  questionId: string,
  response: "answer" | "ignore",
): Promise<void> {
  if (response === "answer") {
    await queryAs(
      userId, workspaceId,
      `UPDATE agent_learning_queue SET status = 'answered', updated_at = clock_timestamp()
       WHERE id = $1 AND workspace_id = $2`,
      [questionId, workspaceId],
    );
    return;
  }

  await queryAs(
    userId, workspaceId,
    `UPDATE agent_learning_queue
     SET ignored_count = ignored_count + 1,
         status = CASE WHEN ignored_count + 1 >= 3 THEN 'expired' ELSE 'ignored' END,
         updated_at = clock_timestamp()
     WHERE id = $1 AND workspace_id = $2`,
    [questionId, workspaceId],
  );
}
