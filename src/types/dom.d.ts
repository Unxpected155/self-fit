export {};

declare global {
  interface IdleDeadline {
    readonly didTimeout: boolean;
    timeRemaining(): number;
  }
  type IdleRequestCallback = (deadline: IdleDeadline) => void;

  interface Window {
    requestIdleCallback?: (
      cb: IdleRequestCallback,
      options?: { timeout: number }
    ) => number;
    cancelIdleCallback?: (handle: number) => void;
  }
}
