import "./style.css";
import { $counter } from "./store";

const app = document.querySelector<HTMLDivElement>("#app");

app!.innerHTML = `
  <h1>Nanostores Vanilla</h1>
  <p id="counter-listening">Listening to Counter: ${$counter.get()}</p>
  <p id="counter-subscribed">Subscribed to Counter: ${$counter.get()}</p>
  <button id="increment">Increment</button>
  <button id="reset">Reset</button>
`;

$counter.listen((value) => {
  document.querySelector<HTMLParagraphElement>(
    "#counter-listening"
  )!.textContent = `Listening to Counter: ${value}`;
});

$counter.subscribe((value) => {
  document.querySelector<HTMLParagraphElement>(
    "#counter-subscribed"
  )!.textContent = `Subscribed to Counter: ${value}`;
});

document
  .querySelector<HTMLButtonElement>("#increment")!
  .addEventListener("click", () => {
    $counter.set($counter.get() + 1);
  });

document
  .querySelector<HTMLButtonElement>("#reset")!
  .addEventListener("click", () => {
    $counter.set(0);
  });
