type AddListenerOptions = boolean | AddEventListenerOptions;
type RemoveListenerOptions = boolean | EventListenerOptions;

export interface TypedEventTarget<M extends Record<keyof M, Event>> {
  addEventListener<K extends keyof M & string>(
    type: K,
    listener: (event: M[K]) => void,
    options?: AddListenerOptions,
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options?: AddListenerOptions,
  ): void;

  removeEventListener<K extends keyof M & string>(
    type: K,
    listener: (event: M[K]) => void,
    options?: RemoveListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options?: RemoveListenerOptions,
  ): void;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class TypedEventTarget<M extends Record<keyof M, Event>> extends EventTarget {}
