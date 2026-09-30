import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="absolute inset-0 grid">
      <main className="flex items-center justify-center">
        <button
          type="button"
          className="size-24 rounded-full bg-black text-white"
          onClick={() => setCount((count) => count + 1)}
        >
          {count}
        </button>
      </main>
      <footer className="absolute bottom-0 flex w-full justify-end bg-linear-to-b to-black">
        <nav className="px-4 py-2">
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

export default App;
