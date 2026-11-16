import { useState } from "react";
import { Input } from "./Input.tsx";
import { PageOptions, usePageValue } from "./Page.tsx";

function App() {
  const page = usePageValue();

  return (
    <div className="absolute inset-0 grid">
      {page === "Index" && <Index />}
      {page === "Input" && <Input />}
      <footer className="absolute bottom-0 w-full text-transparent hover:text-white">
        <div className="bg-linear-to-b to-black">
          <PageOptions />
        </div>
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
          setCount((count) => count + 1);
        }}
      >
        {count}
      </button>
    </main>
  );
}

export default App;
