import { z } from "zod";

import { isDemoModeFromRequest } from "@/lib/demoMode";
import { handleRoute } from "@/server/api/handleRoute";
import { parseWorkspaceSettingsBody } from "@/server/api/settings";
import { parseJsonBody } from "@/server/api/validation";
import { queryAs } from "@/server/db";
import { getFilteredCategories, updateFilteredCategories } from "@/server/filteredCategories";
import { getAvailableCurrencies } from "@/server/getAvailableCurrencies";
import { getReportCurrency } from "@/server/reportCurrency";
import { updateReportCurrency } from "@/server/updateReportCurrency";
import { extractUserId, extractWorkspaceId } from "@/server/userId";

type WorkspaceExtras = Readonly<{
  firstDayOfWeek: number;
  timezone: string;
  economicActivities: ReadonlyArray<string>;
  lifeSituation: ReadonlyArray<string>;
  assistanceMode: string;
  agentName: string;
  agentGender: string;
  agentProvider: string;
  agentShowPrefix: boolean;
  aiModuleEnabled: boolean;
  voiceEnabled: boolean;
  onboardingCompleted: boolean;
  onboardingRoute: string | null;
}>;

const DEFAULT_WORKSPACE_EXTRAS: WorkspaceExtras = {
  firstDayOfWeek: 1,
  timezone: "UTC",
  economicActivities: ["employee"],
  lifeSituation: ["single"],
  assistanceMode: "objective",
  agentName: "Axel",
  agentGender: "masculine",
  agentProvider: "openai",
  agentShowPrefix: true,
  aiModuleEnabled: true,
  voiceEnabled: false,
  onboardingCompleted: false,
  onboardingRoute: null,
};

const getWorkspaceExtras = async (userId: string, workspaceId: string): Promise<WorkspaceExtras> => {
  const result = await queryAs(
    userId, workspaceId,
    `SELECT first_day_of_week, timezone, economic_activities, life_situation, assistance_mode,
            agent_name, agent_gender, agent_provider, agent_show_prefix, ai_module_enabled,
            voice_enabled, onboarding_completed, onboarding_route
     FROM workspace_settings WHERE workspace_id = $1`,
    [workspaceId],
  );
  if (result.rows.length === 0) {
    return DEFAULT_WORKSPACE_EXTRAS;
  }
  const row = result.rows[0] as {
    first_day_of_week: number;
    timezone: string;
    economic_activities: ReadonlyArray<string>;
    life_situation: ReadonlyArray<string>;
    assistance_mode: string;
    agent_name: string;
    agent_gender: string;
    agent_provider: string;
    agent_show_prefix: boolean;
    ai_module_enabled: boolean;
    voice_enabled: boolean;
    onboarding_completed: boolean;
    onboarding_route: string | null;
  };
  return {
    firstDayOfWeek: row.first_day_of_week,
    timezone: row.timezone,
    economicActivities: row.economic_activities,
    lifeSituation: row.life_situation,
    assistanceMode: row.assistance_mode,
    agentName: row.agent_name,
    agentGender: row.agent_gender,
    agentProvider: row.agent_provider,
    agentShowPrefix: row.agent_show_prefix,
    aiModuleEnabled: row.ai_module_enabled,
    voiceEnabled: row.voice_enabled,
    onboardingCompleted: row.onboarding_completed,
    onboardingRoute: row.onboarding_route,
  };
};

export const GET = async (request: Request): Promise<Response> =>
  handleRoute(
    { route: "/api/workspace-settings", method: "GET", internalErrorMessage: "Database query failed" },
    async (): Promise<Response> => {
      if (isDemoModeFromRequest(request)) {
        return Response.json({
          reportingCurrency: "USD",
          availableCurrencies: ["EUR", "GBP", "USD"],
          filteredCategories: null,
          ...DEFAULT_WORKSPACE_EXTRAS,
        });
      }

      const userId = extractUserId(request);
      const workspaceId = extractWorkspaceId(request);
      const [reportingCurrency, availableCurrencies, filteredCategories, extras] = await Promise.all([
        getReportCurrency(userId, workspaceId),
        getAvailableCurrencies(),
        getFilteredCategories(userId, workspaceId),
        getWorkspaceExtras(userId, workspaceId),
      ]);
      return Response.json({ reportingCurrency, availableCurrencies, filteredCategories, ...extras });
    },
  );

const EXTRAS_FIELD_MAP = {
  firstDayOfWeek: { column: "first_day_of_week", hasKey: "hasFirstDayOfWeek", jsonb: false },
  timezone: { column: "timezone", hasKey: "hasTimezone", jsonb: false },
  economicActivities: { column: "economic_activities", hasKey: "hasEconomicActivities", jsonb: true },
  lifeSituation: { column: "life_situation", hasKey: "hasLifeSituation", jsonb: true },
  assistanceMode: { column: "assistance_mode", hasKey: "hasAssistanceMode", jsonb: false },
  agentName: { column: "agent_name", hasKey: "hasAgentName", jsonb: false },
  agentGender: { column: "agent_gender", hasKey: "hasAgentGender", jsonb: false },
  agentProvider: { column: "agent_provider", hasKey: "hasAgentProvider", jsonb: false },
  agentShowPrefix: { column: "agent_show_prefix", hasKey: "hasAgentShowPrefix", jsonb: false },
  aiModuleEnabled: { column: "ai_module_enabled", hasKey: "hasAiModuleEnabled", jsonb: false },
  voiceEnabled: { column: "voice_enabled", hasKey: "hasVoiceEnabled", jsonb: false },
  onboardingCompleted: { column: "onboarding_completed", hasKey: "hasOnboardingCompleted", jsonb: false },
  onboardingRoute: { column: "onboarding_route", hasKey: "hasOnboardingRoute", jsonb: false },
} as const;

type ExtrasFieldKey = keyof typeof EXTRAS_FIELD_MAP;

export const PUT = async (request: Request): Promise<Response> =>
  handleRoute(
    { route: "/api/workspace-settings", method: "PUT", internalErrorMessage: "Database update failed" },
    async (): Promise<Response> => {
      const body = parseWorkspaceSettingsBody(await parseJsonBody(request, z.unknown())) as Record<string, unknown>;
      const extrasKeys = Object.keys(EXTRAS_FIELD_MAP) as ReadonlyArray<ExtrasFieldKey>;
      const presentKeys = extrasKeys.filter((key) => body[EXTRAS_FIELD_MAP[key].hasKey] === true);

      if (isDemoModeFromRequest(request)) {
        const result: Record<string, unknown> = {};
        if (body.hasReportingCurrency) result.reportingCurrency = body.reportingCurrency;
        if (body.hasFilteredCategories) result.filteredCategories = body.filteredCategories;
        for (const key of presentKeys) result[key] = body[key];
        return Response.json(result);
      }

      const userId = extractUserId(request);
      const workspaceId = extractWorkspaceId(request);
      const result: Record<string, unknown> = {};

      if (body.hasReportingCurrency) {
        result.reportingCurrency = await updateReportCurrency(userId, workspaceId, body.reportingCurrency as string);
      }

      if (body.hasFilteredCategories) {
        result.filteredCategories = await updateFilteredCategories(
          userId,
          workspaceId,
          body.filteredCategories as ReadonlyArray<string> | null,
        );
      }

      if (presentKeys.length > 0) {
        const setClauses: Array<string> = [];
        const params: Array<unknown> = [workspaceId];
        let idx = 2;
        for (const key of presentKeys) {
          const { column, jsonb } = EXTRAS_FIELD_MAP[key];
          setClauses.push(`${column} = $${idx}`);
          params.push(jsonb ? JSON.stringify(body[key]) : body[key]);
          idx++;
        }
        const returningColumns = extrasKeys.map((key) => EXTRAS_FIELD_MAP[key].column).join(", ");
        const updated = await queryAs(
          userId, workspaceId,
          `UPDATE workspace_settings SET ${setClauses.join(", ")} WHERE workspace_id = $1 RETURNING ${returningColumns}`,
          params,
        );
        if (updated.rows.length > 0) {
          const row = updated.rows[0] as Record<string, unknown>;
          for (const key of extrasKeys) {
            result[key] = row[EXTRAS_FIELD_MAP[key].column];
          }
        }
      }

      return Response.json(result);
    },
  );
