-- Migration 0051: ALIAS Agent Engine tables (learning queue and behavior rules)

CREATE TABLE IF NOT EXISTS agent_learning_queue (
  id text PRIMARY KEY DEFAULT ('learn_' || md5(random()::text || clock_timestamp()::text)),
  workspace_id text NOT NULL REFERENCES workspaces(workspace_id) ON DELETE CASCADE,
  question text NOT NULL,
  context_data jsonb DEFAULT '{}'::jsonb,
  priority integer DEFAULT 1,
  status text NOT NULL DEFAULT 'pending', -- pending, answered, ignored, expired
  ignored_count integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp()
);

ALTER TABLE agent_learning_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY agent_learning_queue_workspace_policy ON agent_learning_queue
  USING (workspace_id = current_setting('app.current_workspace_id', true));

CREATE TABLE IF NOT EXISTS agent_behavior_rules (
  id text PRIMARY KEY DEFAULT ('rule_' || md5(random()::text || clock_timestamp()::text)),
  workspace_id text NOT NULL REFERENCES workspaces(workspace_id) ON DELETE CASCADE,
  rule_type text NOT NULL, -- sunday_planning, silent_register, pre_billing, goal_alert
  enabled boolean NOT NULL DEFAULT true,
  config jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (workspace_id, rule_type)
);

ALTER TABLE agent_behavior_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY agent_behavior_rules_workspace_policy ON agent_behavior_rules
  USING (workspace_id = current_setting('app.current_workspace_id', true));
