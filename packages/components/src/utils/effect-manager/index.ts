import { Build } from '@stencil/core';
import { describeContext, describeTarget } from './debug';
import {
  createInertHandle,
  createInertRateLimited,
  createInertMutationObserver,
  createInertResizeObserver,
} from './inert';

/**
 * A callback that is invoked with `this` bound to the manager's context.
 *
 * @typeParam C - The type of the manager's context.
 * @typeParam A - The type of the arguments the callback is invoked with.
 */
export type BoundCallback<C, A extends unknown[]> = (this: C, ...args: A) => unknown;

/**
 * The options accepted by {@link EffectManager.addEventListener}.
 *
 * The `signal` option is not supported, as the lifetime of the listener is controlled by the
 * manager.
 */
export type ListenerOptions = boolean | Omit<AddEventListenerOptions, 'signal'>;

/**
 * A function that limits how often its callback is invoked by delaying or dropping invocations.
 *
 * @typeParam A - The type of the arguments the function is called with.
 */
export type RateLimited<A extends unknown[]> = ((...args: A) => void) & {
  /**
   * Cancels the pending invocation, if any, and resets the rate limit.
   */
  cancel(): void;
};

/**
 * A function that delays invoking its callback until a given delay has elapsed since it was last
 * called.
 *
 * @typeParam A - The type of the arguments the function is called with.
 *
 * @see {@link EffectManager.debounce}
 */
export type Debounced<A extends unknown[]> = RateLimited<A>;

/**
 * A function that invokes its callback at most once per given interval.
 *
 * @typeParam A - The type of the arguments the function is called with.
 *
 * @see {@link EffectManager.throttle}
 */
export type Throttled<A extends unknown[]> = RateLimited<A>;

/**
 * Options for configuring the behaviour of a throttled function.
 *
 * @see {@link EffectManager.throttle}
 */
export interface ThrottleOptions {
  /**
   * Whether the callback is invoked immediately on the leading edge of the throttle interval, i.e.
   * on the first call after the interval has elapsed. Defaults to `true`.
   */
  leading?: boolean;

  /**
   * Whether the callback is invoked with the arguments of the latest call on the trailing edge of
   * the throttle interval, i.e. when the interval elapses. Defaults to `true`.
   */
  trailing?: boolean;
}

/**
 * The reason why an effect stops being tracked:
 *
 * - `completed`: it completed on its own.
 * - `disposed`: it was torn down before it completed on its own or the manager was disconnected.
 * - `disconnected`: it was torn down by {@link EffectManager.disconnect}.
 */
type ReleaseReason = 'completed' | 'disposed' | 'disconnected';

/**
 * An event in the lifecycle of an effect, as reported in debug logs.
 */
type EffectLifecycleEvent = 'tracked' | ReleaseReason;

/**
 * A handle to a tracked effect, allowing the effect to be torn down before it completes on its own
 * or the manager is disconnected.
 */
export interface EffectHandle {
  /**
   * Tears down the effect and stops tracking it.
   *
   * Calling `dispose()` after the effect is no longer tracked is a no-op.
   */
  dispose(): void;
}

/**
 * Options for configuring the behaviour of an {@link EffectManager}.
 */
export interface EffectManagerOptions {
  /**
   * Whether to log the lifecycle events of every effect to the console. Only applies in development
   * builds. Defaults to `false`.
   */
  debug?: boolean;
}

/**
 * The internal representation of a tracked effect.
 */
interface EffectDescriptor {
  /**
   * Returns a human-readable description of the effect, used in debug logs.
   */
  describe(): string;

  /**
   * Undoes the effect (e.g. removes the listener or clears the timeout).
   */
  teardown(): void;
}

/**
 * Manages the lifecycle of side effects, such as event listeners, timers, and observers. It tracks
 * them until they complete on their own, and tears them down when they are disposed of or the
 * manager is disconnected, thereby preventing memory leaks and unwanted behaviour.
 *
 * All callbacks are invoked with `this` bound to the manager's context, so they can be passed as
 * plain functions without binding them first.
 *
 * During server-side rendering, or when a required browser API is unavailable, no effect is
 * created. Instead, an inert substitute is returned, enabling the API to be used safely without
 * checking the environment.
 *
 * ```ts
 * @Component({ tag: 'post-example' })
 * export class PostExample {
 *   @Element() host: HTMLPostExampleElement;
 *
 *   private readonly effects = new EffectManager(this);
 *
 *   // Look ma, no `.bind(this)`!
 *   private readonly throttledAction = this.effects.throttle(this.action, 100);
 *
 *   // Look ma, no `if (!Build.isServer)`, no `if (globalThis.ResizeObserver)`!
 *   private readonly resizeObserver = this.effects.createResizeObserver(
 *     this.effects.throttle(this.measure, 100),
 *   );
 *
 *   connectedCallback() {
 *     this.effects.addEventListener(window, 'keydown', this.throttledAction);
 *     this.resizeObserver.observe(this.host);
 *   }
 *
 *   disconnectedCallback() {
 *     // Look ma, no manual teardown!
 *     this.effects.disconnect();
 *   }
 *
 *   private action(event: KeyboardEvent) {
 *     // ...
 *   }
 *
 *   private measure() {
 *     // ...
 *   }
 * }
 * ```
 *
 * @typeParam C - The type of the manager's context.
 */
export class EffectManager<C extends object> {
  /**
   * The ID of the most recently tracked effect. It is shared by all manager instances, so that
   * effects are uniquely identifiable in debug logs.
   */
  private static lastId = 0;

  /**
   * The effects that are currently tracked, indexed by ID.
   */
  private readonly effects = new Map<number, EffectDescriptor>();

  /**
   * @param context - The object that owns the effects (usually a component), to which `this` is
   * bound in every callback.
   * @param options - The options for configuring the manager.
   */
  constructor(
    private readonly context: C,
    private readonly options?: EffectManagerOptions,
  ) {}

  /**
   * The number of effects that are currently tracked by the manager.
   */
  public get effectCount(): number {
    return this.effects.size;
  }

  /**
   * Whether lifecycle events should be logged.
   */
  private get isDebug(): boolean {
    return Build.isDev && this.options?.debug === true;
  }

  /**
   * Adds an event listener to the given target.
   *
   * The listener is tracked until:
   * - it completes, i.e. the `once` option is set and the event fires;
   * - it is disposed of through the returned handle; or
   * - the manager is disconnected.
   *
   * @param target - The target to listen on.
   * @param type - The event type to listen for.
   * @param callback - The callback to invoke when the event fires, with `this` bound to the
   * manager's context.
   * @param options - The native listener options, or a boolean indicating whether to use `capture`.
   * The `signal` option is not supported.
   * @returns A handle to dispose of the listener, or an inert one during server-side rendering.
   */
  public addEventListener<K extends keyof WindowEventMap>(
    target: Window,
    type: K,
    callback: BoundCallback<C, [WindowEventMap[K]]>,
    options?: ListenerOptions,
  ): EffectHandle;

  /**
   * Adds an event listener to the given target.
   *
   * The listener is tracked until:
   * - it completes, i.e. the `once` option is set and the event fires;
   * - it is disposed of through the returned handle; or
   * - the manager is disconnected.
   *
   * @param target - The target to listen on.
   * @param type - The event type to listen for.
   * @param callback - The callback to invoke when the event fires, with `this` bound to the
   * manager's context.
   * @param options - The native listener options, or a boolean indicating whether to use `capture`.
   * The `signal` option is not supported.
   * @returns A handle to dispose of the listener, or an inert one during server-side rendering.
   */
  public addEventListener<K extends keyof DocumentEventMap>(
    target: Document,
    type: K,
    callback: BoundCallback<C, [DocumentEventMap[K]]>,
    options?: ListenerOptions,
  ): EffectHandle;

  /**
   * Adds an event listener to the given target.
   *
   * The listener is tracked until:
   * - it completes, i.e. the `once` option is set and the event fires;
   * - it is disposed of through the returned handle; or
   * - the manager is disconnected.
   *
   * @param target - The target to listen on.
   * @param type - The event type to listen for.
   * @param callback - The callback to invoke when the event fires, with `this` bound to the
   * manager's context.
   * @param options - The native listener options, or a boolean indicating whether to use `capture`.
   * The `signal` option is not supported.
   * @returns A handle to dispose of the listener, or an inert one during server-side rendering.
   */
  public addEventListener<K extends keyof HTMLElementEventMap>(
    target: HTMLElement,
    type: K,
    callback: BoundCallback<C, [HTMLElementEventMap[K]]>,
    options?: ListenerOptions,
  ): EffectHandle;

  /**
   * Adds an event listener to the given target.
   *
   * The listener is tracked until:
   * - it completes, i.e. the `once` option is set and the event fires;
   * - it is disposed of through the returned handle; or
   * - the manager is disconnected.
   *
   * @param target - The target to listen on.
   * @param type - The event type to listen for.
   * @param callback - The callback to invoke when the event fires, with `this` bound to the
   * manager's context.
   * @param options - The native listener options, or a boolean indicating whether to use `capture`.
   * The `signal` option is not supported.
   * @returns A handle to dispose of the listener.
   */
  public addEventListener<E extends Event = Event>(
    target: EventTarget,
    type: string,
    callback: BoundCallback<C, [E]>,
    options?: ListenerOptions,
  ): EffectHandle;

  public addEventListener(
    target: EventTarget,
    type: string,
    callback: BoundCallback<C, Parameters<EventListener>>,
    options?: ListenerOptions,
  ): EffectHandle {
    if (Build.isServer) return createInertHandle();

    const { once = false, ...nativeOptions } =
      typeof options === 'boolean' ? { capture: options } : (options ?? {});

    const removeListener = () => target.removeEventListener(type, listener, nativeOptions);

    const listener: EventListener = (...args) => {
      // The native `once` option is handled manually, so that the effect is released as completed
      // and the listener removed when it fires.
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

    return this.toHandle(effect);
  }

  /**
   * Schedules a callback to be invoked once after the given delay.
   *
   * The timeout is tracked until:
   * - it completes, i.e. it fires;
   * - it is disposed of through the returned handle; or
   * - the manager is disconnected.
   *
   * @param callback - The callback to invoke when the timeout fires, with `this` bound to the
   * manager's context.
   * @param delay - The delay in milliseconds.
   * @returns A handle to dispose of the timeout before it fires.
   */
  public setTimeout(callback: BoundCallback<C, []>, delay: number): EffectHandle {
    if (Build.isServer) return createInertHandle();

    const timeout = globalThis.setTimeout(() => {
      this.release(effect, 'completed');
      callback.call(this.context);
    }, delay);

    const effect = this.track({
      describe: () => `timeout (${delay}ms)`,
      teardown: () => globalThis.clearTimeout(timeout),
    });

    return this.toHandle(effect);
  }

  /**
   * Schedules a callback to be invoked repeatedly at the given interval.
   *
   * An interval never completes on its own, and is tracked until:
   * - it is disposed of through the returned handle; or
   * - the manager is disconnected.
   *
   * @param callback - The callback to invoke each time the interval fires, with `this` bound to the
   * manager's context.
   * @param interval - The interval in milliseconds.
   * @returns A handle to dispose of the interval.
   */
  public setInterval(callback: BoundCallback<C, []>, interval: number): EffectHandle {
    if (Build.isServer) return createInertHandle();

    const id = globalThis.setInterval(() => callback.call(this.context), interval);

    const effect = this.track({
      describe: () => `interval (${interval}ms)`,
      teardown: () => globalThis.clearInterval(id),
    });

    return this.toHandle(effect);
  }

  /**
   * Schedules a callback to be invoked before the next repaint.
   *
   * The animation frame request is tracked until:
   * - it completes, i.e. it fires;
   * - it is disposed of through the returned handle; or
   * - the manager is disconnected.
   *
   * @param callback - The callback to invoke when the animation frame fires, with `this` bound to
   * the manager's context.
   * @returns A handle to dispose of the animation frame request before it fires.
   */
  public requestAnimationFrame(
    callback: BoundCallback<C, Parameters<FrameRequestCallback>>,
  ): EffectHandle {
    if (Build.isServer || typeof globalThis.requestAnimationFrame !== 'function') {
      return createInertHandle();
    }

    const id = globalThis.requestAnimationFrame((...args) => {
      this.release(effect, 'completed');
      callback.apply(this.context, args);
    });

    const effect = this.track({
      describe: () => 'animation frame',
      teardown: () => globalThis.cancelAnimationFrame(id),
    });

    return this.toHandle(effect);
  }

  /**
   * Wraps a callback in a debounced function, which defers the invocation of the callback until the
   * given delay has elapsed. If the debounced function is called again before the delay elapses,
   * the pending invocation is cancelled and the delay restarts.
   *
   * Each pending invocation is tracked until:
   * - it completes, i.e. the callback is invoked;
   * - it is disposed of through the `cancel()` method or superseded by a new call; or
   * - the manager is disconnected.
   *
   * @param callback - The callback to invoke, with `this` bound to the manager's context.
   * @param delay - The delay in milliseconds.
   * @returns The debounced function, with a `cancel()` method to cancel the pending invocation.
   */
  public debounce<A extends unknown[]>(callback: BoundCallback<C, A>, delay: number): Debounced<A> {
    if (Build.isServer) return createInertRateLimited<A>();

    let effect: number | null = null;

    const cancel = () => this.release(effect, 'disposed');

    const debounced = (...args: A) => {
      // Restart the delay by cancelling the pending invocation, if any.
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
   * Wraps a callback in a throttled function, which invokes the callback at most once per given
   * interval, no matter how often the throttled function is called.
   *
   * Each throttle interval is tracked until:
   * - it completes, i.e. the interval elapses (a trailing invocation then starts a new interval);
   * - it is disposed of through the `cancel()` method; or
   * - the manager is disconnected.
   *
   * @param callback - The callback to invoke, with `this` bound to the manager's context.
   * @param interval - The interval in milliseconds.
   * @param options - Whether to invoke the callback on the leading and/or trailing edge of the
   * interval. Both default to `true`.
   * @returns The throttled function, with a `cancel()` method to cancel the pending trailing
   * invocation and reset the throttle interval.
   */
  public throttle<A extends unknown[]>(
    callback: BoundCallback<C, A>,
    interval: number,
    { leading = true, trailing = true }: ThrottleOptions = {},
  ): Throttled<A> {
    if (Build.isServer) return createInertRateLimited<A>();

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
      }, interval);

      effect = this.track({
        describe: () => `throttle (${interval}ms)`,
        teardown: () => {
          globalThis.clearTimeout(timeout);
          effect = null;
          pending = null;
        },
      });
    };

    const cancel = () => this.release(effect, 'disposed');

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
   * An observer never completes on its own. It starts being tracked when `observe()` is called and
   * keeps being tracked until:
   * - it is disposed of through its `disconnect()` method; or
   * - the manager is disconnected.
   *
   * @param callback - The callback to invoke when an observed element is resized, with `this` bound
   * to the manager's context.
   * @returns A native `ResizeObserver`, or an inert one during server-side rendering or when the
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
   * An observer never completes on its own. It starts being tracked when `observe()` is called and
   * keeps being tracked until:
   * - it is disposed of through its `disconnect()` method; or
   * - the manager is disconnected.
   *
   * @param callback - The callback to invoke when a mutation is observed, with `this` bound to the
   * manager's context.
   * @returns A native `MutationObserver`, or an inert one during server-side rendering or when the
   * API isn't available.
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
   * Tears down all effects that are currently tracked by the manager.
   *
   * This is typically called in the `disconnectedCallback` of a component. The manager remains
   * usable afterwards, so effects can be tracked again when the component is reconnected.
   *
   * Every effect is torn down even if the teardown of another one throws.
   *
   * @throws {AggregateError} An aggregation of all thrown errors if the teardown of one or more
   * effects fails.
   */
  public disconnect(): void {
    const errors: unknown[] = [];

    // Take a snapshot of the IDs, as a live map iterator would also visit any effects tracked
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
      throw new AggregateError(errors, 'Effect teardown failed.');
    }
  }

  /**
   * Starts tracking an effect.
   *
   * @param descriptor - The descriptor of the effect to track.
   * @returns The ID of the tracked effect.
   */
  private track(descriptor: EffectDescriptor): number {
    const id = ++EffectManager.lastId;
    this.effects.set(id, descriptor);
    this.log(id, descriptor, 'tracked');

    return id;
  }

  /**
   * Patches the `observe()` and `disconnect()` methods of an observer so that it can be tracked as
   * an effect.
   *
   * The observer starts being tracked whenever `observe()` is called and stops being tracked when
   * `disconnect()` is called.
   *
   * @param observer - The observer to patch.
   * @param label - A human-readable label for the observer, used in debug logs.
   * @returns The same observer, patched.
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

        // Track an effect as soon as the observer is used.
        effect ??= this.track({
          describe: () => label,
          teardown: () => {
            effect = null;
            nativeDisconnect();
          },
        });
      },
      disconnect: () => {
        if (effect !== null) this.release(effect, 'disposed');
        // If no effect was tracked, the observer was never used, and no additional teardown is
        // necessary.
        else nativeDisconnect();
      },
    });

    return observer;
  }

  /**
   * Creates a handle for the given effect.
   *
   * @param id - The ID of the effect.
   * @returns A handle whose `dispose()` method releases the effect with the `disposed` reason.
   */
  private toHandle(id: number): EffectHandle {
    return {
      dispose: () => this.release(id, 'disposed'),
    };
  }

  /**
   * Stops tracking an effect. The effect is torn down, unless it already completed on its own.
   *
   * Releasing an effect that is no longer tracked is a no-op.
   *
   * @param id - The ID of the effect to release, or `null` if there is none.
   * @param reason - The reason why the effect is released.
   */
  private release(id: number | null, reason: ReleaseReason): void {
    if (id === null) return;

    const descriptor = this.effects.get(id);
    if (!descriptor) return;

    // Remove the descriptor before teardown to prevent an exception from leaving a stale entry.
    this.effects.delete(id);
    this.log(id, descriptor, reason);
    if (reason !== 'completed') descriptor.teardown();
  }

  /**
   * Logs a lifecycle event of an effect to the console, if debugging is enabled.
   *
   * @param id - The ID of the effect.
   * @param descriptor - The descriptor of the effect.
   * @param event - The lifecycle event to log.
   */
  private log(id: number, descriptor: EffectDescriptor, event: EffectLifecycleEvent): void {
    if (!this.isDebug) return;

    console.debug(
      `[EffectManager ${describeContext(this.context)}] ${event} ${descriptor.describe()} (#${id})`,
    );
  }
}
