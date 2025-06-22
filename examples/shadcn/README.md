# Omni-Themes Shadcn UI Example

This example demonstrates how to integrate the `@madooei/omni-themes` package with Shadcn UI components, showcasing a beautiful theme toggle component that maintains the exact UI/UX of the original shadcn implementation while leveraging omni-themes for state management.

## 🎨 Features

- **Shadcn UI Integration**: Uses Shadcn UI primitive components (dropdown menu, tooltip, button)
- **Elegant Theme Toggle**: Beautiful animated icon transitions between Sun/Moon/Computer
- **Tailwind CSS 4**: Modern Tailwind CSS with custom variants and color system
- **FOUC Prevention**: Automatic script injection to prevent flash of unstyled content
- **System Theme Detection**: Automatic detection of system dark/light preferences
- **Persistent Storage**: Theme preference saved across browser sessions
- **TypeScript Support**: Full type safety throughout the application

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                       # Shadcn UI primitive components
│   │   ├── button.tsx            # Button component with variants
│   │   ├── dropdown-menu.tsx     # Dropdown menu primitive
│   │   └── tooltip.tsx           # Tooltip primitive
│   ├── header.tsx                # Header component with theme toggle
│   ├── theme-toggle.tsx          # Main theme toggle component
│   └── tooltip-button.tsx        # Combined tooltip + button component
├── hooks/
│   └── use-theme.ts              # React hook for theme management
├── lib/
│   └── utils.ts                  # Utility functions (cn, etc.)
├── stores/
│   └── theme-store.ts            # Omni-themes store configuration
├── types/
│   └── theme-types.ts            # Theme type definitions
└── index.css                     # Tailwind CSS and theme variables
```

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

## 🧞 Commands

| Command | Action |
|:--------|:-------|
| `npm install` | Installs dependencies |
| `npm run dev` | Starts local dev server at `localhost:5173` |
| `npm run build` | Build your production site to `./dist/` |
| `npm run preview` | Preview your build locally, before deploying |
| `npm run lint` | Run ESLint for code quality |

## 🎛️ Theme Toggle Component

The centerpiece of this example is the `ThemeToggle` component that provides an elegant way to switch between themes:

### Component Features

- **Animated Icons**: Smooth transitions between Sun (light), Moon (dark), and Computer (system) icons
- **Dropdown Menu**: Clean dropdown interface for theme selection
- **Tooltip**: Helpful tooltip on hover
- **Accessible**: Full keyboard navigation and screen reader support
- **State Management**: Integrated with omni-themes for reactive state updates

### Usage

```tsx
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="border-b bg-background/40 backdrop-blur px-4">
      <div className="flex items-center justify-between py-4">
        <p className="font-bold">My App</p>
        <ThemeToggle />
      </div>
    </header>
  );
}
```

### Icon Animation Logic

```tsx
// Determine which theme is active
const isLightTheme = theme === "light";
const isDarkTheme = theme === "dark";
const isSystemTheme = theme === "system";

// Animated icon transitions with rotate and scale
<Sun
  className={cn("transition-all duration-150 ease-in-out absolute", {
    "rotate-0 scale-100": isLightTheme,
    "rotate-90 scale-0": !isLightTheme,
  })}
/>
```

## 🔧 Omni-Themes Integration

### Theme Store Configuration

```typescript
// src/stores/theme-store.ts
import { createThemeStore } from '@madooei/omni-themes';

export const {
  themes,
  $theme,
  $resolvedTheme,
  $systemTheme,
  setTheme,
  applyThemeScriptString,
  createForcedThemeScriptString
} = createThemeStore({
  themes: ['system', 'light', 'dark'],
  enableSystem: true,
  enableColorScheme: true,
  updateClassAttribute: true, // Adds classes to document.documentElement
  dataAttributes: [], // Disabled for shadcn compatibility
  debug: false
});
```

### React Hook Integration

```typescript
// src/hooks/use-theme.ts
import { useEffect, useState } from "react";
import { $theme, $resolvedTheme, setTheme } from "@/stores/theme-store";

export const useTheme = () => {
  const [theme, setThemeState] = useState($theme.get());
  const [resolvedTheme, setResolvedThemeState] = useState<"light" | "dark">(() => {
    const resolved = $resolvedTheme.get();
    return resolved === 'light' || resolved === 'dark' ? resolved : 'light';
  });

  useEffect(() => {
    const unsubscribeTheme = $theme.listen(setThemeState);
    const unsubscribeResolvedTheme = $resolvedTheme.listen((resolvedValue) => {
      setResolvedThemeState(resolvedValue === 'light' || resolvedValue === 'dark' ? resolvedValue : 'light');
    });

    return () => {
      unsubscribeTheme();
      unsubscribeResolvedTheme();
    };
  }, []);

  return { theme, resolvedTheme, setTheme };
};
```

## 🎨 Shadcn UI Theming

### Tailwind CSS 4 Configuration

The example uses Tailwind CSS 4 with custom variants and a comprehensive color system:

```css
/* Custom dark variant */
@custom-variant dark (&:is(.dark *));

/* Theme variables */
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  /* ... more variables */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  /* ... dark theme overrides */
}
```

### Component Styling

Components use Tailwind utility classes with the custom color system:

```tsx
<button className="bg-background text-foreground border-border hover:bg-accent">
  Theme Toggle
</button>
```

## 🛠️ Key Components

### ThemeToggle

The main theme switching component with dropdown interface and animated icons.

### TooltipButton

A composite component combining Shadcn's Button and Tooltip components:

```tsx
export function TooltipButton({ 
  children, 
  tooltipContent, 
  ...buttonProps 
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button {...buttonProps}>
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {tooltipContent}
      </TooltipContent>
    </Tooltip>
  );
}
```

## 🔄 Migration from Custom Theme System

This example demonstrates how to migrate from a custom nanostores-based theme system to omni-themes:

### Before (Custom Implementation)
- Custom `persistentAtom` for storage
- Manual system preference detection
- Custom React hook with complex effect logic
- Manual DOM class management

### After (Omni-Themes)
- Built-in persistence and system detection
- Simplified React hook with automatic subscriptions
- Automatic DOM updates
- FOUC prevention included
- Cross-tab synchronization

The migration maintains the exact same API and UI/UX while gaining all the benefits of the omni-themes library.

## 📚 Learn More

- [Omni-Themes Documentation](../../docs/index.md)
- [Shadcn UI Documentation](https://ui.shadcn.com)
- [Package Source](../../packages/omni-themes/)
- [Tailwind CSS 4 Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/primitives)