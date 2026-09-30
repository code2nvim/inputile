import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="absolute flex size-full items-center justify-center">
      <button
        type="button"
        className="size-24 rounded-full bg-black text-white"
        onClick={() => setCount((count) => count + 1)}
      >
        {count}
      </button>
    </div>
  );
}

export default App;
