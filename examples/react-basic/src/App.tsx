import { useStore } from "@nanostores/react";
import { $theme, $resolvedTheme, $systemTheme, setTheme } from "./theme-store";

function App() {
  const theme = useStore($theme);
  const resolvedTheme = useStore($resolvedTheme);
  const systemTheme = useStore($systemTheme);

  return (
    <div>
      <h1>Omni Themes</h1>
      <p>Current theme: {theme}</p>
      <p>Resolved theme: {resolvedTheme}</p>
      <p>System theme: {systemTheme}</p>
      <button onClick={() => setTheme("light")}>Set Light Theme</button>
      <button onClick={() => setTheme("dark")}>Set Dark Theme</button>
      <button onClick={() => setTheme("system")}>Set System Theme</button>
    </div>
  );
}

export default App;
