import { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import type { ThemeName } from '../lib/theme-store';

export function ThemeControls() {
  const { theme, themes, setTheme } = useTheme();
  const [isAutoMode, setIsAutoMode] = useState(false);

  // Random theme functionality
  const handleRandomTheme = () => {
    const availableThemes = themes.filter(t => t !== theme);
    const randomTheme = availableThemes[Math.floor(Math.random() * availableThemes.length)];
    setTheme(randomTheme as ThemeName);
  };

  // Auto-cycle functionality
  useEffect(() => {
    if (!isAutoMode) return;

    const nonSystemThemes = themes.filter(t => t !== 'system');
    let currentIndex = nonSystemThemes.indexOf(theme as string);
    if (currentIndex === -1) currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % nonSystemThemes.length;
      setTheme(nonSystemThemes[currentIndex] as ThemeName);
    }, 2500);

    return () => clearInterval(interval);
  }, [isAutoMode, theme, themes, setTheme]);

  const toggleAutoMode = () => {
    setIsAutoMode(!isAutoMode);
  };

  // Clear storage
  const handleClearStorage = () => {
    localStorage.removeItem('omni-theme-react-demo');
    setTheme('system');
  };

  // Open new tab for cross-tab sync testing
  const handleOpenNewTab = () => {
    window.open(window.location.href, '_blank');
  };

  return (
    <div className="theme-controls">
      <h3>🎛️ Theme Controls</h3>
      
      <div className="controls-grid">
        <button 
          onClick={handleRandomTheme}
          className="btn btn-primary"
        >
          🎲 Random Theme
        </button>
        
        <button 
          onClick={toggleAutoMode}
          className={`btn ${isAutoMode ? 'btn-danger' : 'btn-secondary'}`}
        >
          {isAutoMode ? '⏹️ Stop Auto-Cycle' : '🔄 Auto-Cycle (2.5s)'}
        </button>
        
        <button 
          onClick={handleClearStorage}
          className="btn btn-outline"
        >
          🗑️ Clear Storage
        </button>
        
        <button 
          onClick={handleOpenNewTab}
          className="btn btn-outline"
        >
          🔗 Open New Tab
        </button>
      </div>
      
      {isAutoMode && (
        <div className="auto-mode-indicator">
          <span className="pulse">🔄</span> Auto-cycling themes every 2.5 seconds
        </div>
      )}
    </div>
  );
}