import { Build } from '@stencil/core';
import {
  createInertCallable,
  createInertCancelable,
  createInertMutationObserver,
  createInertResizeObserver,
} from './mock';
import { describeContext, describeTarget } from './debug';

type BoundCallback<C, A extends unknown[]> = (this: C, ...args: A) => unknown;

type ListenerOptions = boolean | Omit<AddEventListenerOptions, 'signal'>;

export interface Cancelable {
  cancel(): void;
}

export type Callable<A extends unknown[]> = ((...args: A) => void) & Cancelable;

export type Debounced<A extends unknown[]> = Callable<A>;

export type Throttled<A extends unknown[]> = Callable<A>;

export interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

type ReleaseReason = 'cancelled' | 'completed' | 'disconnected';

export type EffectLifecycleEvent = 'tracked' | ReleaseReason;

export interface EffectManagerOptions {
  debug?: boolean;
}

interface EffectDescriptor {
  teardown(): void;
  describe(): string;
}

export class EffectManager<C extends object> {
  private static lastId = 0;

  private readonly effects = new Map<number, EffectDescriptor>();

  constructor(
    private readonly context: C,
    private readonly options?: EffectManagerOptions,
  ) {}

  public get activeEffects(): number {
    return this.effects.size;
  }

  private get isDebug(): boolean {
    return Build.isDev && this.options?.debug === true;
  }

  public addEventListener<K extends keyof WindowEventMap>(
    target: Window,
    type: K,
    callback: BoundCallback<C, [WindowEventMap[K]]>,
    options?: ListenerOptions,
  ): Cancelable;

  public addEventListener<K extends keyof DocumentEventMap>(
    target: Document,
    type: K,
    callback: BoundCallback<C, [DocumentEventMap[K]]>,
    options?: ListenerOptions,
  ): Cancelable;

  public addEventListener<K extends keyof HTMLElementEventMap>(
    target: HTMLElement,
    type: K,
    callback: BoundCallback<C, [HTMLElementEventMap[K]]>,
    options?: ListenerOptions,
  ): Cancelable;

  public addEventListener<E extends Event = Event>(
    target: EventTarget,
    type: string,
    callback: BoundCallback<C, [E]>,
    options?: ListenerOptions,
  ): Cancelable;

  public addEventListener(
    target: EventTarget,
    type: string,
    callback: BoundCallback<C, Parameters<EventListener>>,
    options?: ListenerOptions,
  ): Cancelable {
    if (Build.isServer) return createInertCancelable();

    const { once = false, ...nativeOptions } =
      typeof options === 'boolean' ? { capture: options } : (options ?? {});

    const removeListener = () => target.removeEventListener(type, listener, nativeOptions);

    const listener: EventListener = (...args) => {
      if (once) {
        this.release(effect, 'completed');
        removeListener();
      }

      callback.apply(this.context, args);
    };

    target.addEventListener(type, listener, nativeOptions);

    const effect = this.track({
      describe: () => `event listener (${type} on ${describeTarget(target)})`,
      teardown: removeListener,
    });

    return this.toCancelable(effect);
  }

  public setTimeout(callback: BoundCallback<C, []>, delay?: number): Cancelable {
    if (Build.isServer) return createInertCancelable();

    const timeout = globalThis.setTimeout(() => {
      this.release(effect, 'completed');
      callback.call(this.context);
    }, delay);

    const effect = this.track({
      describe: () => `timeout (${delay ?? 0}ms)`,
      teardown: () => globalThis.clearTimeout(timeout),
    });

    return this.toCancelable(effect);
  }

  public setInterval(callback: BoundCallback<C, []>, delay?: number): Cancelable {
    if (Build.isServer) return createInertCancelable();

    const interval = globalThis.setInterval(() => callback.call(this.context), delay);

    const effect = this.track({
      describe: () => `interval (${delay ?? 0}ms)`,
      teardown: () => globalThis.clearInterval(interval),
    });

    return this.toCancelable(effect);
  }

  public requestAnimationFrame(
    callback: BoundCallback<C, Parameters<FrameRequestCallback>>,
  ): Cancelable {
    if (Build.isServer || typeof globalThis.requestAnimationFrame !== 'function') {
      return createInertCancelable();
    }

    const id = globalThis.requestAnimationFrame((...args) => {
      this.release(effect, 'completed');
      callback.apply(this.context, args);
    });

    const effect = this.track({
      describe: () => 'animation frame',
      teardown: () => globalThis.cancelAnimationFrame(id),
    });

    return this.toCancelable(effect);
  }

  public debounce<A extends unknown[]>(callback: BoundCallback<C, A>, delay: number): Debounced<A> {
    if (Build.isServer) return createInertCallable<A>();

    let effect: number | null = null;

    const cancel = () => this.release(effect, 'cancelled');

    const debounced = (...args: A) => {
      cancel();

      const timeout = globalThis.setTimeout(() => {
        this.release(effect, 'completed');
        effect = null;
        callback.apply(this.context, args);
      }, delay);

      effect = this.track({
        describe: () => `debounce (${delay}ms)`,
        teardown: () => {
          globalThis.clearTimeout(timeout);
          effect = null;
        },
      });
    };

    return Object.assign(debounced, { cancel });
  }

  public throttle<A extends unknown[]>(
    callback: BoundCallback<C, A>,
    delay: number,
    { leading = true, trailing = true }: ThrottleOptions = {},
  ): Throttled<A> {
    if (Build.isServer) return createInertCallable<A>();

    let effect: number | null = null;
    let pending: A | null = null;

    const queue = () => {
      const timeout = globalThis.setTimeout(() => {
        this.release(effect, 'completed');
        effect = null;

        if (pending !== null) {
          const args = pending;
          pending = null;

          queue();
          callback.apply(this.context, args);
        }
      }, delay);

      effect = this.track({
        describe: () => `throttle (${delay}ms)`,
        teardown: () => {
          globalThis.clearTimeout(timeout);
          effect = null;
          pending = null;
        },
      });
    };

    const cancel = () => this.release(effect, 'cancelled');

    const throttled = (...args: A) => {
      if (effect !== null) {
        if (trailing) pending = args;
        return;
      }

      queue();

      if (leading) callback.apply(this.context, args);
      else if (trailing) pending = args;
    };

    return Object.assign(throttled, { cancel });
  }

  public createResizeObserver(
    callback: BoundCallback<C, Parameters<ResizeObserverCallback>>,
  ): ResizeObserver {
    if (Build.isServer || typeof globalThis.ResizeObserver !== 'function') {
      return createInertResizeObserver();
    }

    const observer = new ResizeObserver((...args) => callback.apply(this.context, args));

    return this.trackObserver(observer, 'resize observer');
  }

  public createMutationObserver(
    callback: BoundCallback<C, Parameters<MutationCallback>>,
  ): MutationObserver {
    if (Build.isServer || typeof globalThis.MutationObserver !== 'function') {
      return createInertMutationObserver();
    }

    const observer = new MutationObserver((...args) => callback.apply(this.context, args));

    return this.trackObserver(observer, 'mutation observer');
  }

  public disconnect(): void {
    const errors: unknown[] = [];

    // Take a snapshot of the IDs, as a live map iterator would also visit any effects registered
    // during teardown.
    const ids = Array.from(this.effects.keys());

    for (const id of ids) {
      try {
        this.release(id, 'disconnected');
      } catch (error) {
        errors.push(error);
      }
    }

    if (errors.length > 0) {
      throw new AggregateError(errors, 'Side effect teardown failed.');
    }
  }

  private track(descriptor: EffectDescriptor): number {
    const id = ++EffectManager.lastId;
    this.effects.set(id, descriptor);
    this.trace(id, descriptor, 'tracked');

    return id;
  }

  private trackObserver<O extends ResizeObserver | MutationObserver>(
    observer: O,
    label: string,
  ): O {
    const nativeObserve = observer.observe.bind(observer);
    const nativeDisconnect = observer.disconnect.bind(observer);

    let effect: number | null = null;

    Object.assign(observer, {
      observe: (...args: Parameters<O['observe']>) => {
        nativeObserve(...args);

        effect ??= this.track({
          describe: () => label,
          teardown: () => {
            effect = null;
            nativeDisconnect();
          },
        });
      },
      disconnect: () => {
        if (effect !== null) this.release(effect, 'cancelled');
        else nativeDisconnect();
      },
    });

    return observer;
  }

  private toCancelable(id: number): Cancelable {
    return {
      cancel: () => this.release(id, 'cancelled'),
    };
  }

  private release(id: number | null, reason: ReleaseReason): void {
    if (id === null) return;

    const descriptor = this.effects.get(id);
    if (!descriptor) return;

    // Delete the descriptor before teardown to prevent an exception from leaving a stale entry.
    this.effects.delete(id);
    this.trace(id, descriptor, reason);
    if (reason !== 'completed') descriptor.teardown();
  }

  private trace(id: number, descriptor: EffectDescriptor, event: EffectLifecycleEvent): void {
    if (!this.isDebug) return;

    console.debug(
      `[EffectManager ${describeContext(this.context)}#${id}] ${event} ${descriptor.describe()}`,
    );
  }
}
