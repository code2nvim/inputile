/// <reference lib="deno.desktop"/>
import { serveDir } from "@std/http/file-server";
import { window } from "./runtime/window.ts";

const dev = Deno.args.includes("--runtime");
const port = Deno.env.get("DENO_SERVE_ADDRESS")!.split(":").pop();
const vite = new Deno.Command("deno", {
  args: ["run", "-A", "--node-modules-dir", "npm:vite"],
});

if (dev) {
  vite.spawn();
} else {
  Deno.serve((req) => serveDir(req, { fsRoot: "./dist" }));
}

window.navigate(`http://127.0.0.1:${port}`);
