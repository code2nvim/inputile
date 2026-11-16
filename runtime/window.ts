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
  window.setResizable(false);
  window.show();
});

window.bind("resize", async () => {
  const action = async () => {
    window.setSize(screen.width / 2.75, screen.height / 8);
    await new Promise((_) => setTimeout(_, 50));
    window.setResizable(true);
  };
  /* TODO: failed (1 time) */ await action();
  await action();
});

// deno-lint-ignore require-await
window.bind("poll", async () => {
  return poll();
});

export { window };
