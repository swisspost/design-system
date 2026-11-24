import type { Globals } from './globals';

export const BRIDGE_SOURCE = 'post-docs';

type MessageDefinitions<T extends Record<string, object>> = T;

type Messages = ShellMessages & PreviewMessages;

export type ShellMessages = MessageDefinitions<{
  'connect': Record<string, never>;
  'page': { id: string; params: Record<string, string> };
  'globals': { globals: Globals };
  'scroll-to': { hash: string };
}>;

export type PreviewMessages = MessageDefinitions<{
  ready: { pageId: string };
  rendered: { pageId: string };
  error: { pageId: string };
  navigate: { href: string };
}>;

export type MessageType = keyof Messages;
export type ShellMessageType = keyof ShellMessages;
export type PreviewMessageType = keyof PreviewMessages;

export type MessagePayload<T extends MessageType> = Messages[T];

export type Envelope<T extends MessageType = MessageType> = {
  [K in T]: { source: typeof BRIDGE_SOURCE; type: K; payload: MessagePayload<K> };
}[T];

export function toEnvelope<T extends MessageType>(
  type: T,
  payload: MessagePayload<T>,
): Envelope<T> {
  return { source: BRIDGE_SOURCE, type, payload } as Envelope<T>;
}

export function isEnvelope<T extends MessageType = MessageType>(
  data: unknown,
): data is Envelope<T> {
  if (typeof data !== 'object' || data === null) return false;

  const { source, type, payload } = data as Record<string, unknown>;
  return (
    source === BRIDGE_SOURCE &&
    typeof type === 'string' &&
    typeof payload === 'object' &&
    payload !== null
  );
}
