export interface Bindings {
  // loading
  loaded(): Promise<void>;

  // window
  reset(): Promise<void>;
  resize(): Promise<void>;
  poll(): Promise<InputTileEvent[]>;
}

declare global {
  const bindings: Bindings;

  type InputTileEvent =
    | { type: "key"; data: { key: { name: string; hold: boolean } } }
    | { type: "btn"; data: { btn: { name: string; hold: boolean } } }
    | { type: "move"; data: { move: { x: number; y: number } } };
}
