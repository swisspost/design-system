/**
 * Docs stories rendered with `parameters.docs.story.inline: false` live in a nested
 * `iframe.html?id=<storyId>&viewMode=story`. That nested preview only talks to its parent window,
 * so the arg updates made through the docs page controls never reach it.
 * Upstream issue: https://github.com/storybookjs/storybook/issues/11908
 *
 * This bridge forwards the args from the docs preview (parent) to the nested story preview (child):
 * - the parent sends the latest args of a story to every iframe rendering that story,
 * - the child applies the args it receives and asks for the latest args once its story is prepared,
 *   so iframes that are loaded lazily or reloaded still get the current state of the controls.
 */
import type { Args } from '@storybook/web-components-vite';
import type { Channel } from 'storybook/internal/channels';
import {
  STORY_ARGS_UPDATED,
  STORY_PREPARED,
  UPDATE_STORY_ARGS,
} from 'storybook/internal/core-events';
import { addons } from 'storybook/preview-api';

const ARGS_UPDATE = 'post-docs:story-args-update';
const ARGS_REQUEST = 'post-docs:story-args-request';

interface TransferableArgs {
  args: Args;
  // Keys that cannot be sent with postMessage (e.g. actions), the child must keep its own values
  omittedKeys: string[];
}

interface ArgsUpdateMessage extends TransferableArgs {
  type: typeof ARGS_UPDATE;
  storyId: string;
}

interface ArgsRequestMessage {
  type: typeof ARGS_REQUEST;
  storyId: string;
}

const latestArgs = new Map<string, TransferableArgs & { key: string }>();

function isMessage<T extends ArgsUpdateMessage | ArgsRequestMessage>(
  data: unknown,
  type: T['type'],
): data is T {
  const message = data as T | null;
  return message?.type === type && typeof message.storyId === 'string';
}

function getViewMode(win: Window): string | null {
  try {
    return new URLSearchParams(win.location.search).get('viewMode');
  } catch {
    // The window belongs to another origin
    return null;
  }
}

function toTransferableArgs(args: Args): TransferableArgs {
  const transferable: TransferableArgs = { args: {}, omittedKeys: [] };

  Object.entries(args).forEach(([key, value]) => {
    try {
      structuredClone(value);
      transferable.args[key] = value;
    } catch {
      transferable.omittedKeys.push(key);
    }
  });

  return transferable;
}

// Sorted keys, so that the same args always produce the same key
function toKey(args: Args): string {
  return JSON.stringify(args, (_, value: unknown) => {
    if (value === undefined) return '__undefined__';
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const entries = Object.entries(value as Record<string, unknown>);
      return Object.fromEntries(entries.sort(([a], [b]) => a.localeCompare(b)));
    }
    return value;
  });
}

function getStoryIframes(storyId: string): HTMLIFrameElement[] {
  return Array.from(document.querySelectorAll('iframe')).filter(iframe => {
    try {
      return new URL(iframe.src, window.location.href).searchParams.get('id') === storyId;
    } catch {
      return false;
    }
  });
}

function postArgs(target: Window | null, storyId: string, { args, omittedKeys }: TransferableArgs) {
  if (!target) return;

  const message: ArgsUpdateMessage = { type: ARGS_UPDATE, storyId, args, omittedKeys };
  try {
    target.postMessage(message, window.location.origin);
  } catch (error) {
    console.warn(`Unable to send the args of the story "${storyId}" to its iframe.`, error);
  }
}

function setupParent(channel: Channel) {
  channel.on(STORY_ARGS_UPDATED, ({ storyId, args }: { storyId: string; args: Args }) => {
    if (getViewMode(window) !== 'docs') return;

    const transferable = toTransferableArgs(args);
    const key = toKey(transferable.args);

    // The child echoes back the args it applied, stop here to avoid an endless loop
    if (latestArgs.get(storyId)?.key === key) return;

    latestArgs.set(storyId, { ...transferable, key });
    getStoryIframes(storyId).forEach(iframe =>
      postArgs(iframe.contentWindow, storyId, transferable),
    );
  });

  window.addEventListener('message', (event: MessageEvent) => {
    if (event.origin !== window.location.origin) return;
    if (!isMessage<ArgsRequestMessage>(event.data, ARGS_REQUEST)) return;

    const { storyId } = event.data;
    const isStoryIframe = getStoryIframes(storyId).some(
      iframe => iframe.contentWindow === event.source,
    );
    const current = latestArgs.get(storyId);

    if (isStoryIframe && current) postArgs(event.source as Window, storyId, current);
  });
}

function setupChild(channel: Channel) {
  // No `window.parent === window` guard: the args are only requested from a parent in docs mode
  const params = new URLSearchParams(window.location.search);
  const storyId = params.get('id');
  if (!storyId || params.get('viewMode') !== 'story') return;

  let currentArgs: Args | undefined;

  const trackArgs = (id: string, args: Args) => {
    if (id === storyId) currentArgs = args;
  };
  channel.on(STORY_PREPARED, ({ id, args }: { id: string; args: Args }) => trackArgs(id, args));
  channel.on(STORY_ARGS_UPDATED, ({ storyId: id, args }: { storyId: string; args: Args }) =>
    trackArgs(id, args),
  );

  window.addEventListener('message', (event: MessageEvent) => {
    if (event.source !== window.parent || event.origin !== window.location.origin) return;
    if (!isMessage<ArgsUpdateMessage>(event.data, ARGS_UPDATE)) return;

    // The args are requested again once the story is prepared, so early messages can be ignored
    if (!currentArgs || event.data.storyId !== storyId) return;

    const { args, omittedKeys } = event.data;
    const updatedArgs: Args = { ...args };

    // Storybook deletes args set to `undefined`, so a reset arg is missing instead of undefined
    Object.keys(currentArgs)
      .filter(key => !(key in args) && !omittedKeys.includes(key))
      .forEach(key => (updatedArgs[key] = undefined));

    const unchanged = Object.keys(updatedArgs).every(
      key => toKey({ value: updatedArgs[key] }) === toKey({ value: currentArgs?.[key] }),
    );
    if (unchanged) return;

    channel.emit(UPDATE_STORY_ARGS, { storyId, updatedArgs });
  });

  channel.on(STORY_PREPARED, ({ id }: { id: string }) => {
    if (id !== storyId || getViewMode(window.parent) !== 'docs') return;

    const message: ArgsRequestMessage = { type: ARGS_REQUEST, storyId };
    window.parent.postMessage(message, window.location.origin);
  });
}

addons.ready().then(channel => {
  setupParent(channel);
  setupChild(channel);
});
