# Omni-Themes Astro Example

This example demonstrates how to integrate the `@madooei/omni-themes` package with an Astro application, showcasing server-side rendering (SSR) compatibility and comprehensive theme management.

## 🎨 Features

- **5 Demo Pages**: Complete showcase of all theme library features
- **SSR Compatible**: No flash of unstyled content (FOUC) with server-side rendering
- **Multiple Themes**: 6 custom themes (light, dark, blue, green, purple, ocean)
- **System Integration**: Automatic system dark/light mode detection
- **Cross-Tab Sync**: Theme changes synchronized across browser tabs
- **Forced Themes**: Demonstration of page-specific theme locking

## 📁 Project Structure

```
src/
├── layouts/
│   └── BaseLayout.astro      # Base layout with theme integration
├── lib/
│   └── theme-store.ts        # Theme store configuration
└── pages/
    ├── index.astro           # Home page with feature overview
    ├── basic.astro           # Basic light/dark theme switching
    ├── selector.astro        # Interactive theme picker
    ├── forced.astro          # Forced purple theme demo
    └── multi-theme.astro     # Advanced multi-theme showcase
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

3. **Open your browser** and navigate to `http://localhost:4321`

## 🧞 Commands

| Command | Action |
|:--------|:-------|
| `npm install` | Installs dependencies |
| `npm run dev` | Starts local dev server at `localhost:4321` |
| `npm run build` | Build your production site to `./dist/` |
| `npm run preview` | Preview your build locally, before deploying |

## 🎯 Demo Pages

### 1. **Home** (`/`)
- Feature overview and installation guide
- Introduction to omni-themes capabilities

### 2. **Basic** (`/basic`)
- Simple light/dark theme switching
- System theme detection demonstration

### 3. **Selector** (`/selector`)
- Interactive theme picker with 5 themes
- Real-time theme switching and visual feedback

### 4. **Forced** (`/forced`)
- Page locked to purple theme
- Demonstration of forced theme functionality

### 5. **Multi-theme** (`/multi-theme`)
- Advanced showcase with 6 themes
- Auto-cycling theme demonstration
- Cross-tab synchronization testing

## 🔧 Integration Details

### Theme Store Configuration

```typescript
// src/lib/theme-store.ts
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
  themes: ['system', 'light', 'dark', 'blue', 'green', 'purple'],
  enableSystem: true,
  enableColorScheme: true,
  dataAttributes: ['data-theme']
});
```

### FOUC Prevention

The example includes proper FOUC prevention using inline scripts in the base layout:

```astro
<!-- BaseLayout.astro -->
<script is:inline set:html={applyThemeScriptString} />
```

### CSS Custom Properties

Themes are implemented using CSS custom properties for maximum flexibility:

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

## 📚 Learn More

- [Omni-Themes Documentation](../../docs/index.md)
- [Astro Documentation](https://docs.astro.build)
- [Package Source](../../packages/omni-themes/)