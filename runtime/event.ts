import { TextLineStream } from "@std/streams";

function exit(error: Error) {
  console.error("error:", error);
  Deno.exit(1);
}

async function remove(path: string) {
  return await Deno.remove(path).catch((error) =>
    error instanceof Deno.errors.NotFound ? () => {} : exit(error)
  );
}

const path = "/tmp/inputile.sock";
const input = {
  socket: {
    listener: (await remove(path), Deno.listen({ path, transport: "unix" })),
  },
  event: Promise.withResolvers<InputTileEvent[]>(),
};

(async () => {
  new Deno.Command("inputilevent").spawn();
  for (;;) {
    await input.socket.listener
      .accept()
      .then((conn) => pipe(conn))
      .catch((error) => exit(error));
  }
})();

async function pipe(conn: Deno.UnixConn) {
  await conn.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TextLineStream())
    .pipeTo(
      new WritableStream({
        write: (chunk) => console.log("write: ", write(chunk)),
        abort: (error) => console.error("abort: ", error),
      }),
    )
    .catch((error) => console.error("error:", error));
}

function write(chunk: string) {
  const data = JSON.parse(chunk) as InputTileEvent[];
  input.event.resolve(data);
  return data;
}

export async function poll() {
  const data = await input.event.promise;
  input.event = Promise.withResolvers<InputTileEvent[]>();
  return data;
}
