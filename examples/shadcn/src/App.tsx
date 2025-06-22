import { useEffect } from "react";
import { Header } from "./components/header";
import { applyThemeScriptString } from "./stores/theme-store";

function App() {
  useEffect(() => {
    // Inject theme script for FOUC prevention
    const themeScript = document.getElementById('theme-script');
    if (themeScript) {
      themeScript.innerHTML = applyThemeScriptString;
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <h1 className="text-4xl font-bold p-4">Hello World</h1>
    </div>
  );
}

export default App;
