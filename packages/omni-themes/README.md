# Omni-Themes

A universal theme library that works across all JavaScript frameworks, inspired by `next-themes` but framework-agnostic. Omni-Themes provides seamless theme management with support for multiple custom themes, system preference detection, and cross-tab synchronization.

**Features:**

- Written in TypeScript
- Builds to both modern ES modules and CommonJS formats
- Provides TypeScript type definitions
- ESLint for code linting
- Prettier for code formatting
- Vitest for testing
- Tsup for building
- Minimal dependencies

## Installation

```bash
npm install @madooei/omni-themes
```

## Usage

A universal theme library that works across all JavaScript frameworks, inspired by `next-themes` but framework-agnostic. Omni-Themes provides seamless theme management with support for multiple custom themes, system preference detection, and cross-tab synchronization.

### Basic Setup

```typescript
import { createThemeStore } from "@madooei/omni-themes";

// Create theme store
const {
  themes, // Available themes array
  $theme, // Current theme atom
  $resolvedTheme, // Resolved theme atom (handles 'system')
  $systemTheme, // System preference atom
  setTheme, // Function to change theme
  applyThemeScriptString, // Script for FOUC prevention
} = createThemeStore({}); // Default options

// Listen for theme changes
$theme.listen((theme) => {
  console.log("Theme changed to:", theme);
});

// Change theme
setTheme("dark");
```

The variables which their names start with `$` are Nanostores atoms.

> [!NOTE]
> An atom is a reactive variable that can be listened to for changes.

For example, `$theme` is an atom that provides the following operations:

- `get(): T` - Return the current value of the atom
- `listen(callback: (value: T, oldValue: T) => void)` - Listen for changes to the atom
- `subscribe(callback: (value: T) => void)` - Subscribe to the atom

> [!NOTE]  
> `subscribe` calls the callback immediately with the store’s current value and then on every future change, while `listen` only calls the callback when the value changes (not at subscription time). Use `subscribe` when you want the current state right away; use `listen` to react only to updates.

Nanostores atoms also support `set(value: T)` to update the value. However, in Omni-Themes, you should use the `setTheme` function to change the theme, as it handles additional logic like system preference detection, etc. To get technical, we expose `ReadableAtom` for read-only access to the theme related atoms so you cannot access `set` directly on them.

Let's explore the variables returned by `createThemeStore` in more detail:

- `themes`: An array of available theme names. You can use this to populate a theme selector UI. In the default configuration, it includes `['light', 'dark', 'system]`, but you can customize it. (I'll explain how to customize themes later.)

- `setTheme`: A function to change the current theme. It accepts any theme name from the `themes` array. For example, `setTheme('dark')` will change the theme to dark mode.

- `$theme` and `$resolvedTheme`: These are Nanostores atoms that hold the current theme and resolved theme respectively. What is the difference? Well, let's say you do `setTheme('system')`. The `$theme` atom will be set to `'system'`, but the `$resolvedTheme` atom will be set to either `'light'` or `'dark'` based on the user's system preference. This way, you can always get the actual theme being applied to your app. You can further customize this behavior by providing options to the `createThemeStore` function (will explain later).

- `$systemTheme`: This atom holds the user's system preference for light or dark mode. It will be `undefined` if the system preference is not set or not detectable.

- `applyThemeScriptString`: A string containing a script that you can inject into your HTML to prevent Flash of Unstyled Content (FOUC) when the theme changes. This script should be included in the `<head>` section of your HTML. You can do this in a few different ways, depending on your framework or setup. For example, in React, you can use `useEffect` to inject it into the document head. In vanilla JavaScript, you can do this:

  ```javascript
  document.head.insertAdjacentHTML(
    "beforeend",
    `<script>${applyThemeScriptString}</script>`,
  );
  ```

### Multiple Themes (Vanilla JavaScript Example)

Here is a more complete example that shows how to set up multiple themes and use the `setTheme` function to switch between them:

```typescript
import { createThemeStore } from "@madooei/omni-themes";

// Create a theme store with multiple themes for vanilla JS demo
export const {
  themes,
  $theme,
  $resolvedTheme,
  $systemTheme,
  setTheme,
  applyThemeScriptString,
  createForcedThemeScriptString,
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
```

Let's break down the options used in this example:

- `themes`: An array of theme names. You can define any number of themes here. If you don't specify this option, it defaults to `['light', 'dark']`. Do not include the `system` theme here, as it is handled automatically by the library. If you want to use the system theme, set `enableSystem: true` (which is the default).

- `defaultTheme`: The default theme to use when the app loads. It can be any theme from the `themes` array. If not specified, it defaults to the first theme in the `themes` array unless `enableSystem` is set to `true`, in which case it defaults to the system preference.

- `defaultLightTheme` and `defaultDarkTheme`: These specify which themes to resolve to when the user selects the `system` theme. So, if we have multiple themes and the user selects `system`, and the system is in light mode, the app will use the `defaultLightTheme`. If the system is in dark mode, it will use the `defaultDarkTheme`. If not specified, it defaults to `light` for light mode and `dark` for dark mode, assuming those themes are defined in the `themes` array. If not, it. defaults to the first theme in the `themes` array for light mode and the last theme for dark mode.

- `themesMap`: This is an optional mapping of themes to light and dark modes. This works in conjunction with the `enableColorScheme` option (will be explained shortly).

- `themeStorageKey`: The key used to store the current theme in `localStorage`. This allows the theme to persist across page reloads. You can change this to any string you like. By default, it is set to `omni-theme`.

- `enableSystem`: If set to `true`, the library will automatically detect the user's system preference for light or dark mode and apply it. The default is `true`.

- `enableColorScheme`: If set to `true`, the library will update the browser's color-scheme meta tag based on the current theme. This is useful for browsers that support color schemes. The default is `true`. When you have multiple themes, you can use the `themesMap` option to specify which themes should be mapped to light and dark color schemes. If `enableColorScheme` is `true` but `themesMap` is not provided, it will set the color scheme to null, which means it won't update the color scheme meta tag.

- `updateClassAttribute`: If set to `true`, the library will update the `class` attribute of the `<html>` element with the current theme. This is useful for CSS styling based on the theme. The default is `true`.

- `dataAttributes`: An array of HTML data attributes to set on the `<html>` element. By default, it sets `data-theme` to the current theme. You can add more attributes if needed.

- `forcedThemeFlagAttribute`: The attribute used to indicate that a theme is forced. This is useful for pages that need to always use a specific theme regardless of user preference. The default is `data-theme-forced`. Notice that the `createThemeStore` function also returns a `createForcedThemeScriptString` function that generates a script to force a specific theme on a page. This is useful for pages that need to always use a specific theme regardless of user preference.

- `debug`: If set to `true`, the library will log debug information to the console. This is useful for development and debugging purposes. The default is `false`.

### React Integration

```tsx
import React, { useEffect, useState } from "react";
import { $theme, setTheme, themes } from "./theme-store";

function useTheme() {
  const [theme, setThemeState] = useState($theme.get());

  useEffect(() => {
    const unsubscribe = $theme.listen(setThemeState);
    return unsubscribe;
  }, []);

  return { theme, setTheme, themes };
}

function ThemeSelector() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      {themes.map((themeName) => (
        <option key={themeName} value={themeName}>
          {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
        </option>
      ))}
    </select>
  );
}
```

### Configuration Options

#### createThemeStore

The main function to create a theme store with the following options:

**Configuration:**

- `themes` (string[]) - Array of theme names (default: ['light', 'dark'])
- `enableSystem?` (boolean) - Enable system theme detection (default: true)
- `enableColorScheme?` (boolean) - Update browser color-scheme (default: true)
- `dataAttributes?` (string[]) - HTML data attributes to set (default: ['data-theme'])
- `classNames?` (string[]) - CSS class names to set (default: [])
- `debug?` (boolean) - Enable debug logging (default: false)

**Returns:**

- `themes` (string[]) - Array of available themes
- `$theme` (Atom) - Current theme atom (reactive)
- `$resolvedTheme` (Atom) - Resolved theme atom (never 'system')
- `$systemTheme` (Atom) - System preference atom ('light' | 'dark' | null)
- `setTheme` (function) - Function to change theme
- `applyThemeScriptString` (string) - Script for FOUC prevention
- `createForcedThemeScriptString` (function) - Generate forced theme script

### Styling with CSS Custom Properties

Omni-Themes works with **CSS Custom Properties** (CSS variables) for flexible theming. You define themes using CSS variables and Omni-Themes manages applying them.

**Setup CSS Themes:**

1. Define your themes using CSS custom properties:

   ```css
   /* Default/Light theme */
   :root {
     --bg-primary: #ffffff;
     --text-primary: #1e293b;
     --accent-primary: #3b82f6;
   }

   /* Dark theme */
   [data-theme="dark"] {
     --bg-primary: #0f172a;
     --text-primary: #f1f5f9;
     --accent-primary: #60a5fa;
   }

   /* Custom theme */
   [data-theme="ocean"] {
     --bg-primary: #ecfeff;
     --text-primary: #155e75;
     --accent-primary: #06b6d4;
   }
   ```

2. Use the CSS variables in your styles:

   ```css
   body {
     background-color: var(--bg-primary);
     color: var(--text-primary);
     transition:
       background-color 0.3s ease,
       color 0.3s ease;
   }

   .button {
     background-color: var(--accent-primary);
     border-radius: 0.375rem;
   }
   ```

### Advanced Features

#### FOUC (Flash of Unstyled Content) Prevention

Omni-Themes prevents theme flashing during page load by providing inline scripts:

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Inject theme script before any content -->
    <script id="theme-script"></script>
  </head>
  <body>
    <!-- Your app content -->
  </body>
</html>
```

```javascript
// Inject the FOUC prevention script
const themeScript = document.getElementById("theme-script");
if (themeScript) {
  themeScript.innerHTML = applyThemeScriptString;
}
```

#### Cross-Tab Synchronization

Theme changes automatically sync across browser tabs using localStorage events. No additional setup required.

#### System Theme Detection

When `enableSystem: true`, the library automatically detects system dark/light mode preferences and updates accordingly.

## Cloning the Repository

To make your workflow more organized, it's a good idea to clone this repository into a directory named `omni-themes-workspace`. This helps differentiate the workspace from the `omni-themes` located in the `packages` directory.

```bash
git clone https://github.com/madooei/omni-themes omni-themes-workspace

cd omni-themes-workspace
```

## Repository Structure

- `packages` — Contains the primary package(s) for this repository (e.g., `omni-themes`). Each package is self-contained and can be copied out and used independently.
- `examples` — Contains examples of how to use the packages. Each example is a minimal, standalone project.
- `playgrounds` — Contains demos of the dependencies of the primary package(s). Each playground is a minimal, standalone project.
- `docs` — Contains various documentation for users and developers.
- `.github` — Contains GitHub-specific files, such as workflows and issue templates.

## How to Use This Repo

- To work on a package, go to `packages/<package-name>` and follow its README.
- To try an example, go to `examples/<example-name>` and follow its README.
- To run the playground, go to `playground/<package-name>` and follow its README.
- For documentation, see the `docs` folder.

### Using a VSCode Multi-root Workspace

With Visual Studio Code, you can enhance your development experience by using a multi-root workspace to access packages, examples, and playgrounds simultaneously. This approach is more efficient than opening the root directory, or each package or example separately.

To set up a multi-root workspace:

1. Open Visual Studio Code.
2. Navigate to `File > Open Workspace from File...`.
3. Select the `omni-themes.code-workspace` file located at the root of the repository. This action will open all specified folders in one workspace.

The `omni-themes.code-workspace` file can be customized to include different folders or settings. Here's a typical configuration:

```json
{
  "folders": [
    {
      "path": "packages/omni-themes"
    },
    {
      "path": "examples/react"
    },
    {
      "path": "examples/astro"
    }
  ],
  "settings": {
    // Add any workspace-specific settings here, for example:
    "git.openRepositoryInParentFolders": "always"
  }
}
```

## Developing the Package

Change to the package directory and install dependencies:

```bash
cd packages/omni-themes
npm install
```

- Read the [Project Roadmap](../../docs/ROADMAP.md) for project goals, status, evolution, and development guidelines.
- Read the [Development Guide](DEVELOPMENT.md) for detailed information on the package architecture, build configuration, and implementation patterns.
- Follow the [Contributing Guide](../../docs/CONTRIBUTING.md) for contribution guidelines, coding standards, and best practices.

## Package Management

When you are ready to publish your package:

```bash
npm run release
```

This single command will:

- Validate your code with the full validation pipeline
- Analyze commits to determine version bump
- Update package.json version and changelog
- Build the package
- Create and push git tag
- Create GitHub release
- Publish to NPM

> [!TIP]
> For detailed information about package publishing, versioning, and local development workflows, see the [NPM Package Management Guide](../../docs/guides/npm-package.md).
