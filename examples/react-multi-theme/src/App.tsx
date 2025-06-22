import { ThemeProvider } from './components/ThemeProvider';
import { ThemeSelector } from './components/ThemeSelector';
import { ThemeDemo } from './components/ThemeDemo';
import { ThemeControls } from './components/ThemeControls';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        {/* Header */}
        <header className="header">
          <div className="container">
            <div className="header-content">
              <div>
                <h1 className="logo">🎨 Omni-Themes</h1>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  React Demo
                </p>
              </div>
              <ThemeSelector />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="main">
          <div className="container">
            {/* Hero Section */}
            <section className="section">
              <h1>Universal Theme Library for React</h1>
              <p>
                Welcome to the Omni-Themes React demo! This demonstrates how to integrate 
                our universal theme library with React applications using custom hooks and components.
              </p>

              <div className="grid">
                <div className="card">
                  <h3>⚛️ React Integration</h3>
                  <p>Custom React hooks and components for seamless theme management.</p>
                </div>
                <div className="card">
                  <h3>🎨 Multiple Themes</h3>
                  <p>Support for custom color themes beyond just light/dark mode.</p>
                </div>
                <div className="card">
                  <h3>⚡ No Flash Loading</h3>
                  <p>Themes apply instantly with no FOUC (Flash of Unstyled Content).</p>
                </div>
                <div className="card">
                  <h3>🔄 Reactive State</h3>
                  <p>Real-time theme updates across all React components.</p>
                </div>
              </div>
            </section>

            {/* Theme Demo Section */}
            <section className="section">
              <ThemeDemo />
            </section>

            {/* Theme Controls Section */}
            <section className="section">
              <ThemeControls />
            </section>

            {/* Features Section */}
            <section className="section">
              <h2>✨ Key Features</h2>
              
              <div className="grid">
                <div className="card">
                  <h3>🪝 React Hooks</h3>
                  <p>
                    Use the <code>useTheme()</code> hook to access theme state and controls 
                    in any React component.
                  </p>
                  <pre><code>{`const { theme, setTheme, resolvedTheme } = useTheme();`}</code></pre>
                </div>

                <div className="card">
                  <h3>🛡️ TypeScript Support</h3>
                  <p>
                    Full TypeScript support with proper type definitions for all theme values.
                  </p>
                  <pre><code>{`type ThemeName = 'light' | 'dark' | 'blue' | 'green' | 'purple' | 'ocean' | 'system';`}</code></pre>
                </div>

                <div className="card">
                  <h3>🔄 Cross-Tab Sync</h3>
                  <p>
                    Theme changes are synchronized across all open tabs automatically 
                    using localStorage events.
                  </p>
                </div>

                <div className="card">
                  <h3>🎛️ System Integration</h3>
                  <p>
                    Automatically detects and follows system dark/light mode preferences 
                    when 'system' theme is selected.
                  </p>
                </div>
              </div>
            </section>

            {/* API Documentation Section */}
            <section className="section">
              <h2>🛠️ API Reference</h2>
              
              <div className="card">
                <h3>Installation</h3>
                <pre><code>npm install @madooei/omni-themes</code></pre>
              </div>

              <div className="card">
                <h3>React Setup</h3>
                <pre><code>{`import { ThemeProvider } from './components/ThemeProvider';
import { useTheme } from './hooks/useTheme';

function App() {
  return (
    <ThemeProvider>
      <YourComponents />
    </ThemeProvider>
  );
}

function YourComponent() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme('dark')}>
        Switch to Dark
      </button>
    </div>
  );
}`}</code></pre>
              </div>

              <div className="card">
                <h3>Theme Store Configuration</h3>
                <pre><code>{`import { createThemeStore } from '@madooei/omni-themes';

export const {
  themes,
  $theme,
  $resolvedTheme,
  $systemTheme,
  setTheme,
  applyThemeScriptString
} = createThemeStore({
  themes: ['system', 'light', 'dark', 'blue', 'green'],
  enableSystem: true,
  enableColorScheme: true,
  dataAttributes: ['data-theme'],
  storageKey: 'my-app-theme'
});`}</code></pre>
              </div>
            </section>

            {/* Footer */}
            <footer style={{ 
              textAlign: 'center', 
              padding: '2rem 0', 
              borderTop: '1px solid var(--border-color)', 
              marginTop: '3rem' 
            }}>
              <p style={{ color: 'var(--text-muted)' }}>
                Built with ❤️ using <strong>@madooei/omni-themes</strong> • 
                <a href="https://github.com/madooei/omni-themes" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </p>
            </footer>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
