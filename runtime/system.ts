import { existsSync } from "@std/fs";

function findScreen() {
  const cards = Array.from(Deno.readDirSync("/sys/class/drm"))
    .map((entry) => entry.name)
    .filter((name) => name.startsWith("card"));

  const modes = cards
    .filter((card) => existsSync(`/sys/class/drm/${card}/modes`))
    .map((card) => Deno.readTextFileSync(`/sys/class/drm/${card}/modes`))
    .flatMap((modes) => modes.split("\n"))
    .filter((modes) => modes.length);

  return modes
    .map((mode) => mode.split("x").map(Number))
    .map((mode) => ({ width: mode[0], height: mode[1] }))
    .sort((a, b) => a.width - b.width || a.height - b.height)
    .pop()!;
}

const screen = findScreen();

export { screen };
