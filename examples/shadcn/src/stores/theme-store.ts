import { createThemeStore } from '@madooei/omni-themes';

// Create theme store using omni-themes with only light, dark, and system themes
// to maintain the exact same UX as the original implementation
export const {
  themes,
  $theme,
  $resolvedTheme,
  $systemTheme,
  setTheme,
  applyThemeScriptString,
  createForcedThemeScriptString
} = createThemeStore({
  themes: ['light', 'dark'],
  enableSystem: true,
  enableColorScheme: true,
  updateClassAttribute: true, // This will add classes to document.documentElement
  dataAttributes: [], // Disable data attributes since shadcn uses classes
  debug: false
});
