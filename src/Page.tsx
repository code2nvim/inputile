import { atom, useAtom, useAtomValue } from "jotai";

type Page = "Index" | "Input";

const pageAtom = atom<Page>("Index");

export const usePageValue = () => useAtomValue(pageAtom);

export function PageOptions() {
  const [page, setPage] = useAtom(pageAtom);

  return (
    <nav className="flex gap-2 px-2 text-white">
      <button
        type="button"
        className={`${page}`}
        onClick={() => {
          bindings.reset();
          setPage("Index");
        }}
      >
        Index
      </button>
      <button
        type="button"
        className={`${page}`}
        onClick={() => {
          bindings.resize();
          setPage("Input");
        }}
      >
        Input
      </button>
    </nav>
  );
}
