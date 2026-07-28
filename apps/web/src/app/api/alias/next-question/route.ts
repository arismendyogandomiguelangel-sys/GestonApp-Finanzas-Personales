import { isDemoModeFromRequest } from "@/lib/demoMode";
import { handleRoute } from "@/server/api/handleRoute";
import { extractUserId, extractWorkspaceId } from "@/server/userId";
import { getNextLearningQuestion } from "@/server/agent/learningEngine";

const DEMO_QUESTION = {
  id: "learn_demo_1",
  question: "Vi que pagaste luz EDENORTE por RD$2,300. ¿Es un gasto fijo mensual?",
  contextData: { category: "Servicios", amount: 2300 },
  priority: 1,
  status: "pending" as const,
  ignoredCount: 0,
};

export const GET = async (request: Request): Promise<Response> =>
  handleRoute(
    { route: "/api/alias/next-question", method: "GET", internalErrorMessage: "Failed to load learning queue" },
    async (): Promise<Response> => {
      if (isDemoModeFromRequest(request)) {
        return Response.json({ question: DEMO_QUESTION });
      }

      const userId = extractUserId(request);
      const workspaceId = extractWorkspaceId(request);
      const question = await getNextLearningQuestion(userId, workspaceId);
      return Response.json({ question });
    },
  );
