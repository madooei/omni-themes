import "./style.css";
import {
  $theme,
  $resolvedTheme,
  $systemTheme,
  setTheme,
  applyThemeScriptString,
} from "./theme";

document.head.insertAdjacentHTML("beforeend", `<script>${applyThemeScriptString}</script>`);

const app = document.querySelector<HTMLDivElement>("#app");

app!.innerHTML = `
  <h1>Omni Themes</h1>
  <p id="current-theme">Current theme: ${$theme.get()}</p>
  <p id="resolved-theme">Resolved theme: ${$resolvedTheme.get()}</p>
  <p id="system-theme">System theme: ${$systemTheme.get()}</p>
  <button id="set-theme-light">Set Light Theme</button>
  <button id="set-theme-dark">Set Dark Theme</button>
  <button id="set-theme-system">Set System Theme</button>
`;

$theme.listen((value) => {
  document.querySelector<HTMLParagraphElement>(
    "#current-theme"
  )!.textContent = `Current theme: ${value}`;
});

$resolvedTheme.listen((value) => {
  document.querySelector<HTMLParagraphElement>(
    "#resolved-theme"
  )!.textContent = `Resolved theme: ${value}`;
});

$systemTheme.listen((value) => {
  document.querySelector<HTMLParagraphElement>(
    "#system-theme"
  )!.textContent = `System theme: ${value}`;
});

function handleLightThemeClick() {
  setTheme("light");
}

function handleDarkThemeClick() {
  setTheme("dark");
}

function handleSystemThemeClick() {
  setTheme("system");
}

document
  .querySelector<HTMLButtonElement>("#set-theme-light")!
  .addEventListener("click", handleLightThemeClick);

document
  .querySelector<HTMLButtonElement>("#set-theme-dark")!
  .addEventListener("click", handleDarkThemeClick);

document
  .querySelector<HTMLButtonElement>("#set-theme-system")!
  .addEventListener("click", handleSystemThemeClick);
