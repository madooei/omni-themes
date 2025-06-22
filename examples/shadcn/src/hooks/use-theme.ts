import { useEffect, useState } from "react";
import { $theme, $resolvedTheme, setTheme } from "@/stores/theme-store";

/**
 * React hook for theme management using omni-themes
 * Maintains the same API as the original useTheme hook for compatibility
 */
export const useTheme = () => {
  const [theme, setThemeState] = useState($theme.get());
  const [resolvedTheme, setResolvedThemeState] = useState<"light" | "dark">(() => {
    const resolved = $resolvedTheme.get();
    // Ensure resolved theme is always 'light' or 'dark' for compatibility
    return resolved === 'light' || resolved === 'dark' ? resolved : 'light';
  });

  useEffect(() => {
    // Subscribe to theme changes from omni-themes
    const unsubscribeTheme = $theme.listen(setThemeState);
    const unsubscribeResolvedTheme = $resolvedTheme.listen((resolvedValue) => {
      // Ensure resolved theme is always 'light' or 'dark' for compatibility
      setResolvedThemeState(resolvedValue === 'light' || resolvedValue === 'dark' ? resolvedValue : 'light');
    });

    return () => {
      unsubscribeTheme();
      unsubscribeResolvedTheme();
    };
  }, []);

  return {
    theme, // The preference ('light', 'dark', 'system')
    resolvedTheme, // The actual theme to apply ('light' or 'dark')
    setTheme, // The function to change the theme preference
  };
};
