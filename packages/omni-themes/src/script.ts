import type { ThemeName, ThemeStoreConfig } from "./types";

/**
 * Creates a script string to apply the theme based on the provided configuration.
 * This script is designed to be injected into the <head> of the document to solve
 * the "flash of incorrect theme" (FOIT) issue.
 *
 * @param config - The theme store configuration object.
 * @returns A script string that can be injected into the HTML.
 */
export function createThemeScript({
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
}: Omit<ThemeStoreConfig, "disableTransitionOnChange">): string {
  // The `applyThemeScript` function is meant to be injected into the <head> of the document.
  // It's written in vanilla JavaScript to ensure browser compatibility.
  const applyThemeScript = (
    themes = ["light", "dark"],
    themesMap = { light: ["light"], dark: ["dark"] },
    defaultTheme = "light",
    defaultLightTheme = "light",
    defaultDarkTheme = "dark",
    dataAttributes = [`data-theme`],
    themeStorageKey = "omni-theme",
    darkMediaQuery = "(prefers-color-scheme: dark)",
    enableColorScheme = true,
    enableSystem = true,
    updateClassAttribute = true,
    forcedThemeFlagAttribute = "data-theme-forced",
  ) => {
    /* Don't run on the server */
    if (typeof window === "undefined") return;

    const root = document.documentElement;

    /* Don't respond to theme change if the user has forced a theme */
    if (
      forcedThemeFlagAttribute &&
      root.getAttribute(forcedThemeFlagAttribute) === "true"
    )
      return;

    let resolvedTheme = defaultTheme;
    const theme = localStorage && localStorage.getItem(themeStorageKey);

    if (theme && theme !== "system") {
      resolvedTheme = theme;
    } else if (enableSystem) {
      const systemTheme = window.matchMedia(darkMediaQuery).matches
        ? "dark"
        : "light";
      resolvedTheme =
        systemTheme === "dark" ? defaultDarkTheme : defaultLightTheme;
    }

    /* Update class attribute if enabled */
    if (updateClassAttribute) {
      root.classList.remove(...themes);
      root.classList.add(resolvedTheme);
    }

    /* Update data attributes */
    if (dataAttributes) {
      dataAttributes.forEach((dataAttribute) => {
        if (dataAttribute && dataAttribute.startsWith("data-")) {
          root.setAttribute(dataAttribute, resolvedTheme);
        }
      });
    }

    /* Update color scheme if enabled */
    if (enableColorScheme && themesMap) {
      if (themesMap.dark && themesMap.dark.includes(resolvedTheme)) {
        root.style.colorScheme = "dark";
      } else if (themesMap.light && themesMap.light.includes(resolvedTheme)) {
        root.style.colorScheme = "light";
      }
    }
  };

  // Stringify the arguments to the applyThemeScript function
  const scriptArgs = JSON.stringify([
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
  ]).slice(1, -1); // remove square brackets

  // Create the script string that runs as IIFE when injected
  const scriptString = `(${applyThemeScript.toString()})(${scriptArgs})`;

  // TODO: Minify the script string?
  return scriptString;
}

/**
 * Creates a factory function that generates scripts to apply a forced theme.
 *
 * @param config - Partial theme store configuration object.
 * @returns A function that creates a script string for applying a forced theme.
 */
export function createForcedThemeScriptFactory({
  themes,
  themesMap,
  dataAttributes,
  enableColorScheme,
  updateClassAttribute,
  forcedThemeFlagAttribute,
}: Omit<
  ThemeStoreConfig,
  | "defaultTheme"
  | "defaultLightTheme"
  | "defaultDarkTheme"
  | "themeStorageKey"
  | "darkMediaQuery"
  | "enableSystem"
  | "disableTransitionOnChange"
>): (forcedTheme: ThemeName) => string {
  return (forcedTheme: ThemeName): string => {
    // The `applyForcedThemeScript` function is meant to be injected into the <head> of the document.
    // It's written in vanilla JavaScript to ensure browser compatibility.
    const applyForcedThemeScript = (
      forcedTheme = "light",
      themes = ["light", "dark"],
      themesMap = { light: ["light"], dark: ["dark"] },
      dataAttributes = [`data-theme`],
      enableColorScheme = true,
      updateClassAttribute = true,
      forcedThemeFlagAttribute = "data-theme-forced",
    ) => {
      /* Don't run on the server */
      if (typeof window === "undefined") return;

      const root = document.documentElement;

      /* Mark the page that the user has forced a theme */
      if (forcedThemeFlagAttribute) {
        root.setAttribute(forcedThemeFlagAttribute, "true");
      }

      /* Update class attribute if enabled */
      if (updateClassAttribute) {
        root.classList.remove(...themes);
        root.classList.add(forcedTheme);
      }

      /* Update data attributes */
      if (dataAttributes) {
        dataAttributes.forEach((dataAttribute) => {
          if (dataAttribute && dataAttribute.startsWith("data-")) {
            root.setAttribute(dataAttribute, forcedTheme);
          }
        });
      }

      /* Update color scheme if enabled */
      if (enableColorScheme && themesMap) {
        if (themesMap.dark && themesMap.dark.includes(forcedTheme)) {
          root.style.colorScheme = "dark";
        } else if (themesMap.light && themesMap.light.includes(forcedTheme)) {
          root.style.colorScheme = "light";
        }
      }
    };

    // Stringify the arguments to the applyForcedThemeScript function
    const scriptArgs = JSON.stringify([
      forcedTheme,
      themes,
      themesMap,
      dataAttributes,
      enableColorScheme,
      updateClassAttribute,
      forcedThemeFlagAttribute,
    ]).slice(1, -1); // remove square brackets

    // Create the script string that runs as IIFE when injected
    const scriptString = `(${applyForcedThemeScript.toString()})(${scriptArgs})`;

    // TODO: Minify the script string?
    return scriptString;
  };
}
