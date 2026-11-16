import { atom, useAtom, useAtomValue } from "jotai";

type Page = "Index" | "Input";

const pageAtom = atom<Page>("Index");

export const usePageValue = () => useAtomValue(pageAtom);

export function PageOptions() {
  const [page, setPage] = useAtom(pageAtom);

  return (
    <nav className="flex w-full justify-between gap-4 p-4 text-2xl">
      <button
        type="button"
        className={`${page}`}
        onClick={() => {
          bindings.resize();
          setPage("Input");
        }}
      >
        ⌨️
      </button>
      <button
        type="button"
        className={`${page}`}
        onClick={() => {
          bindings.reset();
          setPage("Index");
        }}
      >
        🏠
      </button>
    </nav>
  );
}
