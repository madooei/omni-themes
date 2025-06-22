import { useTheme } from '../hooks/useTheme';

export function ThemeDemo() {
  const { theme, resolvedTheme, systemTheme, themes } = useTheme();

  return (
    <div className="theme-demo">
      <h2>🎨 Theme Demo</h2>
      
      <div className="theme-info-grid">
        <div className="info-card">
          <h3>Current Theme</h3>
          <code>{theme}</code>
        </div>
        
        <div className="info-card">
          <h3>Resolved Theme</h3>
          <code>{resolvedTheme}</code>
        </div>
        
        <div className="info-card">
          <h3>System Preference</h3>
          <code>{systemTheme || 'unknown'}</code>
        </div>
        
        <div className="info-card">
          <h3>Available Themes</h3>
          <div className="theme-list">
            {themes.map(themeName => (
              <span key={themeName} className="theme-chip">
                {themeName}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="color-demo">
        <h3>Color Swatches</h3>
        <div className="color-grid">
          <div className="color-swatch primary-bg">Primary Background</div>
          <div className="color-swatch secondary-bg">Secondary Background</div>
          <div className="color-swatch accent-bg">Accent Color</div>
          <div className="color-swatch text-primary">Primary Text</div>
        </div>
      </div>
    </div>
  );
}