# Vite + Vanilla TypeScript + Omni-Themes

To run the project, run:

```bash
npm install
npm run dev
```

Look at the `src/theme-store.ts` file where we create the theme store: 

```ts
import { createThemeStore } from "@madooei/omni-themes";

// Create theme store
export const {
  themes,           // Available themes array
  $theme,           // Current theme atom
  $resolvedTheme,   // Resolved theme atom (handles 'system')
  $systemTheme,     // System preference atom
  setTheme,         // Function to change theme
} = createThemeStore({});
```

Open the `src/main.ts` file to see how to use the theme store.