import "./style.css";
import { $theme, $resolvedTheme, $systemTheme, setTheme } from "./theme-store";

// FOUC prevention state
let foucPreventionEnabled = localStorage.getItem('disable-fouc-prevention') !== 'true';

// DOM elements
const foucIndicator = document.getElementById("fouc-indicator")!;
const foucStatus = document.getElementById("fouc-status")!;
const status = document.getElementById("status")!;

// Update FOUC indicator
function updateFoucIndicator() {
  if (foucPreventionEnabled) {
    foucIndicator.textContent = "FOUC: PREVENTED";
    foucIndicator.className = "fouc-indicator fouc-prevented";
    foucStatus.textContent = "enabled";
  } else {
    foucIndicator.textContent = "FOUC: ENABLED";
    foucIndicator.className = "fouc-indicator";
    foucStatus.textContent = "disabled";
  }
}

// Update status message
function updateStatus(message: string) {
  status.textContent = message;
}

// Theme listeners
$theme.listen((value) => {
  document.querySelector<HTMLSpanElement>("#current-theme")!.textContent = value;
});

$resolvedTheme.listen((value) => {
  document.querySelector<HTMLSpanElement>("#resolved-theme")!.textContent = value;
});

$systemTheme.listen((value) => {
  document.querySelector<HTMLSpanElement>("#system-theme")!.textContent = value || "unknown";
});

// Event handlers
function toggleFoucPrevention() {
  foucPreventionEnabled = !foucPreventionEnabled;
  
  // Set localStorage flag to control FOUC prevention
  if (foucPreventionEnabled) {
    localStorage.removeItem('disable-fouc-prevention');
  } else {
    localStorage.setItem('disable-fouc-prevention', 'true');
  }
  
  updateFoucIndicator();
  
  if (foucPreventionEnabled) {
    updateStatus("Status: FOUC prevention enabled. Reload to see the difference.");
  } else {
    updateStatus("Status: FOUC prevention disabled. Reload to see the pink/green flash!");
  }
}

function reloadPage() {
  updateStatus("Status: Reloading page...");
  setTimeout(() => {
    location.reload();
  }, 500);
}

function clearStorage() {
  localStorage.removeItem("fouc-demo-theme");
  localStorage.removeItem("disable-fouc-prevention");
  foucPreventionEnabled = true;
  updateFoucIndicator();
  updateStatus("Status: All storage cleared. Reload to see default behavior.");
}

// Theme button handlers
function setLightTheme() {
  setTheme("light");
  updateStatus("Status: Light theme applied");
}

function setDarkTheme() {
  setTheme("dark");
  updateStatus("Status: Dark theme applied");
}

function setSystemTheme() {
  setTheme("system");
  updateStatus("Status: System theme applied");
}

// Event listeners
document.getElementById("toggle-fouc")!.addEventListener("click", toggleFoucPrevention);
document.getElementById("reload-page")!.addEventListener("click", reloadPage);
document.getElementById("clear-storage")!.addEventListener("click", clearStorage);

document.getElementById("set-theme-light")!.addEventListener("click", setLightTheme);
document.getElementById("set-theme-dark")!.addEventListener("click", setDarkTheme);
document.getElementById("set-theme-system")!.addEventListener("click", setSystemTheme);

// Initialize
updateFoucIndicator();
updateStatus("Status: Page loaded with FOUC prevention enabled. Try toggling it off and reloading to see the flash!");
