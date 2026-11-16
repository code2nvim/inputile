import { atom, useAtom, useAtomValue } from "jotai";
import { Keyboard, KeyboardInput } from "./input/Keyboard.tsx";

const inputAtom = atom([] as InputTileEvent[]);
const triggerAtom = atom(false, async (get, set, state) => {
  set(triggerAtom, state);
  while (get(triggerAtom)) {
    set(inputAtom, await bindings.poll());
  }
});

export function Input() {
  const input = useAtomValue(inputAtom);
  const [trigger, setTrigger] = useAtom(triggerAtom);

  return (
    <main className="absolute inset-0 grid">
      <button
        type="button"
        className={`flex size-full items-center justify-center text-white ${
          trigger ? "z-50" : ""
        }`}
        onClick={() => setTrigger(!trigger)}
      >
        {trigger
          ? <InputTile input={input} />
          : <text className="text-4xl">🚫</text>}
      </button>
    </main>
  );
}

function InputTile({ input }: { input: InputTileEvent[] }) {
  const keyEvents = input
    .filter((event) => event.type === "key")
    .map((event) => event.data as KeyboardInput);

  return (
    <div className="flex h-full max-h-full w-full flex-row items-center justify-start p-2">
      <Keyboard input={keyEvents} />
    </div>
  );
}
