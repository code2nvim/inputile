/// <reference lib="deno.desktop"/>
import { serveDir } from "@std/http/file-server";
import { window } from "./runtime/window.ts";

const dev = Deno.args.includes("--runtime");
const port = Deno.env.get("DENO_SERVE_ADDRESS")!.split(":").pop();

if (dev) {
  window.navigate("http://127.0.0.1:5173");
} else {
  Deno.serve((req) => serveDir(req, { fsRoot: "./dist" }));
  window.navigate(`http://127.0.0.1:${port}`);
}
