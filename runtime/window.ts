import "./loading.ts";

import { poll } from "./event.ts";
import { screen } from "./system.ts";

const window = new Deno.BrowserWindow({
  title: "inputile",
  width: screen.width / 2,
  height: screen.height / 2,
  resizable: false,
  alwaysOnTop: true,
  transparent: true,
});

// deno-lint-ignore require-await
window.bind("reset", async () => {
  window.hide();
  window.setSize(screen.width / 2, screen.height / 2);
  window.show();
});

// deno-lint-ignore require-await
window.bind("resize", async () => {
  window.hide();
  window.setSize(screen.width / 1.2, screen.height / 8);
  window.show();
});

// deno-lint-ignore require-await
window.bind("poll", async () => {
  return poll();
});

export { window };
