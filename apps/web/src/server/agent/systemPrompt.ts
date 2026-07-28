import { queryAs } from "@/server/db";
import { log } from "@/server/logger";

type AgentGender = "masculine" | "feminine" | "neutral";
type AssistanceMode = "objective" | "eventual";

export type AgentProfile = Readonly<{
  agentName: string;
  agentGender: AgentGender;
  agentShowPrefix: boolean;
  assistanceMode: AssistanceMode;
}>;

const DEFAULT_AGENT_PROFILE: AgentProfile = {
  agentName: "Axel",
  agentGender: "masculine",
  agentShowPrefix: true,
  assistanceMode: "objective",
};

const GENDER_INSTRUCTIONS: Record<AgentGender, string> = {
  masculine: "Habla de ti mismo con concordancia gramatical masculina en español (ej: \"listo\", \"he registrado tu gasto\").",
  feminine: "Habla de ti misma con concordancia gramatical femenina en español (ej: \"lista\", \"he registrado tu gasto\").",
  neutral: "Usa lenguaje neutro en español, sin marcar género gramatical (ej: \"registrado tu gasto\" en vez de \"listo\"/\"lista\").",
};

const ASSISTANCE_MODE_INSTRUCTIONS: Record<AssistanceMode, string> = {
  objective: "El usuario está en modo \"Orientado a Objetivos\": cuando una transacción pueda afectar una meta de ahorro activa, coméntalo proactivamente y ofrece ajustar la planificación.",
  eventual: "El usuario está en modo \"Asistencia Eventual\": registra y organiza en silencio, sin preguntas proactivas sobre metas u objetivos salvo que el usuario pregunte primero.",
};

/** Reads the ALIAS identity/behavior settings for a workspace, defaulting on any failure. */
export const getAgentProfile = async (userId: string, workspaceId: string): Promise<AgentProfile> => {
  try {
    const result = await queryAs(
      userId, workspaceId,
      `SELECT agent_name, agent_gender, agent_show_prefix, assistance_mode
       FROM workspace_settings WHERE workspace_id = $1`,
      [workspaceId],
    );
    if (result.rows.length === 0) return DEFAULT_AGENT_PROFILE;
    const row = result.rows[0] as {
      agent_name: string;
      agent_gender: AgentGender;
      agent_show_prefix: boolean;
      assistance_mode: AssistanceMode;
    };
    return {
      agentName: row.agent_name,
      agentGender: row.agent_gender,
      agentShowPrefix: row.agent_show_prefix,
      assistanceMode: row.assistance_mode,
    };
  } catch (err) {
    log({
      domain: "api",
      action: "error",
      route: "/server/agent/systemPrompt",
      method: "internal",
      error: `getAgentProfile failed, using defaults: ${err instanceof Error ? err.message : String(err)}`,
    });
    return DEFAULT_AGENT_PROFILE;
  }
};

/** Builds the system instructions injected into every chat model call for this workspace. */
export const buildSystemPrompt = (profile: AgentProfile): string => {
  const displayName = profile.agentShowPrefix ? `ALIAS ${profile.agentName}` : profile.agentName;
  return [
    `Eres ${displayName}, el asistente financiero personal del usuario dentro de la aplicación GestionIHA-Finanzas.`,
    GENDER_INSTRUCTIONS[profile.agentGender],
    ASSISTANCE_MODE_INSTRUCTIONS[profile.assistanceMode],
    "Responde siempre en español salvo que el usuario escriba en otro idioma.",
  ].join(" ");
};
