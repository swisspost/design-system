type AddListenerOptions = boolean | AddEventListenerOptions;
type RemoveListenerOptions = boolean | EventListenerOptions;

/**
 * An `EventTarget` whose listeners receive the events of its event map, e.g.
 * `{ 'route-change': RouteChangeEvent }`. Other event types fall back to the
 * native signatures.
 */
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

// The typed signatures are merged in as an interface: overriding
// `addEventListener` doesn't compile, as a listener of one event type isn't
// assignable to the native `EventListener`.
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class TypedEventTarget<M extends Record<keyof M, Event>> extends EventTarget {}
