import { onMount, computed, atom } from "nanostores";
import type { ReadableAtom, WritableAtom } from "nanostores";
import type {
  SystemTheme,
  ThemeName,
  ThemeStore,
  ThemeStoreConfig,
} from "./types";
import { updateDOM, disableAnimation, getSystemTheme } from "./util";
import { createForcedThemeScriptFactory, createThemeScript } from "./script";

type SystemThemeStateValue = SystemTheme | undefined;

const isServer = typeof window === "undefined";

/**
 * Creates a theme store with the provided configuration.
 * @param config - The theme store configuration object.
 * @returns A theme store object.
 */
export function createThemeStore(config: ThemeStoreConfig): ThemeStore {
  const {
    themes,
    defaultTheme,
    defaultLightTheme,
    defaultDarkTheme,
    themesMap,
    themeStorageKey,
    darkMediaQuery,
    dataAttributes,
    enableColorScheme,
    enableSystem,
    updateClassAttribute,
    disableTransitionOnChange,
    forcedThemeFlagAttribute,
    debug,
  } = validateAndInitializeThemeStoreConfiguration(config);

  const $theme = atom<ThemeName>(
    defaultTheme ? defaultTheme : enableSystem ? "system" : themes[0],
  );

  const $systemTheme = atom<SystemThemeStateValue>(
    getSystemTheme(darkMediaQuery),
  );

  const $resolvedTheme = computed<
    ThemeName,
    [WritableAtom<ThemeName>, WritableAtom<SystemThemeStateValue>]
  >([$theme, $systemTheme], (theme, systemTheme) => {
    // Resolve the theme based on user preference and system theme
    if (theme !== "system") return theme;
    if (systemTheme === "dark") return defaultDarkTheme;
    if (systemTheme === "light") return defaultLightTheme;
    return defaultTheme;
  });

  onMount($theme, () => {
    if (debug) console.log("🚀 theme mounted:", $theme.get());

    if (isServer) return;

    // Initialize from localStorage if available
    const storedValue = localStorage.getItem(themeStorageKey);
    if (storedValue !== null) {
      $theme.set(storedValue);
    }

    // Listen for theme changes in localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === themeStorageKey) {
        if (e.newValue !== null) $theme.set(e.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      if (debug) console.log("🚀 theme unmounted");
      window.removeEventListener("storage", handleStorageChange);
    };
  });

  onMount($systemTheme, () => {
    if (debug) console.log("🚀 system theme mounted:", $systemTheme.get());

    if (isServer) return;

    // Listen for system theme changes
    const darkModeMediaQuery = window.matchMedia(darkMediaQuery);
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      $systemTheme.set(e.matches ? "dark" : "light");
    };

    darkModeMediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      if (debug) console.log("🚀 system theme unmounted");
      darkModeMediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  });

  onMount($resolvedTheme, () => {
    if (debug) console.log("🚀 resolved theme mounted:", $resolvedTheme.get());

    return () => {
      if (debug) console.log("🚀 resolved theme unmounted");
    };
  });

  // Add persistance to the theme atom
  $theme.subscribe((theme) => {
    if (isServer) return;

    // Update localStorage
    localStorage.setItem(themeStorageKey, theme);
  });

  $resolvedTheme.subscribe((resolvedTheme) => {
    if (isServer) return;

    // Disable transitions during theme change if configured
    const enableAnimations = disableTransitionOnChange
      ? disableAnimation()
      : null;

    // Update the DOM with the new theme
    updateDOM(
      resolvedTheme,
      themes,
      themesMap,
      dataAttributes,
      enableColorScheme,
      updateClassAttribute,
      forcedThemeFlagAttribute,
    );

    // Re-enable transitions if they were disabled
    enableAnimations?.();
  });

  // Create logger if debug is enabled
  if (debug) {
    $theme.listen((value) => console.log("🚀 theme:", value));
    $systemTheme.listen((value) => console.log("🚀 system theme:", value));
    $resolvedTheme.listen((value) => console.log("🚀 resolved theme:", value));
  }

  const applyThemeScriptString = createThemeScript({
    themes,
    themesMap,
    defaultTheme,
    defaultLightTheme,
    defaultDarkTheme,
    dataAttributes,
    themeStorageKey,
    darkMediaQuery,
    enableColorScheme,
    enableSystem,
    updateClassAttribute,
    forcedThemeFlagAttribute,
  });

  const createForcedThemeScriptString = createForcedThemeScriptFactory({
    themes,
    themesMap,
    dataAttributes,
    enableColorScheme,
    updateClassAttribute,
    forcedThemeFlagAttribute,
  });

  return {
    themes: enableSystem ? [...themes, "system"] : themes,
    $theme: $theme as ReadableAtom<ThemeName>,
    $resolvedTheme,
    $systemTheme: $systemTheme as ReadableAtom<SystemThemeStateValue>,
    setTheme: (theme: ThemeName) => $theme.set(theme),
    applyThemeScriptString,
    createForcedThemeScriptString,
  };
}

/**
 * Validates and initializes the theme store configuration.
 * @param config - The theme store configuration object.
 * @returns The validated and initialized configuration object.
 */
function validateAndInitializeThemeStoreConfiguration(
  config: ThemeStoreConfig,
): Required<ThemeStoreConfig> {
  const {
    themes = [],
    defaultTheme,
    defaultLightTheme,
    defaultDarkTheme,
    themesMap,
    themeStorageKey = "omni-theme",
    darkMediaQuery = "(prefers-color-scheme: dark)",
    dataAttributes = ["data-theme"],
    enableColorScheme = true,
    enableSystem = true,
    updateClassAttribute = true,
    disableTransitionOnChange = false,
    forcedThemeFlagAttribute = "data-theme-forced",
    debug = false,
  } = config;

  // Validate and set default values for theme-related properties
  const validatedThemes = themes.length > 0 ? themes : ["light", "dark"];
  const validatedDefaultTheme =
    defaultTheme && validatedThemes.includes(defaultTheme)
      ? defaultTheme
      : enableSystem
        ? "system"
        : validatedThemes[0];

  const validatedDefaultLightTheme =
    defaultLightTheme && validatedThemes.includes(defaultLightTheme)
      ? defaultLightTheme
      : validatedThemes.find((t) => t.toLowerCase().includes("light")) ||
        validatedThemes[0];

  const validatedDefaultDarkTheme =
    defaultDarkTheme && validatedThemes.includes(defaultDarkTheme)
      ? defaultDarkTheme
      : validatedThemes.find((t) => t.toLowerCase().includes("dark")) ||
        validatedThemes[validatedThemes.length - 1];

  // Validate and set default values for themesMap
  const validatedThemesMap: Record<SystemTheme, ThemeName[]> = themesMap || {
    light: [validatedDefaultLightTheme],
    dark: [validatedDefaultDarkTheme],
  };

  // Ensure all themes in themesMap are valid
  Object.values(validatedThemesMap)
    .flat()
    .forEach((theme) => {
      if (!validatedThemes.includes(theme)) {
        throw new Error(
          `Invalid theme "${theme}" in themesMap. Must be one of ${validatedThemes.join(
            ", ",
          )}.`,
        );
      }
    });

  // If enableSystem is true, ensure all required properties are set
  if (enableSystem) {
    if (!validatedDefaultLightTheme || !validatedDefaultDarkTheme) {
      throw new Error(
        "If enableSystem is true, both defaultLightTheme and defaultDarkTheme must be defined",
      );
    }
    if (!validatedThemesMap.light || !validatedThemesMap.dark) {
      throw new Error(
        "If enableSystem is true, themesMap must include both 'light' and 'dark' keys",
      );
    }
  }

  return {
    themes: validatedThemes,
    defaultTheme: validatedDefaultTheme,
    defaultLightTheme: validatedDefaultLightTheme,
    defaultDarkTheme: validatedDefaultDarkTheme,
    themesMap: validatedThemesMap,
    themeStorageKey,
    darkMediaQuery,
    dataAttributes,
    enableColorScheme,
    enableSystem,
    updateClassAttribute,
    disableTransitionOnChange,
    forcedThemeFlagAttribute,
    debug,
  };
}
