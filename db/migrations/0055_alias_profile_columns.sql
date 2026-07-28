-- Migration 0055: ALIAS profile columns on workspace_settings.
--
-- Plan maestro v4 section 13 (Migración 1) specified these columns but they
-- were never applied -- profileContext.tsx has been persisting to
-- localStorage only. Adds server-side storage for the flexible profile
-- (economic activities, life situation), ALIAS identity (name, gender,
-- prefix), assistance mode, AI module toggle, and onboarding state.
--
-- No RLS/grant changes needed: workspace_settings already has RLS and the
-- app role already has UPDATE on the table (0002_direct_access.sql), which
-- covers new columns.

ALTER TABLE workspace_settings
  ADD COLUMN economic_activities JSONB NOT NULL DEFAULT '["employee"]'::jsonb,
  ADD COLUMN life_situation JSONB NOT NULL DEFAULT '["single"]'::jsonb,
  ADD COLUMN assistance_mode TEXT NOT NULL DEFAULT 'objective'
    CHECK (assistance_mode IN ('objective', 'eventual')),
  ADD COLUMN agent_name TEXT NOT NULL DEFAULT 'Axel',
  ADD COLUMN agent_gender TEXT NOT NULL DEFAULT 'masculine'
    CHECK (agent_gender IN ('masculine', 'feminine', 'neutral')),
  ADD COLUMN agent_provider TEXT NOT NULL DEFAULT 'openai',
  ADD COLUMN agent_show_prefix BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN ai_module_enabled BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN voice_enabled BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN onboarding_completed BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN onboarding_route TEXT;
