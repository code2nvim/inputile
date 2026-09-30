export interface Bindings {
  // loading
  loaded(): Promise<void>;

  // window
  reset(): Promise<void>;
}

declare global {
  const bindings: Bindings;
}
