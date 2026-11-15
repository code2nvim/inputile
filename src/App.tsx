import { useState } from "react";
import { Input } from "./Input.tsx";
import { PageOptions, usePageValue } from "./Page.tsx";

function App() {
  const page = usePageValue();

  return (
    <div className="absolute inset-0 grid">
      {page === "Index" && <Index />}
      {page === "Input" && <Input />}
      <footer className="absolute bottom-0 flex w-full justify-between bg-linear-to-b to-black p-2">
        <PageOptions />
        <nav className="px-2">
          <button
            type="button"
            className="text-white"
            onClick={() => bindings.reset()}
          >
            Reset
          </button>
        </nav>
      </footer>
    </div>
  );
}

function Index() {
  const [count, setCount] = useState(0);

  return (
    <main className="flex items-center justify-center">
      <button
        type="button"
        className="size-24 rounded-full bg-black text-white"
        onClick={() => {
          bindings.reset();
          setCount((count) => count + 1);
        }}
      >
        {count}
      </button>
    </main>
  );
}

export default App;
