import { createThemeStore } from "@madooei/omni-themes";

// Create theme store with basic configuration
export const {
  themes,
  $theme,
  $resolvedTheme,
  $systemTheme,
  setTheme,
  applyThemeScriptString,
} = createThemeStore({
  themes: ["light", "dark"],
  defaultTheme: "light",
  enableSystem: true,
  themeStorageKey: "fouc-demo-theme",
});
