export type ModuleId =
  | "home"
  | "transactions"
  | "budget"
  | "balances"
  | "planning"
  | "vouchers"
  | "agent"
  | "dashboards"
  | "export"
  | "fiscal"
  | "clients"
  | "settings";

export interface TabItem {
  id: string;
  href: string;
  labelKey: string;
}

export interface SidebarItem {
  id: ModuleId;
  baseHref: string;
  labelKey: string;
  iconName: string;
  businessOnly?: boolean;
  tabs: TabItem[];
}

export const NAVIGATION_STRUCTURE: ReadonlyArray<SidebarItem> = [
  {
    id: "home",
    baseHref: "/",
    labelKey: "nav.home",
    iconName: "Home",
    tabs: [
      { id: "summary", href: "/", labelKey: "nav.tabs.home_summary" },
    ],
  },
  {
    id: "transactions",
    baseHref: "/transactions",
    labelKey: "nav.transactions",
    iconName: "Receipt",
    tabs: [
      { id: "tx_list", href: "/transactions", labelKey: "nav.tabs.tx_list" },
    ],
  },
  {
    id: "budget",
    baseHref: "/budget",
    labelKey: "nav.budget",
    iconName: "PieChart",
    tabs: [
      { id: "matrix", href: "/budget", labelKey: "nav.tabs.budget_matrix" },
    ],
  },
  {
    id: "balances",
    baseHref: "/balances",
    labelKey: "nav.balances",
    iconName: "Wallet",
    tabs: [
      { id: "accounts", href: "/balances", labelKey: "nav.tabs.balances_accounts" },
    ],
  },
  {
    id: "planning",
    baseHref: "/planificacion",
    labelKey: "nav.planning",
    iconName: "Target",
    tabs: [
      { id: "goals", href: "/planificacion", labelKey: "nav.tabs.plan_goals" },
      { id: "events", href: "/planificacion/eventos", labelKey: "nav.tabs.plan_events" },
      { id: "fixed", href: "/planificacion/gastos-fijos", labelKey: "nav.tabs.plan_fixed" },
      { id: "calendar", href: "/planificacion/calendario", labelKey: "nav.tabs.plan_calendar" },
    ],
  },
  {
    id: "vouchers",
    baseHref: "/vouchers",
    labelKey: "nav.vouchers",
    iconName: "Camera",
    tabs: [
      { id: "capture", href: "/vouchers", labelKey: "nav.tabs.vouchers_capture" },
      { id: "list", href: "/vouchers/lista", labelKey: "nav.tabs.vouchers_list" },
      { id: "dgii", href: "/vouchers/dgii", labelKey: "nav.tabs.vouchers_dgii" },
    ],
  },
  {
    id: "agent",
    baseHref: "/asistente",
    labelKey: "nav.agent",
    iconName: "Bot",
    tabs: [
      { id: "chat", href: "/asistente", labelKey: "nav.tabs.agent_chat" },
      { id: "memory", href: "/asistente/memoria", labelKey: "nav.tabs.agent_memory" },
      { id: "rules", href: "/asistente/reglas", labelKey: "nav.tabs.agent_rules" },
      { id: "llm", href: "/asistente/llm", labelKey: "nav.tabs.agent_llm" },
    ],
  },
  {
    id: "dashboards",
    baseHref: "/dashboards",
    labelKey: "nav.dashboards",
    iconName: "BarChart3",
    tabs: [
      { id: "interactive", href: "/dashboards", labelKey: "nav.tabs.dash_interactive" },
    ],
  },
  {
    id: "export",
    baseHref: "/exportacion",
    labelKey: "nav.export",
    iconName: "Download",
    tabs: [
      { id: "dgii", href: "/exportacion", labelKey: "nav.tabs.exp_dgii" },
    ],
  },
  {
    id: "fiscal",
    baseHref: "/fiscal",
    labelKey: "nav.fiscal",
    iconName: "Building2",
    businessOnly: true,
    tabs: [
      { id: "overview", href: "/fiscal", labelKey: "nav.tabs.fiscal_overview" },
      { id: "rnc", href: "/fiscal/rnc", labelKey: "nav.tabs.fiscal_rnc" },
      { id: "formats", href: "/fiscal/formatos", labelKey: "nav.tabs.fiscal_formats" },
      { id: "deductible", href: "/fiscal/deducibles", labelKey: "nav.tabs.fiscal_deductible" },
      { id: "calendar", href: "/fiscal/calendario", labelKey: "nav.tabs.fiscal_calendar" },
    ],
  },
  {
    id: "clients",
    baseHref: "/clientes",
    labelKey: "nav.clients",
    iconName: "Users",
    businessOnly: true,
    tabs: [
      { id: "directory", href: "/clientes", labelKey: "nav.tabs.clients_list" },
      { id: "history", href: "/clientes/historial", labelKey: "nav.tabs.clients_history" },
      { id: "frequency", href: "/clientes/frecuencia", labelKey: "nav.tabs.clients_frequency" },
    ],
  },
  {
    id: "settings",
    baseHref: "/settings",
    labelKey: "nav.settings",
    iconName: "Settings",
    tabs: [
      { id: "general", href: "/settings", labelKey: "nav.tabs.set_general" },
      { id: "agent", href: "/settings/agente", labelKey: "nav.tabs.set_agent" },
    ],
  },
];

// Compatibility mapping for existing NAV_LINKS imports
export const NAV_LINKS = NAVIGATION_STRUCTURE.map((item) => ({
  href: item.baseHref,
  labelKey: item.labelKey,
}));
