import { useEffect } from 'react';
import { applyThemeScriptString } from '../lib/theme-store';

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * ThemeProvider component that injects the FOUC prevention script
 * and initializes the theme system for React applications
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    // Inject theme script for FOUC prevention
    const themeScript = document.getElementById('theme-script');
    if (themeScript) {
      themeScript.innerHTML = applyThemeScriptString;
    }
  }, []);

  return <>{children}</>;
}