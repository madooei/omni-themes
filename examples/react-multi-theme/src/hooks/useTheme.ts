import { useEffect, useState } from "react";
import {
  $theme,
  $resolvedTheme,
  $systemTheme,
  setTheme,
  themes,
  type ThemeName,
} from "../lib/theme-store";

/**
 * React hook for managing theme state with omni-themes
 *
 * @returns Object containing theme state and control functions
 */
export function useTheme() {
  const [theme, setThemeState] = useState<ThemeName>($theme.get());
  const [resolvedTheme, setResolvedThemeState] = useState<ThemeName>(
    $resolvedTheme.get()
  );
  const [systemTheme, setSystemThemeState] = useState<string | null>(
    $systemTheme.get() || null
  );

  useEffect(() => {
    // Subscribe to theme changes
    const unsubscribeTheme = $theme.listen(setThemeState);
    const unsubscribeResolvedTheme = $resolvedTheme.listen(
      setResolvedThemeState
    );
    const unsubscribeSystemTheme = $systemTheme.listen((value) => {
      setSystemThemeState(value || null);
    });

    return () => {
      unsubscribeTheme();
      unsubscribeResolvedTheme();
      unsubscribeSystemTheme();
    };
  }, []);

  return {
    /** Currently selected theme (may be 'system') */
    theme,
    /** Actually applied theme (never 'system') */
    resolvedTheme,
    /** System's preferred theme (light/dark) */
    systemTheme,
    /** All available themes */
    themes,
    /** Function to change the theme */
    setTheme,
  };
}
