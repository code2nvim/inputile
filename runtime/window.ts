import "./loading.ts";
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
  window.show();
});

export { window };
