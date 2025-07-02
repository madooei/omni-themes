import { createThemeStore } from "@madooei/omni-themes";

// Create a theme store with multiple themes for vanilla JS demo
export const {
  themes,
  $theme,
  $resolvedTheme,
  $systemTheme,
  setTheme,
  applyThemeScriptString
} = createThemeStore({
  themes: ["light", "dark", "blue", "green", "purple", "ocean"],
  defaultTheme: "light",
  defaultLightTheme: "light",
  defaultDarkTheme: "dark",
  themesMap: {
    light: ["light", "blue", "green", "purple", "ocean"],
    dark: ["dark"],
  },
  themeStorageKey: "omni-theme-vanilla-demo",
  enableSystem: true,
  enableColorScheme: true,
  updateClassAttribute: true,
  dataAttributes: ["data-theme"],
  forcedThemeFlagAttribute: "data-theme-forced",
  debug: false,
});

// Export types for TypeScript usage
export type { ThemeName } from "@madooei/omni-themes";