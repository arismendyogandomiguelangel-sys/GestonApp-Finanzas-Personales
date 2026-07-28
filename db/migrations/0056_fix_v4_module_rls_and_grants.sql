-- Fix the v4 module tables (0051-0054) so the app role can actually reach them.
--
-- Two defects made every v4 module return nothing and reject writes:
--
--   1. Their RLS policies read current_setting('app.current_workspace_id'),
--      but contextRunner.ts sets 'app.workspace_id'. The unset variable
--      resolves to NULL, so `workspace_id = NULL` filtered out every row.
--   2. No GRANTs were issued to the app role, so reaching those tables failed
--      with "permission denied" before RLS was even consulted.
--
-- Policies are also given an explicit WITH CHECK so inserts and updates cannot
-- write rows into another workspace.

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE
  agent_learning_queue,
  agent_behavior_rules,
  savings_goals,
  financial_events,
  recurring_expenses,
  dashboard_templates,
  vouchers_ocr,
  export_history,
  rnc_profiles,
  isr_deductibles,
  clients_directory
  TO app;

DO $$
DECLARE
  v_table TEXT;
  v_policy TEXT;
BEGIN
  FOREACH v_table IN ARRAY ARRAY[
    'agent_learning_queue',
    'agent_behavior_rules',
    'savings_goals',
    'financial_events',
    'recurring_expenses',
    'dashboard_templates',
    'vouchers_ocr',
    'export_history',
    'rnc_profiles',
    'isr_deductibles',
    'clients_directory'
  ]
  LOOP
    v_policy := v_table || '_workspace_policy';
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I', v_policy, v_table);
    EXECUTE format(
      'CREATE POLICY %I ON %I FOR ALL '
      'USING (workspace_id = current_setting(''app.workspace_id'', true)) '
      'WITH CHECK (workspace_id = current_setting(''app.workspace_id'', true))',
      v_policy, v_table
    );
  END LOOP;
END
$$;
