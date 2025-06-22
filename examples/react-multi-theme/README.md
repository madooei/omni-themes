# Omni-Themes React Example

This example demonstrates how to integrate the `@madooei/omni-themes` package with a React application using custom hooks and components for seamless theme management.

## ⚛️ Features

- **Custom React Hooks**: `useTheme()` hook for reactive theme management
- **React Components**: Reusable theme selector and demo components
- **TypeScript Support**: Full type safety with TypeScript integration
- **Multiple Themes**: 7 custom themes including system preference
- **Interactive Controls**: Theme selector, random theme, auto-cycling
- **FOUC Prevention**: Automatic script injection via ThemeProvider
- **Real-time Updates**: All components update reactively to theme changes

## 📁 Project Structure

```
src/
├── components/
│   ├── ThemeProvider.tsx     # Provides theme context and FOUC prevention
│   ├── ThemeSelector.tsx     # Theme dropdown selector component
│   ├── ThemeDemo.tsx         # Theme state display and color swatches
│   └── ThemeControls.tsx     # Interactive theme controls (random, auto-cycle)
├── hooks/
│   └── useTheme.ts           # Custom React hook for theme management
├── lib/
│   └── theme-store.ts        # Theme store configuration
├── styles/
│   ├── theme.css             # CSS custom properties for themes
│   └── components.css        # Component styling
├── App.tsx                   # Main application component
└── main.tsx                  # React application entry point
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

## 🪝 React Integration

### Custom useTheme Hook

```tsx
// src/hooks/useTheme.ts
import { useEffect, useState } from 'react';
import { $theme, $resolvedTheme, $systemTheme, setTheme, themes } from '../lib/theme-store';

export function useTheme() {
  const [theme, setThemeState] = useState($theme.get());
  const [resolvedTheme, setResolvedThemeState] = useState($resolvedTheme.get());
  const [systemTheme, setSystemThemeState] = useState($systemTheme.get() || null);

  useEffect(() => {
    const unsubscribeTheme = $theme.listen(setThemeState);
    const unsubscribeResolvedTheme = $resolvedTheme.listen(setResolvedThemeState);
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
    theme,           // Current theme (may be 'system')
    resolvedTheme,   // Actually applied theme (never 'system')
    systemTheme,     // System preference ('light' | 'dark' | null)
    themes,          // All available themes
    setTheme,        // Function to change theme
  };
}
```

### Theme Provider Component

```tsx
// src/components/ThemeProvider.tsx
import { useEffect } from 'react';
import { applyThemeScriptString } from '../lib/theme-store';

export function ThemeProvider({ children }) {
  useEffect(() => {
    // Inject theme script for FOUC prevention
    const themeScript = document.getElementById('theme-script');
    if (themeScript) {
      themeScript.innerHTML = applyThemeScriptString;
    }
  }, []);

  return <>{children}</>;
}
```

### Theme Selector Component

```tsx
// src/components/ThemeSelector.tsx
import { useTheme } from '../hooks/useTheme';

export function ThemeSelector() {
  const { theme, themes, setTheme } = useTheme();

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

## 🎨 Theme Configuration

The example includes 7 pre-configured themes:

- **System**: Follows OS preference (light/dark)
- **Light**: Clean light theme
- **Dark**: Modern dark theme
- **Blue**: Cool blue color scheme
- **Green**: Natural green theme
- **Purple**: Rich purple theme
- **Ocean**: Aqua-inspired theme

### CSS Custom Properties

Each theme is defined using CSS custom properties:

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #1e293b;
  --accent-primary: #3b82f6;
}

[data-theme="dark"] {
  --bg-primary: #0f172a;
  --text-primary: #f1f5f9;
  --accent-primary: #60a5fa;
}
```

## 🎛️ Interactive Features

### Theme Controls
- **Random Theme**: Instantly switch to a random theme
- **Auto-Cycle**: Automatically cycle through themes every 2.5 seconds
- **Clear Storage**: Reset theme preference and clear localStorage
- **New Tab**: Test cross-tab synchronization

### Real-time Monitoring
- Current theme state display
- System preference detection
- CSS variable values
- Storage status indicators

## 📚 Learn More

- [Omni-Themes Documentation](../../docs/index.md)
- [React Documentation](https://react.dev)
- [Package Source](../../packages/omni-themes/)
- [Vite Documentation](https://vitejs.dev)