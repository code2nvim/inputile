import { atom, useAtom, useAtomValue } from "jotai";

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
        className={`${trigger && "z-50"} bg-black text-4xl text-white`}
        onClick={() => {
          setTrigger(!trigger);
        }}
      >
        {trigger
          ? <InputTile input={input} />
          : <text className="text-8xl">🚫</text>}
      </button>
    </main>
  );
}

function InputTile({ input }: { input: InputTileEvent[] }) {
  return (
    <div className="flex items-center justify-center">
      {JSON.stringify(input)}
    </div>
  );
}
