import type { DataAttributePattern, SystemTheme, ThemeName } from "./types";

/**
 * Detects the system's color scheme preference.
 *
 * @param darkMediaQuery - The media query string to detect dark mode
 * preference.
 * @returns The detected system theme ('dark' or 'light'), or undefined if
 * running server-side.
 */
export function getSystemTheme(
  darkMediaQuery: string,
): SystemTheme | undefined {
  if (typeof window === "undefined") return undefined;
  return window.matchMedia(darkMediaQuery).matches ? "dark" : "light";
}

/**
 * Updates the DOM to reflect the new theme.
 *
 * @param newTheme - The name of the new theme to apply.
 * @param themes - Array of all available theme names.
 * @param themesMap - Mapping of system themes to theme names.
 * @param dataAttributes - Array of data attributes to update with the new
 * theme.
 * @param enableColorScheme - Whether to update the color-scheme CSS property.
 * @param updateClassAttribute - Whether to update the class attribute of the
 * root element.
 * @param forcedThemeFlagAttribute - Data attribute indicating if a theme is
 * forced by the user.
 */
export function updateDOM(
  newTheme: ThemeName,
  themes: ThemeName[],
  themesMap: Record<SystemTheme, ThemeName[]>,
  dataAttributes: DataAttributePattern[],
  enableColorScheme: boolean,
  updateClassAttribute: boolean,
  forcedThemeFlagAttribute: DataAttributePattern,
): void {
  if (!newTheme || typeof window === "undefined") return;

  const root = document.documentElement;

  // Check if theme is forced by user
  if (
    forcedThemeFlagAttribute &&
    root.getAttribute(forcedThemeFlagAttribute) === "true"
  ) {
    return;
  }

  // Update class attribute
  if (updateClassAttribute) {
    root.classList.remove(...themes);
    root.classList.add(newTheme);
  }

  // Update data attributes
  dataAttributes.forEach((dataAttribute: DataAttributePattern) => {
    if (dataAttribute && dataAttribute.startsWith("data-")) {
      root.setAttribute(dataAttribute, newTheme);
    }
  });

  // Update color scheme
  if (enableColorScheme) {
    const colorScheme = themesMap.dark?.includes(newTheme)
      ? "dark"
      : themesMap.light?.includes(newTheme)
        ? "light"
        : null;
    if (colorScheme) {
      root.style.colorScheme = colorScheme;
    }
  }
}

/**
 * Temporarily disables all CSS transitions and animations on the page.
 *
 * @returns A cleanup function that, when called, will re-enable animations.
 *
 * @example
 * // Disable animations
 * const enableAnimations = disableAnimation();
 *
 * // Perform DOM operations here...
 *
 * // Re-enable animations
 * enableAnimations();
 */
export function disableAnimation(): () => void {
  const css = document.createElement("style");
  css.appendChild(
    document.createTextNode(`
    *,
    *::before,
    *::after {
      -webkit-transition: none !important;
      -moz-transition: none !important;
      -o-transition: none !important;
      -ms-transition: none !important;
      transition: none !important;
    }
  `),
  );
  document.head.appendChild(css);

  return () => {
    // Force a reflow
    window.getComputedStyle(document.body);

    // Remove the style element in the next frame
    requestAnimationFrame(() => {
      document.head.removeChild(css);
    });
  };
}
