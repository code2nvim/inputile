import { useEffect, useState } from "react";

export type MouseInput = {
  btn: { name: string; hold: boolean };
};

type MouseButton = {
  label: string;
  code: string;
  pos: "left" | "right" | "middle" | "side";
};

export function Mouse({ input }: { input: MouseInput[] }) {
  const [buttons, setButtons] = useState([] as MouseInput[]);

  const active = (code: string) => {
    return buttons.some((data) => {
      const name = data.btn.name.toUpperCase();
      return name === code;
    });
  };

  useEffect(() => {
    setButtons(input.filter((item) => item.btn.hold));
  }, [input]);

  const button = (bind: MouseButton) => (
    <span
      key={bind.code}
      className={`flex flex-1 items-center justify-center border ${
        bind.pos === "left" && "rounded-tl-full"
      } ${bind.pos === "right" && "rounded-tr-full"} ${
        bind.pos === "middle" && "my-[20%] w-[15%] flex-none rounded-full"
      } ${bind.pos === "side" && "rounded-l-full"} ${
        active(bind.code)
          ? "border-white bg-white"
          : "border-slate-600 bg-slate-800"
      }`}
    />
  );

  return (
    <section className="relative flex aspect-1/2 h-full flex-col gap-1">
      <div className="absolute top-1/3 left-[-10%] flex h-1/3 w-[8%] flex-col gap-1">
        {MOUSE.filter((b) => b.pos === "side").map(button)}
      </div>
      <div className="flex flex-5 gap-1">
        {MOUSE.filter((b) => b.pos !== "side").map(button)}
      </div>
      <div className="flex-6 rounded-b-full border border-slate-600 bg-slate-800">
        <text className="flex size-full justify-center pt-[40%] font-semibold text-white">
          {MOUSE.find((bind) => active(bind.code))?.label ?? ""}
        </text>
      </div>
    </section>
  );
}

const MOUSE: MouseButton[] = [
  { label: "M1", code: "BTN_LEFT", pos: "left" },
  { label: "M3", code: "BTN_MIDDLE", pos: "middle" },
  { label: "M2", code: "BTN_RIGHT", pos: "right" },
  { label: "M5", code: "BTN_EXTRA", pos: "side" },
  { label: "M4", code: "BTN_SIDE", pos: "side" },
];
