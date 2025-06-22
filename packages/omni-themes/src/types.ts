import type { ReadableAtom } from "nanostores";

/**
 * Represents the name of a theme.
 */
export type ThemeName = string;

/**
 * Represents the system color scheme preference.
 */
export type SystemTheme = "light" | "dark";

/**
 * Represents a data attribute pattern used for theme-related DOM manipulations.
 * Must start with "data-" followed by any string.
 */
export type DataAttributePattern = `data-${string}`;

/**
 * Configuration options for the theme store.
 */
export interface ThemeStoreConfig {
  /**
   * List of all available theme names.
   */
  themes?: ThemeName[];

  /**
   * Default theme name. Must be one of the names specified in `themes`.
   */
  defaultTheme?: ThemeName;

  /**
   * Default theme name for light mode. Used when `enableSystem` is false and
   * the system preference is light.
   */
  defaultLightTheme?: ThemeName;

  /**
   * Default theme name for dark mode. Used when `enableSystem` is false and the
   * system preference is dark.
   */
  defaultDarkTheme?: ThemeName;

  /**
   * Maps system themes to theme names. Example: If `themes` is ["day",
   * "night"], then `themesMap` could be { light: ["day"], dark: ["night"] }.
   */
  themesMap?: Record<SystemTheme, ThemeName[]>;

  /**
   * Key used to store the selected theme in localStorage. This persists the
   * theme across sessions.
   * @default "theme"
   */
  themeStorageKey?: string;

  /**
   * Media query used to detect the system's theme preference.
   * @default "(prefers-color-scheme: dark)"
   */
  darkMediaQuery?: string;

  /**
   * Data attributes used to store the theme name on DOM elements.
   * @default ["data-theme"] Set to an empty array to disable data attributes.
   */
  dataAttributes?: DataAttributePattern[];

  /**
   * Enables color scheme adjustments. When true, the theme will be mapped to
   * "light" or "dark" and the color-scheme CSS property will be set on the
   * document.documentElement. This helps the browser apply the correct color
   * scheme to built-in elements.
   * @default true
   */
  enableColorScheme?: boolean;

  /**
   * Enables system theme detection. When true, a "system" theme option is
   * added, which resolves to either `defaultLightTheme` or `defaultDarkTheme`
   * based on the system preference.
   * @default true
   */
  enableSystem?: boolean;

  /**
   * Updates the class attribute of document.documentElement with the active
   * theme name.
   * @default true
   */
  updateClassAttribute?: boolean;

  /**
   * Disables all CSS transitions when switching themes. Useful for improving
   * performance during theme changes.
   * @default false
   */
  disableTransitionOnChange?: boolean;

  /**
   * Data attribute used to indicate that the user has forced a specific theme.
   * The attribute value will be set to "true" or "false".
   * @default "data-theme-forced" Set to an empty string to disable this
   * feature.
   */
  forcedThemeFlagAttribute?: DataAttributePattern;

  /**
   * Enables debug mode. When true, a logger is created for each theme Nanostore atom.
   * @default false
   */
  debug?: boolean;
}

/**
 * Represents the theme store and its associated methods and properties.
 */
export interface ThemeStore {
  /**
   * List of all available theme names, including "system" if enabled.
   */
  themes: string[];

  /**
   * Nanostore atom for the current theme name.
   */
  $theme: ReadableAtom<ThemeName>;

  /**
   * Nanostore atom for the resolved theme name. This will be the actual theme
   * applied, accounting for system preferences if applicable.
   */
  $resolvedTheme: ReadableAtom<ThemeName>;

  /**
   * Nanostore atom for the current system theme preference.
   */
  $systemTheme: ReadableAtom<SystemTheme | undefined>;

  /**
   * Updates the current theme.
   * @param theme - The new theme name to set.
   */
  setTheme: (theme: ThemeName) => void;

  /**
   * A script to be injected into the <head> of the document. This applies the
   * theme as soon as possible to prevent a "flash of incorrect theme".
   */
  applyThemeScriptString: string;

  /**
   * Creates a script to be injected into the <head> of the document to force a
   * specific theme. This helps prevent a "flash of incorrect theme" when a
   * forced theme is desired.
   */
  createForcedThemeScriptString: (forcedTheme: ThemeName) => string;
}
