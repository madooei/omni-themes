# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This workspace contains a universal theme library that works across all JavaScript frameworks, inspired by `next-themes` but framework-agnostic. The library provides seamless theme management with support for multiple custom themes, system preference detection, and cross-tab synchronization.

**CURRENT STATUS**: ✅ **Production Ready** - The `@madooei/omni-themes` package is complete with comprehensive examples and documentation.

## Package Features

The omni-themes library provides these core features:

- ✅ Framework-agnostic theme management
- ✅ Multiple theme support (not just light/dark)
- ✅ System theme detection with `prefers-color-scheme`
- ✅ Cross-tab synchronization via localStorage
- ✅ FOUC prevention with inline scripts
- ✅ Forced theme capability for specific pages
- ✅ TypeScript support with full type definitions
- ✅ ESM and CJS output formats

### Key Architecture Components:

1. **State Management**: Uses nanostores atoms for reactive state
2. **DOM Updates**: Manages classes, data attributes, and color-scheme
3. **FOUC Prevention**: Inline scripts for immediate theme application
4. **System Integration**: Media query detection and localStorage persistence
5. **Forced Themes**: Override mechanism for specific pages
6. **Animation Control**: Disable transitions during theme changes

### Dependencies:

- `nanostores@^0.11.3` (for reactive state management)

## Workspace Structure

```
omni-theme-workspace/
├── packages/
│   └── omni-themes/                      # ✅ MAIN PACKAGE - Production ready
│       ├── src/                          # Source code
│       │   ├── types.ts                  # TypeScript definitions
│       │   ├── store.ts                  # Main theme store (280 lines)
│       │   ├── util.ts                   # DOM utilities (120 lines)
│       │   ├── script.ts                 # FOUC prevention (208 lines)
│       │   └── index.ts                  # Public API exports
│       ├── dist/                         # Built package (ESM + CJS + types)
│       ├── tests/                        # Test suite (5 tests passing)
│       └── package.json                  # @madooei/omni-themes v0.1.0
├── examples/
│   ├── astro/                           # ✅ COMPLETE - Full Astro demo with 5 pages
│   ├── react/                           # ✅ COMPLETE - React hooks integration
│   ├── vanilla/                         # ✅ COMPLETE - Framework-free JS
│   └── shadcn/                          # ✅ COMPLETE - Shadcn UI integration
├── docs/
│   └── index.md                         # ✅ COMPLETE - Comprehensive user docs
└── README.md                            # ✅ COMPLETE - Repository overview
```

## Implementation Status

### ✅ Core Package (COMPLETED)

**Location**: `packages/omni-themes/`

- ✅ Complete TypeScript implementation
- ✅ Build system with tsup (ESM/CJS output)
- ✅ Comprehensive test suite (5/5 passing)
- ✅ ESLint and Prettier configuration
- ✅ External nanostores dependency properly configured

### ✅ Examples (ALL COMPLETED)

#### 1. Astro Example (`examples/astro/`)

- ✅ **5 demo pages** showcasing all features
- ✅ **SSR compatible** with FOUC prevention
- ✅ **Multiple themes**: light, dark, blue, green, purple, ocean
- ✅ **System integration**: Follows OS dark/light mode
- ✅ **Cross-tab sync**: Theme changes synchronized
- ✅ **Forced themes**: Page-specific theme locking

**Demo Pages:**

- `/` - Feature overview and installation guide
- `/basic` - Simple light/dark + system detection
- `/selector` - Interactive theme picker with 5 themes
- `/forced` - Forced purple theme demo
- `/multi-theme` - Advanced showcase with auto-cycling

#### 2. React Example (`examples/react/`)

- ✅ **Custom React hooks**: `useTheme()` for reactive state
- ✅ **Component architecture**: Reusable theme components
- ✅ **TypeScript integration**: Full type safety
- ✅ **Interactive controls**: Theme selector, random theme, auto-cycling
- ✅ **FOUC prevention**: ThemeProvider component
- ✅ **Real-time updates**: All components reactive to theme changes

#### 3. Vanilla JavaScript Example (`examples/vanilla/`)

- ✅ **Pure JavaScript**: No framework dependencies
- ✅ **Comprehensive demo**: All theme library features
- ✅ **Interactive UI**: Theme monitoring and controls
- ✅ **6 custom themes**: Including light, dark, blue, green, purple, ocean
- ✅ **Real-time monitoring**: Live display of theme state and CSS variables
- ✅ **Cross-tab testing**: New tab functionality for sync testing

#### 4. Shadcn UI Example (`examples/shadcn/`)

- ✅ **Shadcn UI integration**: Uses primitive components
- ✅ **Elegant theme toggle**: Animated Sun/Moon/Computer icons
- ✅ **Tailwind CSS 4**: Modern styling with custom variants
- ✅ **Migration example**: Shows how to migrate from custom theme systems
- ✅ **Accessible UI**: Full keyboard navigation and screen reader support

### ✅ Documentation (COMPLETED)

- ✅ **User documentation** (`docs/index.md`): Comprehensive usage guide
- ✅ **Package README** (`packages/omni-themes/README.md`): Developer guide
- ✅ **Repository README** (`README.md`): Project overview
- ✅ **Example READMEs**: Detailed guides for each framework example

## Package API

### Core Usage

```typescript
import { createThemeStore } from "@madooei/omni-themes";

export const {
  themes, // Array of available themes
  $theme, // Current theme atom
  $resolvedTheme, // Resolved theme atom (handles 'system')
  $systemTheme, // System preference atom
  setTheme, // Function to change theme
  applyThemeScriptString, // Script for FOUC prevention
  createForcedThemeScriptString, // Script for forced themes
} = createThemeStore({
  themes: ["system", "light", "dark", "blue", "green"],
  enableSystem: true,
  enableColorScheme: true,
  dataAttributes: ["data-theme"],
});
```

### Configuration Options

```typescript
interface ThemeStoreConfig {
  themes?: string[]; // Available theme names
  defaultTheme?: string; // Default theme
  enableSystem?: boolean; // Enable system preference detection
  enableColorScheme?: boolean; // Update browser color-scheme
  updateClassAttribute?: boolean; // Add classes to documentElement
  dataAttributes?: string[]; // Data attributes for themes
  disableTransitionOnChange?: boolean; // Disable CSS transitions
  themeStorageKey?: string; // localStorage key
  debug?: boolean; // Enable debug logging
}
```

## Build System

### Package Build

- **tsup** for bundling (ESM + CJS output)
- **TypeScript** for type definitions
- **Vitest** for testing
- **ESLint + Prettier** for code quality

### Example Builds

- **Astro**: Standard Astro build with SSR support
- **React**: Vite + React with TypeScript
- **Vanilla**: Vite + TypeScript for modern JS
- **Shadcn**: Vite + React + Tailwind CSS 4

## Development Workflow

### Package Development

```bash
# Build the package
cd packages/omni-themes
npm run build

# Run tests
npm test

# Development mode
npm run dev

# Validate (types, lint, format, tests)
npm run validate
```

### Example Development

```bash
# Astro example
cd examples/astro
npm run dev    # http://localhost:4321

# React example
cd examples/react
npm run dev    # http://localhost:5173

# Vanilla example
cd examples/vanilla
npm run dev    # http://localhost:5173

# Shadcn example
cd examples/shadcn
npm run dev    # http://localhost:5173
```

## Framework Integration Patterns

### React Integration

- Custom `useTheme()` hook for reactive state
- ThemeProvider component for FOUC prevention
- Component-based architecture with reusable theme components

### Astro Integration

- Server-side theme script injection with `set:html`
- Multiple page examples with different theme configurations
- SSR-compatible implementation

### Vanilla JavaScript Integration

- Direct atom subscriptions with manual cleanup
- DOM manipulation for UI updates
- Framework-free implementation patterns

### Shadcn UI Integration

- Class-based theme switching compatible with Tailwind
- Elegant dropdown theme toggle with animated icons
- Migration example from custom theme systems

## Technical Considerations

### State Management

- Uses nanostores atoms for reactive state management
- Automatic subscription cleanup in React hooks
- Cross-framework compatibility through consistent API

### FOUC Prevention

- Inline script generation for immediate theme application
- Framework-specific injection methods
- SSR and client-side rendering support

### Browser Compatibility

- Modern JavaScript with proper polyfill considerations
- CSS custom properties for theme variables
- Media query support for system preference detection

## Success Criteria - All Achieved ✅

- ✅ Framework-agnostic API working across all examples
- ✅ Same functionality as original implementation
- ✅ Works in React, Astro, Vanilla JS, and Shadcn UI
- ✅ Maintains all current features (themes, system detection, FOUC prevention)
- ✅ Comprehensive test coverage (5/5 tests passing)
- ✅ Complete documentation and examples
- ✅ Production-ready package with proper build system

## Repository Ready for Production

The omni-themes package is complete and ready for:

- ✅ NPM publication
- ✅ Production use in applications
- ✅ Integration with any JavaScript framework
- ✅ Deployment and distribution

All examples demonstrate real-world usage patterns and the package provides a robust, well-tested solution for universal theme management across JavaScript frameworks.
