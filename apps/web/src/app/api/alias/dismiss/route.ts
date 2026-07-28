import { z } from "zod";

import { isDemoModeFromRequest } from "@/lib/demoMode";
import { handleRoute } from "@/server/api/handleRoute";
import { parseJsonBody } from "@/server/api/validation";
import { extractUserId, extractWorkspaceId } from "@/server/userId";
import { handleQuestionResponse } from "@/server/agent/learningEngine";

const bodySchema = z.object({ questionId: z.string().min(1) });

export const POST = async (request: Request): Promise<Response> =>
  handleRoute(
    { route: "/api/alias/dismiss", method: "POST", internalErrorMessage: "Failed to record learning dismissal" },
    async (): Promise<Response> => {
      const { questionId } = await parseJsonBody(request, bodySchema);

      if (isDemoModeFromRequest(request)) {
        return Response.json({ ok: true });
      }

      const userId = extractUserId(request);
      const workspaceId = extractWorkspaceId(request);
      await handleQuestionResponse(userId, workspaceId, questionId, "ignore");
      return Response.json({ ok: true });
    },
  );
