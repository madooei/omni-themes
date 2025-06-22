import { useTheme } from '../hooks/useTheme';
import type { ThemeName } from '../lib/theme-store';

export function ThemeSelector() {
  const { theme, themes, setTheme } = useTheme();

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = event.target.value as ThemeName;
    setTheme(newTheme);
  };

  return (
    <div className="theme-selector">
      <label htmlFor="theme-select" className="theme-label">
        Choose Theme:
      </label>
      <select
        id="theme-select"
        value={theme}
        onChange={handleThemeChange}
        className="theme-select"
      >
        {themes.map((themeName) => (
          <option key={themeName} value={themeName}>
            {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}