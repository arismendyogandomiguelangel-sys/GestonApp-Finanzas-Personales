import { z } from "zod";

import { DATE_FORMATS, NUMBER_FORMATS, SUPPORTED_LOCALES, type DateFormat, type NumberFormat, type SupportedLocale } from "@/lib/locale";
import { INVALID_TIMEZONE_MESSAGE, parseTimezone } from "@/lib/timezone";
import { createBadRequestError } from "@/server/api/errors";
import { integerRangeSchema, parseWithSchema } from "@/server/api/validation";

type ParsedUserSettingsBody = Readonly<{
  locale?: SupportedLocale;
  numberFormat?: NumberFormat;
  dateFormat?: DateFormat;
  hasLocale: boolean;
  hasNumberFormat: boolean;
  hasDateFormat: boolean;
}>;

const ECONOMIC_ACTIVITIES = [
  "employee", "student", "entrepreneur", "freelancer",
  "online_seller", "independent_pro", "dependent",
] as const;
const LIFE_SITUATIONS = [
  "single", "family", "parent", "single_parent",
  "couple_no_kids", "renting", "mortgage", "financed_car",
] as const;
const ASSISTANCE_MODES = ["objective", "eventual"] as const;
const AGENT_GENDERS = ["masculine", "feminine", "neutral"] as const;
const ONBOARDING_ROUTES = ["quick", "guided"] as const;

type ParsedWorkspaceSettingsBody = Readonly<{
  reportingCurrency?: string;
  filteredCategories?: ReadonlyArray<string> | null;
  firstDayOfWeek?: number;
  timezone?: string;
  economicActivities?: ReadonlyArray<string>;
  lifeSituation?: ReadonlyArray<string>;
  assistanceMode?: string;
  agentName?: string;
  agentGender?: string;
  agentProvider?: string;
  agentShowPrefix?: boolean;
  aiModuleEnabled?: boolean;
  voiceEnabled?: boolean;
  onboardingCompleted?: boolean;
  onboardingRoute?: string;
  hasReportingCurrency: boolean;
  hasFilteredCategories: boolean;
  hasFirstDayOfWeek: boolean;
  hasTimezone: boolean;
  hasEconomicActivities: boolean;
  hasLifeSituation: boolean;
  hasAssistanceMode: boolean;
  hasAgentName: boolean;
  hasAgentGender: boolean;
  hasAgentProvider: boolean;
  hasAgentShowPrefix: boolean;
  hasAiModuleEnabled: boolean;
  hasVoiceEnabled: boolean;
  hasOnboardingCompleted: boolean;
  hasOnboardingRoute: boolean;
}>;

type ParsedCreateWorkspaceBody = Readonly<{
  name: string;
  timezone: string;
}>;

const localeSchema = z.unknown().superRefine((value, ctx) => {
  if (typeof value !== "string" || !(SUPPORTED_LOCALES as ReadonlyArray<string>).includes(value)) {
    ctx.addIssue({ code: "custom", message: `Invalid locale. Expected one of: ${SUPPORTED_LOCALES.join(", ")}` });
  }
}).transform((value): SupportedLocale => value as SupportedLocale);

const numberFormatSchema = z.unknown().superRefine((value, ctx) => {
  if (typeof value !== "string" || !(NUMBER_FORMATS as ReadonlyArray<string>).includes(value)) {
    ctx.addIssue({ code: "custom", message: `Invalid numberFormat. Expected one of: ${NUMBER_FORMATS.join(", ")}` });
  }
}).transform((value): NumberFormat => value as NumberFormat);

const dateFormatSchema = z.unknown().superRefine((value, ctx) => {
  if (typeof value !== "string" || !(DATE_FORMATS as ReadonlyArray<string>).includes(value)) {
    ctx.addIssue({ code: "custom", message: `Invalid dateFormat. Expected one of: ${DATE_FORMATS.join(", ")}` });
  }
}).transform((value): DateFormat => value as DateFormat);

const reportingCurrencySchema = z.unknown().superRefine((value, ctx) => {
  if (typeof value !== "string" || !/^[A-Z]{3}$/.test(value)) {
    ctx.addIssue({ code: "custom", message: "Invalid reportingCurrency. Expected 3-letter ISO 4217 code" });
  }
}).transform((value): string => value as string);

const filteredCategoriesSchema = z.unknown().superRefine((value, ctx) => {
  if (value === null) {
    return;
  }
  if (!Array.isArray(value) || !value.every((entry: unknown): boolean => typeof entry === "string")) {
    ctx.addIssue({ code: "custom", message: "Invalid filteredCategories. Expected array of strings or null" });
  }
}).transform((value): ReadonlyArray<string> | null => value as ReadonlyArray<string> | null);

const timezoneSchema = z.unknown().superRefine((value, ctx) => {
  if (typeof value !== "string" || parseTimezone(value) === null) {
    ctx.addIssue({ code: "custom", message: INVALID_TIMEZONE_MESSAGE });
  }
}).transform((value): string => parseTimezone(value as string) as string);

const stringArrayEnumSchema = (allowed: ReadonlyArray<string>, label: string) =>
  z.unknown().superRefine((value, ctx) => {
    if (
      !Array.isArray(value)
      || value.length === 0
      || !value.every((entry: unknown): boolean => typeof entry === "string" && (allowed as ReadonlyArray<string>).includes(entry))
    ) {
      ctx.addIssue({ code: "custom", message: `Invalid ${label}. Expected non-empty array of: ${allowed.join(", ")}` });
    }
  }).transform((value): ReadonlyArray<string> => value as ReadonlyArray<string>);

const enumSchema = (allowed: ReadonlyArray<string>, label: string) =>
  z.unknown().superRefine((value, ctx) => {
    if (typeof value !== "string" || !(allowed as ReadonlyArray<string>).includes(value)) {
      ctx.addIssue({ code: "custom", message: `Invalid ${label}. Expected one of: ${allowed.join(", ")}` });
    }
  }).transform((value): string => value as string);

const agentNameSchema = z.unknown().superRefine((value, ctx) => {
  if (typeof value !== "string" || value.trim().length === 0 || value.trim().length > 40) {
    ctx.addIssue({ code: "custom", message: "Invalid agentName. Expected 1-40 characters" });
  }
}).transform((value): string => (value as string).trim());

const workspaceNameSchema = z.unknown().superRefine((value, ctx) => {
  if (typeof value !== "string" || value.trim().length === 0) {
    ctx.addIssue({ code: "custom", message: "name is required and must be a non-empty string" });
    return;
  }
  if (value.trim().length > 100) {
    ctx.addIssue({ code: "custom", message: "name must be 100 characters or fewer" });
  }
}).transform((value): string => (value as string).trim());

/**
 * Validate the PUT /api/user-settings request body.
 */
export const parseUserSettingsBody = (input: unknown): ParsedUserSettingsBody => {
  const parsed = parseWithSchema(input, z.object({
    locale: localeSchema.optional(),
    numberFormat: numberFormatSchema.optional(),
    dateFormat: dateFormatSchema.optional(),
  }));

  const hasLocale = parsed.locale !== undefined;
  const hasNumberFormat = parsed.numberFormat !== undefined;
  const hasDateFormat = parsed.dateFormat !== undefined;

  if (!hasLocale && !hasNumberFormat && !hasDateFormat) {
    throw createBadRequestError("No fields to update");
  }

  return {
    locale: parsed.locale,
    numberFormat: parsed.numberFormat,
    dateFormat: parsed.dateFormat,
    hasLocale,
    hasNumberFormat,
    hasDateFormat,
  };
};

/**
 * Validate the PUT /api/workspace-settings request body.
 */
export const parseWorkspaceSettingsBody = (input: unknown): ParsedWorkspaceSettingsBody => {
  const parsed = parseWithSchema(input, z.object({
    reportingCurrency: reportingCurrencySchema.optional(),
    filteredCategories: filteredCategoriesSchema.optional(),
    firstDayOfWeek: integerRangeSchema("firstDayOfWeek", 1, 7).optional(),
    timezone: timezoneSchema.optional(),
    economicActivities: stringArrayEnumSchema(ECONOMIC_ACTIVITIES, "economicActivities").optional(),
    lifeSituation: stringArrayEnumSchema(LIFE_SITUATIONS, "lifeSituation").optional(),
    assistanceMode: enumSchema(ASSISTANCE_MODES, "assistanceMode").optional(),
    agentName: agentNameSchema.optional(),
    agentGender: enumSchema(AGENT_GENDERS, "agentGender").optional(),
    agentProvider: z.string().min(1).max(40).optional(),
    agentShowPrefix: z.boolean().optional(),
    aiModuleEnabled: z.boolean().optional(),
    voiceEnabled: z.boolean().optional(),
    onboardingCompleted: z.boolean().optional(),
    onboardingRoute: enumSchema(ONBOARDING_ROUTES, "onboardingRoute").optional(),
  }));

  const hasReportingCurrency = parsed.reportingCurrency !== undefined;
  const hasFilteredCategories = parsed.filteredCategories !== undefined;
  const hasFirstDayOfWeek = parsed.firstDayOfWeek !== undefined;
  const hasTimezone = parsed.timezone !== undefined;
  const hasEconomicActivities = parsed.economicActivities !== undefined;
  const hasLifeSituation = parsed.lifeSituation !== undefined;
  const hasAssistanceMode = parsed.assistanceMode !== undefined;
  const hasAgentName = parsed.agentName !== undefined;
  const hasAgentGender = parsed.agentGender !== undefined;
  const hasAgentProvider = parsed.agentProvider !== undefined;
  const hasAgentShowPrefix = parsed.agentShowPrefix !== undefined;
  const hasAiModuleEnabled = parsed.aiModuleEnabled !== undefined;
  const hasVoiceEnabled = parsed.voiceEnabled !== undefined;
  const hasOnboardingCompleted = parsed.onboardingCompleted !== undefined;
  const hasOnboardingRoute = parsed.onboardingRoute !== undefined;

  if (
    !hasReportingCurrency && !hasFilteredCategories && !hasFirstDayOfWeek && !hasTimezone
    && !hasEconomicActivities && !hasLifeSituation && !hasAssistanceMode
    && !hasAgentName && !hasAgentGender && !hasAgentProvider && !hasAgentShowPrefix
    && !hasAiModuleEnabled && !hasVoiceEnabled && !hasOnboardingCompleted && !hasOnboardingRoute
  ) {
    throw createBadRequestError("No fields to update");
  }

  return {
    reportingCurrency: parsed.reportingCurrency,
    filteredCategories: parsed.filteredCategories,
    firstDayOfWeek: parsed.firstDayOfWeek,
    timezone: parsed.timezone,
    economicActivities: parsed.economicActivities,
    lifeSituation: parsed.lifeSituation,
    assistanceMode: parsed.assistanceMode,
    agentName: parsed.agentName,
    agentGender: parsed.agentGender,
    agentProvider: parsed.agentProvider,
    agentShowPrefix: parsed.agentShowPrefix,
    aiModuleEnabled: parsed.aiModuleEnabled,
    voiceEnabled: parsed.voiceEnabled,
    onboardingCompleted: parsed.onboardingCompleted,
    onboardingRoute: parsed.onboardingRoute,
    hasReportingCurrency,
    hasFilteredCategories,
    hasFirstDayOfWeek,
    hasTimezone,
    hasEconomicActivities,
    hasLifeSituation,
    hasAssistanceMode,
    hasAgentName,
    hasAgentGender,
    hasAgentProvider,
    hasAgentShowPrefix,
    hasAiModuleEnabled,
    hasVoiceEnabled,
    hasOnboardingCompleted,
    hasOnboardingRoute,
  };
};

export const parseCreateWorkspaceBody = (input: unknown): ParsedCreateWorkspaceBody =>
  parseWithSchema(input, z.object({
    name: workspaceNameSchema,
    timezone: timezoneSchema,
  }));
