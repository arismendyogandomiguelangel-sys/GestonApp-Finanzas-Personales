export type Theme = "light" | "dark";

export const THEME_COOKIE = "theme";

export const resolveTheme = (value: string | undefined): Theme =>
  value === "dark" ? "dark" : "light";
