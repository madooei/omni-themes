# Omni-Themes Vanilla JavaScript Example

This example demonstrates how to integrate the `@madooei/omni-themes` package with vanilla JavaScript applications, showcasing framework-free theme management without any dependencies beyond the core library.

## 🌟 Features

- **Pure JavaScript**: No framework dependencies, works in any JavaScript environment
- **Comprehensive Demo**: Complete showcase of all theme library features
- **Interactive UI**: Theme selector, random theme, auto-cycling, and monitoring
- **6 Custom Themes**: Including light, dark, blue, green, purple, and ocean themes
- **Real-time Monitoring**: Live display of theme state and CSS variables
- **FOUC Prevention**: Proper flash prevention with inline scripts
- **Cross-Tab Sync**: Automatic synchronization across browser tabs

## 📁 Project Structure

```
src/
├── main.ts                   # Main application logic and UI setup
├── theme-store.ts            # Theme store configuration
├── style.css                 # CSS custom properties and styling
└── vite-env.d.ts            # TypeScript environment declarations
index.html                    # HTML structure with theme script injection
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

## 🛠️ Vanilla JavaScript Integration

### Theme Store Setup

```typescript
// src/theme-store.ts
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
  themes: ['system', 'light', 'dark', 'blue', 'green', 'purple', 'ocean'],
  enableSystem: true,
  enableColorScheme: true,
  dataAttributes: ['data-theme']
});
```

### FOUC Prevention

```javascript
// Inject theme script for immediate theme application
function injectThemeScript() {
  const existingScript = document.getElementById('theme-script');
  if (existingScript) {
    existingScript.innerHTML = applyThemeScriptString;
  }
}
```

### Theme Selector Implementation

```javascript
// Set up theme selector dropdown
function setupThemeSelector() {
  const themeSelector = document.getElementById('theme-selector');
  
  // Populate theme options
  themes.forEach(theme => {
    const option = document.createElement('option');
    option.value = theme;
    option.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
    themeSelector.appendChild(option);
  });

  // Handle theme changes
  themeSelector.addEventListener('change', (e) => {
    setTheme(e.target.value);
  });

  // Listen for theme changes from other sources
  $theme.listen((theme) => {
    themeSelector.value = theme;
  });
}
```

### Reactive State Management

```javascript
// Listen for theme changes and update UI
$theme.listen(() => {
  updateThemeInfo();
  displayStoreState();
});

$resolvedTheme.listen(() => {
  displayCSSVariables();
  updateThemeInfo();
});

$systemTheme.listen(() => {
  updateThemeInfo();
  displayStoreState();
});
```

## 🎨 Theme Configuration

The example includes 6 pre-configured themes with CSS custom properties:

### Theme Definitions

```css
/* Light theme (default) */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1e293b;
  --accent-primary: #3b82f6;
}

/* Dark theme */
[data-theme="dark"] {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: #f1f5f9;
  --accent-primary: #60a5fa;
}

/* Ocean theme */
[data-theme="ocean"] {
  --bg-primary: #ecfeff;
  --bg-secondary: #cffafe;
  --text-primary: #155e75;
  --accent-primary: #06b6d4;
}
```

## 🎛️ Interactive Features

### Theme Controls
- **Theme Selector**: Dropdown for manual theme selection
- **Random Theme**: Button to switch to a random theme
- **Auto-Cycle**: Toggle automatic theme cycling (2.5s intervals)
- **Clear Storage**: Reset theme preference and localStorage

### Monitoring Tools
- **Theme State Display**: Current, resolved, and system theme values
- **CSS Variables**: Live display of active CSS custom property values
- **Storage Status**: localStorage activity indicator
- **System Status**: System preference detection status

### Advanced Features
- **Cross-Tab Testing**: Open new tab button for sync testing
- **Theme Notifications**: Visual feedback for theme changes
- **Smooth Navigation**: Scroll-to-section navigation
- **Responsive Design**: Mobile-friendly layout

## 🔧 Key Functions

### Theme Management
```javascript
setTheme('dark');                    // Set specific theme
setTheme('system');                  // Use system preference
const currentTheme = $theme.get();   // Get current theme
```

### Event Handling
```javascript
// Listen for theme changes
const unsubscribe = $theme.listen((theme) => {
  console.log('Theme changed to:', theme);
});

// Clean up listener
unsubscribe();
```

### Storage Management
```javascript
// Clear stored theme preference
localStorage.removeItem('omni-theme-vanilla-demo');

// Check storage status
const hasStorage = localStorage.getItem('omni-theme-vanilla-demo') !== null;
```

## 📱 Responsive Design

The example includes responsive design considerations:
- Mobile-friendly navigation
- Flexible grid layouts
- Touch-friendly controls
- Adaptive typography

## 📚 Learn More

- [Omni-Themes Documentation](../../docs/index.md)
- [Package Source](../../packages/omni-themes/)
- [Vite Documentation](https://vitejs.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)