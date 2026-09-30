// TODO: verify necessity

const loading = new Deno.BrowserWindow({
  title: "loading",
});

// deno-lint-ignore require-await
loading.bind("loaded", async () => {
  loading.close();
});
