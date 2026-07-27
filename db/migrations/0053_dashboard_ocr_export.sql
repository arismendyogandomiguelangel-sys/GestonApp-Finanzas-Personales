-- Migration 0053: Dashboard Templates, OCR Vouchers and Export History

CREATE TABLE IF NOT EXISTS dashboard_templates (
  id text PRIMARY KEY DEFAULT ('tmpl_' || md5(random()::text || clock_timestamp()::text)),
  workspace_id text NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name text NOT NULL,
  tag text NOT NULL DEFAULT 'Personal', -- DGII, Banco, Financiera, Personal, Custom
  widgets_json jsonb DEFAULT '[]'::jsonb,
  is_default boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp()
);

ALTER TABLE dashboard_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY dashboard_templates_workspace_policy ON dashboard_templates
  USING (workspace_id = current_setting('app.current_workspace_id', true));

CREATE TABLE IF NOT EXISTS vouchers_ocr (
  id text PRIMARY KEY DEFAULT ('vouch_' || md5(random()::text || clock_timestamp()::text)),
  workspace_id text NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  image_url text,
  rnc_issuer text,
  issuer_name text,
  ncf text,
  total_amount numeric(14,2) NOT NULL,
  itbis_amount numeric(14,2) DEFAULT 0.00,
  voucher_date date NOT NULL,
  category text DEFAULT 'General',
  status text NOT NULL DEFAULT 'extracted', -- extracted, verified, exported
  created_at timestamptz NOT NULL DEFAULT clock_timestamp()
);

ALTER TABLE vouchers_ocr ENABLE ROW LEVEL SECURITY;

CREATE POLICY vouchers_ocr_workspace_policy ON vouchers_ocr
  USING (workspace_id = current_setting('app.current_workspace_id', true));

CREATE TABLE IF NOT EXISTS export_history (
  id text PRIMARY KEY DEFAULT ('exp_' || md5(random()::text || clock_timestamp()::text)),
  workspace_id text NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  file_type text NOT NULL, -- 606_txt, 607_txt, 608_txt, pdf_report, excel_xlsx, csv
  period text NOT NULL,
  record_count integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT clock_timestamp()
);

ALTER TABLE export_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY export_history_workspace_policy ON export_history
  USING (workspace_id = current_setting('app.current_workspace_id', true));
