import { createThemeStore } from '@madooei/omni-themes';
import type { ThemeName } from '@madooei/omni-themes';

// Create the theme store with React demo configuration
export const {
  themes,
  $theme,
  $resolvedTheme,
  $systemTheme,
  setTheme,
  applyThemeScriptString,
  createForcedThemeScriptString
} = createThemeStore({
  themes: ['system', 'light', 'dark', 'blue', 'green', 'purple', 'ocean'],
  enableSystem: true,
  enableColorScheme: true,
  dataAttributes: ['data-theme'],
  debug: false
});

export type { ThemeName };