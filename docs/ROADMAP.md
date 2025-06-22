# Roadmap for Omni-Themes Workspace

This document outlines the roadmap for the Omni-Themes Workspace, detailing its current status, future plans, and key decisions made during development.

## Project Overview

The Omni-Themes Workspace provides a universal theme library that works across all JavaScript frameworks, inspired by `next-themes` but framework-agnostic. It provides seamless theme management with support for multiple custom themes, system preference detection, cross-tab synchronization, and FOUC prevention.

## Current Status

### What's Complete ✅

- **Core Theme Management**: Complete framework-agnostic theme system using nanostores
- **Multi-Framework Support**: Working implementations for React, Astro, Vanilla JS, and Shadcn UI
- **Type Safety**: Full TypeScript interfaces with comprehensive type definitions
- **System Integration**: Automatic system preference detection with `prefers-color-scheme`
- **Cross-Tab Synchronization**: Real-time theme syncing via localStorage events
- **FOUC Prevention**: Inline script generation for immediate theme application
- **Forced Theme Support**: Override capability for page-specific theme requirements
- **Development Tooling**: Complete toolchain (tsup, vitest, ESLint, Prettier)
- **Testing Framework**: Comprehensive test suite covering all core functionality
- **Documentation System**: Complete API documentation and usage examples
- **Example Applications**: Production-ready examples for multiple frameworks

### In Progress 🚧

- **Performance Optimization**: Analyzing CSS variable update performance across themes
- **Additional Framework Examples**: Vue and Svelte integration patterns

### Next Steps

- **Animation Enhancements**: Better transition control and theme change animations
- **Theme Validation**: Runtime theme configuration validation and error handling
- **Custom Theme Scripts**: Advanced theme script customization options

## Project Evolution

### Key Decisions Made

- **Nanostores Foundation**: Chose nanostores for reactive state management across frameworks
- **Framework Agnostic Design**: Built as universal library rather than framework-specific
- **CSS Custom Properties**: Leveraged CSS variables for flexible theme implementation
- **Script Injection Pattern**: Used inline scripts for FOUC prevention over CSS-only solutions
- **TypeScript First**: Built with full type safety and comprehensive interfaces
- **Multiple Theme Support**: Extended beyond light/dark to arbitrary custom themes

### Learnings and Insights

- **Framework Independence**: Universal state management enables seamless cross-framework usage
- **FOUC Complexity**: Theme flashing requires careful script timing and DOM manipulation
- **System Theme Detection**: Browser support varies but media queries provide reliable detection
- **Storage Synchronization**: localStorage events enable elegant cross-tab theme syncing
- **Performance Considerations**: CSS variable updates are efficient but transitions need optimization

### Recent Changes

- Implemented comprehensive theme configuration with themesMap support
- Added forced theme functionality with createForcedThemeScriptString
- Enhanced DOM manipulation utilities with animation control
- Integrated system theme detection with media query listeners
- Added comprehensive TypeScript interfaces and data attribute patterns
- Implemented cross-tab synchronization via storage events

## Technical Architecture

### Core Components

**Theme Store** (`src/store.ts:21-150`)
- Main createThemeStore function with configuration validation
- Nanostores atoms for reactive state management ($theme, $resolvedTheme, $systemTheme)
- Theme resolution logic handling system preferences and custom mappings

**Type Definitions** (`src/types.ts`)
- ThemeStoreConfig interface with comprehensive configuration options
- ThemeStore interface defining public API
- SystemTheme and ThemeName type definitions
- DataAttributePattern for type-safe DOM attribute handling

**DOM Utilities** (`src/util.ts`)
- updateDOM function for theme application to document elements
- getSystemTheme for media query-based system preference detection
- disableAnimation for smooth theme transitions

**Script Generation** (`src/script.ts`)
- createThemeScript for FOUC prevention script generation
- createForcedThemeScriptFactory for page-specific theme forcing
- Vanilla JavaScript code generation for maximum browser compatibility

### Current Capabilities

- **Universal Framework Support**: Works with React, Astro, Vue, Svelte, Vanilla JS
- **Multiple Theme Management**: Arbitrary number of custom themes beyond light/dark
- **System Integration**: Automatic dark/light mode detection and following
- **Cross-Tab Synchronization**: Real-time theme updates across browser tabs
- **FOUC Prevention**: Immediate theme application via inline scripts
- **Forced Themes**: Page-specific theme overrides independent of user preference
- **Animation Control**: Disable transitions during theme changes for better UX
- **Type Safety**: Full TypeScript support with comprehensive interfaces

## Future Directions

### High Priority

1. **Performance Enhancement**
   - Optimize CSS variable update performance for large theme sets
   - Implement debounced theme changes for rapid switching
   - Analyze and improve theme script execution timing

2. **Enhanced Framework Integration**
   - Vue 3 Composition API integration example
   - Svelte stores integration patterns
   - Angular services integration approach

3. **Advanced Theme Features**
   - Theme validation with runtime error handling
   - Theme inheritance and composition patterns
   - Custom theme script generation APIs

### Medium Priority

4. **Developer Experience**
   - Better error messages with troubleshooting guidance
   - Theme debugging tools and development helpers
   - Integration guides for popular component libraries

5. **Animation and Transitions**
   - Customizable theme change animations
   - Better control over transition timing and easing
   - Reduced layout shift during theme changes

6. **Advanced Configuration**
   - Custom storage adapters beyond localStorage
   - Theme persistence strategies (session, cookie, etc.)
   - Server-side rendering optimization

### Low Priority

7. **Extended Features**
   - Theme scheduling (time-based automatic switching)
   - Theme accessibility enhancements
   - Integration with CSS-in-JS libraries

## Success Criteria

- ✅ Framework-agnostic theme management working across all major frameworks
- ✅ Seamless system theme detection and following
- ✅ Cross-tab synchronization with real-time updates
- ✅ FOUC prevention with reliable script injection
- ✅ Multiple custom theme support beyond light/dark
- ✅ Comprehensive TypeScript interfaces and type safety
- ✅ Production-ready examples for React, Astro, Vanilla JS, and Shadcn UI
- ✅ Extensive test coverage for core functionality
- 🚧 Performance benchmarks across different theme configurations
- ⏳ Community adoption and feedback integration

## Getting Involved

The Omni-Themes project welcomes contributions in these areas:

- **Framework Integration**: Examples and patterns for additional frameworks
- **Performance Analysis**: Benchmarking and optimization for theme switching
- **Use Case Examples**: Real-world integration patterns and best practices
- **Documentation**: Tutorials and troubleshooting guides
- **Feature Development**: Implementation of roadmap items
- **Bug Reports**: Framework-specific issues and edge cases

The project maintains focus on universal compatibility and performance, ensuring that new features enhance rather than complicate the core theme management functionality.