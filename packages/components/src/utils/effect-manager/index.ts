import { Build } from '@stencil/core';
import { describeContext, describeTarget } from '@/utils/effect-manager/debug';
import {
  createInertCallable,
  createInertCancelable,
  createInertMutationObserver,
  createInertResizeObserver,
} from '@/utils/effect-manager/mock';

export type BoundCallback<C, A extends unknown[]> = (this: C, ...args: A) => unknown;

export interface Cancelable {
  cancel(): void;
}

export type Callable<C, A extends unknown[]> = BoundCallback<C, A> & Cancelable;

/**
 * A function whose invocation is delayed until a certain amount of time has elapsed since the last
 * call.
 */
export type Debounced<C, A extends unknown[]> = Callable<C, A>;

/**
 * A function whose invocation is limited to at most once per a certain time interval.
 */
export type Throttled<C, A extends unknown[]> = Callable<C, A>;

export type ListenerOptions = boolean | Omit<AddEventListenerOptions, 'signal'>;

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
  describe(): string;
  teardown(): void;
}

export class EffectManager<C extends object> {
  /**
   * A counter that provides unique IDs shared by all manager instances, ensuring that effects are
   * uniquely identifiable in debug logs.
   */
  private static lastId = 0;

  private readonly effects = new Map<number, EffectDescriptor>();

  constructor(
    private readonly context: C,
    private readonly options?: EffectManagerOptions,
  ) {}

  /**
   * The number of effects that are currently being tracked by the manager.
   */
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

  /**
   * Adds an event listener to the given target, and tracks it until it is removed.
   *
   * The listener is removed when:
   * - the returned handle is cancelled;
   * - the event fires once and the `once` option is set; or
   * - the manager is disconnected.
   *
   * @param target - The target to listen on.
   * @param type - The event type to listen for.
   * @param callback - The callback to invoke when the event fires, with `this` bound to the
   * manager's context.
   * @param options - The native listener options, or a boolean indicating whether to use `capture`.
   * `signal` is not supported.
   * @returns A handle to remove the listener.
   */
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

  /**
   * Schedules a callback to be invoked after the given delay.
   *
   * The timeout is tracked until it fires, is cancelled, or the manager is disconnected.
   *
   * @param callback - The callback to invoke when the timeout fires, with `this` bound to the
   * manager's context.
   * @param delay - The delay in milliseconds.
   * @returns A handle to clear the timeout before it fires.
   */
  public setTimeout(callback: BoundCallback<C, []>, delay: number): Cancelable {
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

  /**
   * Schedules a callback to be invoked repeatedly at the given interval.
   *
   * An interval never completes on its own, and is tracked until it is cancelled or the manager is
   * disconnected.
   *
   * @param callback - The callback to invoke when the interval fires, with `this` bound to the
   * manager's context.
   * @param delay - The interval in milliseconds.
   * @returns A handle to clear the interval.
   */
  public setInterval(callback: BoundCallback<C, []>, delay?: number): Cancelable {
    if (Build.isServer) return createInertCancelable();

    const interval = globalThis.setInterval(() => callback.call(this.context), delay);

    const effect = this.track({
      describe: () => `interval (${delay ?? 0}ms)`,
      teardown: () => globalThis.clearInterval(interval),
    });

    return this.toCancelable(effect);
  }

  /**
   * Schedules a callback to be invoked on the next animation frame.
   *
   * The frame request is tracked until it fires, is cancelled, or the manager is disconnected.
   *
   * @param callback - The callback to invoke when the frame fires, with `this` bound to the
   * manager's context.
   * @returns A handle to cancel the frame request before it fires.
   */
  public requestAnimationFrame(
    callback: BoundCallback<C, Parameters<FrameRequestCallback>>,
  ): Cancelable {
    if (Build.isServer) return createInertCancelable();

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

  /**
   * Wraps a callback in a debounced function that delays its invocation until after the given delay
   * has elapsed since the last time it was called.
   *
   * @param callback - The callback to invoke when the debounced function is called, with `this`
   * bound to the manager's context.
   * @param delay - The delay in milliseconds.
   * @returns The debounced function, with a `cancel()` method to cancel a pending invocation.
   */
  public debounce<A extends unknown[]>(
    callback: BoundCallback<C, A>,
    delay: number,
  ): Debounced<C, A> {
    if (Build.isServer) return createInertCallable<C, A>();

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

  /**
   * Wraps a function in a throttled function whose invocation is limited to at most once per the
   * given interval.
   *
   * @param callback - The callback to invoke when the throttled function is called, with `this`
   * bound to the manager's context.
   * @param delay - The interval in milliseconds.
   * @param options
   * @returns The throttled function, with a `cancel()` method to cancel a pending invocation and
   * reset the throttle window.
   */
  public throttle<A extends unknown[]>(
    callback: BoundCallback<C, A>,
    delay: number,
    { leading = true, trailing = true }: ThrottleOptions = {},
  ): Throttled<C, A> {
    if (Build.isServer) return createInertCallable<C, A>();

    let effect: number | null = null;
    let pending: A | null = null;

    // todo: if both trailing and leading are set, the callback should only be invoked on the trailing edge if is called more than once!

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

  /**
   * Creates a `ResizeObserver` whose lifetime is managed by the manager.
   *
   * The observer is tracked as soon as it is used, i.e. on the first `observe`. It stops being
   * tracked when `disconnect` is called, or when the manager is disconnected.
   *
   * @param callback - The callback to invoke when the observer fires, with `this` bound to the
   * manager's context.
   * @returns A native `ResizeObserver` instance, or a stub during server-side rendering or when the
   * API isn't available.
   */
  public createResizeObserver(
    callback: BoundCallback<C, Parameters<ResizeObserverCallback>>,
  ): ResizeObserver {
    if (Build.isServer || typeof globalThis.ResizeObserver !== 'function') {
      return createInertResizeObserver();
    }

    const observer = new ResizeObserver((...args) => callback.apply(this.context, args));

    return this.trackObserver(observer, 'resize observer');
  }

  /**
   * Creates a `MutationObserver` whose lifetime is managed by the manager.
   *
   * The observer is tracked as soon as it is used, i.e. on the first `observe`. It stops being
   * tracked when `disconnect` is called, or when the manager is disconnected.
   *
   * @param callback - The callback to invoke when the observer fires, with `this` bound to the
   * manager's context.
   * @returns A native `MutationObserver` instance, or a stub during server-side rendering or when
   * the API isn't available.
   */
  public createMutationObserver(
    callback: BoundCallback<C, Parameters<MutationCallback>>,
  ): MutationObserver {
    if (Build.isServer || typeof globalThis.MutationObserver !== 'function') {
      return createInertMutationObserver();
    }

    const observer = new MutationObserver((...args) => callback.apply(this.context, args));

    return this.trackObserver(observer, 'mutation observer');
  }

  /**
   * Tears down all effects that are currently being tracked by the manager.
   *
   * This is typically called in the `disconnectedCallback` of a component. The manager remains
   * usable afterwards, so effects can be tracked again when the component is reconnected.
   *
   * @throws {AggregateError} - If one or more effects throw an error during teardown.
   */
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

  /**
   * Registers an effect to be tracked by the manager.
   *
   * @param descriptor - The descriptor of the effect to track.
   * @returns The ID of the tracked effect.
   */
  private track(descriptor: EffectDescriptor): number {
    const id = ++EffectManager.lastId;
    this.effects.set(id, descriptor);
    this.trace(id, descriptor, 'tracked');

    return id;
  }

  /**
   * Wraps an observer in a proxy effect that is registered to be tracked by the manager.
   *
   * @param observer - The observer to wrap.
   * @param label - A human-readable label for the observer, used in debug logs.
   * @returns The wrapped observer.
   */
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

        // Register an effect as soon as the observer is used
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
        // If no effect was registered, the observer was never used, and no additional teardown is
        // necessary.
        else nativeDisconnect();
      },
    });

    return observer;
  }

  /**
   * Wraps an effect in a `Cancelable` that cancels the effect when invoked.
   *
   * @param id - The ID of the effect to wrap.
   */
  private toCancelable(id: number): Cancelable {
    return {
      cancel: () => this.release(id, 'cancelled'),
    };
  }

  /**
   * Stops tracking an effect, removing it from the manager. The effect is torn down, unless it
   * already completed on its own.
   *
   * Releasing an already released effect is a no-op.
   *
   * @param id - The ID of the effect to release.
   * @param reason - The reason the effect is being released.
   */
  private release(id: number | null, reason: ReleaseReason): void {
    // Better safe than sorry...
    if (id === null) return;

    const descriptor = this.effects.get(id);
    if (!descriptor) return;

    // Delete the descriptor before teardown to prevent an exception from leaving a stale entry.
    this.effects.delete(id);
    this.trace(id, descriptor, reason);
    if (reason !== 'completed') descriptor.teardown();
  }

  /**
   * When debugging is enabled, logs a debug message describing the lifecycle event of an effect.
   */
  private trace(id: number, descriptor: EffectDescriptor, event: EffectLifecycleEvent): void {
    if (!this.isDebug) return;

    console.debug(
      `[EffectManager ${describeContext(this.context)}] ${event} ${descriptor.describe()} (#${id})`,
    );
  }
}
