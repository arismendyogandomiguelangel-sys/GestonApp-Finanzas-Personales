-- Migration 0052: Financial Planning tables (Savings Goals, Events, Recurring Expenses)

CREATE TABLE IF NOT EXISTS savings_goals (
  id text PRIMARY KEY DEFAULT ('goal_' || md5(random()::text || clock_timestamp()::text)),
  workspace_id text NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name text NOT NULL,
  target_amount numeric(14,2) NOT NULL,
  current_amount numeric(14,2) NOT NULL DEFAULT 0.00,
  target_date date,
  category text DEFAULT 'General',
  status text NOT NULL DEFAULT 'active', -- active, achieved, paused
  created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp()
);

ALTER TABLE savings_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY savings_goals_workspace_policy ON savings_goals
  USING (workspace_id = current_setting('app.current_workspace_id', true));

CREATE TABLE IF NOT EXISTS financial_events (
  id text PRIMARY KEY DEFAULT ('event_' || md5(random()::text || clock_timestamp()::text)),
  workspace_id text NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name text NOT NULL,
  event_type text NOT NULL, -- wedding, travel, car, housing, pregnancy, custom
  estimated_budget numeric(14,2) NOT NULL,
  items_json jsonb DEFAULT '[]'::jsonb,
  target_date date,
  created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp()
);

ALTER TABLE financial_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY financial_events_workspace_policy ON financial_events
  USING (workspace_id = current_setting('app.current_workspace_id', true));

CREATE TABLE IF NOT EXISTS recurring_expenses (
  id text PRIMARY KEY DEFAULT ('rec_' || md5(random()::text || clock_timestamp()::text)),
  workspace_id text NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name text NOT NULL,
  amount numeric(14,2) NOT NULL,
  frequency text NOT NULL DEFAULT 'monthly', -- monthly, biweekly, weekly, annual
  due_day integer, -- day of month (1-31)
  is_variable boolean NOT NULL DEFAULT false,
  category text DEFAULT 'Fixed',
  created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp()
);

ALTER TABLE recurring_expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY recurring_expenses_workspace_policy ON recurring_expenses
  USING (workspace_id = current_setting('app.current_workspace_id', true));
