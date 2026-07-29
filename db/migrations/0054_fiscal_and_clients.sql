-- Migration 0054: Fiscal Profiles (RNC, ISR) and Clients Directory

CREATE TABLE IF NOT EXISTS rnc_profiles (
  id text PRIMARY KEY DEFAULT ('rnc_' || md5(random()::text || clock_timestamp()::text)),
  workspace_id text NOT NULL REFERENCES workspaces(workspace_id) ON DELETE CASCADE,
  rnc_number text NOT NULL,
  business_name text NOT NULL,
  trade_name text,
  taxpayer_type text DEFAULT 'Persona Jurídica', -- Persona Jurídica, Persona Física
  status text NOT NULL DEFAULT 'activo',
  created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp()
);

ALTER TABLE rnc_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY rnc_profiles_workspace_policy ON rnc_profiles
  USING (workspace_id = current_setting('app.current_workspace_id', true));

CREATE TABLE IF NOT EXISTS isr_deductibles (
  id text PRIMARY KEY DEFAULT ('ded_' || md5(random()::text || clock_timestamp()::text)),
  workspace_id text NOT NULL REFERENCES workspaces(workspace_id) ON DELETE CASCADE,
  category_name text NOT NULL,
  deductible_percentage numeric(5,2) NOT NULL DEFAULT 100.00,
  description text,
  created_at timestamptz NOT NULL DEFAULT clock_timestamp()
);

ALTER TABLE isr_deductibles ENABLE ROW LEVEL SECURITY;

CREATE POLICY isr_deductibles_workspace_policy ON isr_deductibles
  USING (workspace_id = current_setting('app.current_workspace_id', true));

CREATE TABLE IF NOT EXISTS clients_directory (
  id text PRIMARY KEY DEFAULT ('cli_' || md5(random()::text || clock_timestamp()::text)),
  workspace_id text NOT NULL REFERENCES workspaces(workspace_id) ON DELETE CASCADE,
  name text NOT NULL,
  rnc_cedula text,
  phone text,
  email text,
  client_type text DEFAULT 'cliente', -- cliente, suplidor, ambos
  total_billed numeric(14,2) DEFAULT 0.00,
  created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp()
);

ALTER TABLE clients_directory ENABLE ROW LEVEL SECURITY;

CREATE POLICY clients_directory_workspace_policy ON clients_directory
  USING (workspace_id = current_setting('app.current_workspace_id', true));
