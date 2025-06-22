import { createThemeStore } from "@madooei/omni-themes";

// Create a theme store with multiple themes
export const {
  themes,
  $theme,
  $resolvedTheme,
  $systemTheme,
  setTheme,
  applyThemeScriptString,
  createForcedThemeScriptString,
} = createThemeStore({
  themes: ["light", "dark", "blue", "green", "purple"],
  defaultTheme: "light",
  defaultLightTheme: "light",
  defaultDarkTheme: "dark",
  themesMap: {
    light: ["light", "blue", "green", "purple"],
    dark: ["dark"],
  },
  themeStorageKey: "omni-theme-astro-demo",
  enableSystem: true,
  enableColorScheme: true,
  updateClassAttribute: true,
  dataAttributes: ["data-theme"],
  forcedThemeFlagAttribute: "data-theme-forced",
  debug: false,
});