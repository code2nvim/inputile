import { useEffect, useState } from "react";

export type KeyboardInput = {
  key: { name: string; hold: boolean };
};

type Keybind = {
  label: string;
  code: string;
  span: number;
};

export function Keyboard({ input }: { input: KeyboardInput[] }) {
  const [keys, setKeys] = useState([] as KeyboardInput[]);

  const active = (code: string) => {
    return keys.some((data) => {
      const name = data.key.name.toUpperCase();
      return name === code;
    });
  };

  useEffect(() => {
    setKeys(input.filter((item) => item.key.hold));
  }, [input]);

  return (
    <section className="flex aspect-15/6 h-full flex-col gap-1 rounded-xl">
      {KEYBOARD.map((row, index) => (
        <div key={index} className="flex flex-1 gap-1">
          {row.map((keybind) => (
            <span
              key={keybind.code}
              style={{ flex: keybind.span }}
              className={`flex items-center justify-center rounded-md border text-xs font-semibold ${
                active(keybind.code)
                  ? "bg-white text-black"
                  : "border-slate-800 bg-slate-900 text-white"
              }`}
            >
              {keybind.label}
            </span>
          ))}
        </div>
      ))}
    </section>
  );
}

const KEYBOARD: Keybind[][] = [
  [
    { label: "Esc", code: "KEY_ESC", span: 1.5 },
    { label: "F1", code: "KEY_F1", span: 1.125 },
    { label: "F2", code: "KEY_F2", span: 1.125 },
    { label: "F3", code: "KEY_F3", span: 1.125 },
    { label: "F4", code: "KEY_F4", span: 1.125 },
    { label: "F5", code: "KEY_F5", span: 1.125 },
    { label: "F6", code: "KEY_F6", span: 1.125 },
    { label: "F7", code: "KEY_F7", span: 1.125 },
    { label: "F8", code: "KEY_F8", span: 1.125 },
    { label: "F9", code: "KEY_F9", span: 1.125 },
    { label: "F10", code: "KEY_F10", span: 1.125 },
    { label: "F11", code: "KEY_F11", span: 1.125 },
    { label: "F12", code: "KEY_F12", span: 1.125 },
  ],
  [
    { label: "`", code: "KEY_GRAVE", span: 1 },
    { label: "1", code: "KEY_1", span: 1 },
    { label: "2", code: "KEY_2", span: 1 },
    { label: "3", code: "KEY_3", span: 1 },
    { label: "4", code: "KEY_4", span: 1 },
    { label: "5", code: "KEY_5", span: 1 },
    { label: "6", code: "KEY_6", span: 1 },
    { label: "7", code: "KEY_7", span: 1 },
    { label: "8", code: "KEY_8", span: 1 },
    { label: "9", code: "KEY_9", span: 1 },
    { label: "0", code: "KEY_0", span: 1 },
    { label: "-", code: "KEY_MINUS", span: 1 },
    { label: "=", code: "KEY_EQUAL", span: 1 },
    { label: "←", code: "KEY_BACKSPACE", span: 2 },
  ],
  [
    { label: "Tab", code: "KEY_TAB", span: 1.5 },
    { label: "Q", code: "KEY_Q", span: 1 },
    { label: "W", code: "KEY_W", span: 1 },
    { label: "E", code: "KEY_E", span: 1 },
    { label: "R", code: "KEY_R", span: 1 },
    { label: "T", code: "KEY_T", span: 1 },
    { label: "Y", code: "KEY_Y", span: 1 },
    { label: "U", code: "KEY_U", span: 1 },
    { label: "I", code: "KEY_I", span: 1 },
    { label: "O", code: "KEY_O", span: 1 },
    { label: "P", code: "KEY_P", span: 1 },
    { label: "[", code: "KEY_LEFTBRACE", span: 1 },
    { label: "]", code: "KEY_RIGHTBRACE", span: 1 },
    { label: "\\", code: "KEY_BACKSLASH", span: 1.5 },
  ],
  [
    { label: "Caps", code: "KEY_CAPSLOCK", span: 1.75 },
    { label: "A", code: "KEY_A", span: 1 },
    { label: "S", code: "KEY_S", span: 1 },
    { label: "D", code: "KEY_D", span: 1 },
    { label: "F", code: "KEY_F", span: 1 },
    { label: "G", code: "KEY_G", span: 1 },
    { label: "H", code: "KEY_H", span: 1 },
    { label: "J", code: "KEY_J", span: 1 },
    { label: "K", code: "KEY_K", span: 1 },
    { label: "L", code: "KEY_L", span: 1 },
    { label: ";", code: "KEY_SEMICOLON", span: 1 },
    { label: "'", code: "KEY_APOSTROPHE", span: 1 },
    { label: "Enter", code: "KEY_ENTER", span: 2.25 },
  ],
  [
    { label: "⇧ Shift", code: "KEY_LEFTSHIFT", span: 2.25 },
    { label: "Z", code: "KEY_Z", span: 1 },
    { label: "X", code: "KEY_X", span: 1 },
    { label: "C", code: "KEY_C", span: 1 },
    { label: "V", code: "KEY_V", span: 1 },
    { label: "B", code: "KEY_B", span: 1 },
    { label: "N", code: "KEY_N", span: 1 },
    { label: "M", code: "KEY_M", span: 1 },
    { label: ",", code: "KEY_COMMA", span: 1 },
    { label: ".", code: "KEY_DOT", span: 1 },
    { label: "/", code: "KEY_SLASH", span: 1 },
    { label: "⇧ Shift", code: "KEY_RIGHTSHIFT", span: 2.75 },
  ],
  [
    { label: "Ctrl", code: "KEY_LEFTCTRL", span: 1.25 },
    { label: "❖ ", code: "KEY_LEFTMETA", span: 1.25 },
    { label: "Alt", code: "KEY_LEFTALT", span: 1.25 },
    { label: "Space", code: "KEY_SPACE", span: 6.25 },
    { label: "Alt", code: "KEY_RIGHTALT", span: 1.25 },
    { label: "❖ ", code: "KEY_RIGHTMETA", span: 1.25 },
    { label: "≣", code: "KEY_COMPOSE", span: 1.25 },
    { label: "Ctrl", code: "KEY_RIGHTCTRL", span: 1.25 },
  ],
];
