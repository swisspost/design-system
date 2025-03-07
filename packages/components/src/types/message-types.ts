export const MSG_TYPES = ['error', 'warning'] as const;

export type MsgType = (typeof MSG_TYPES)[number];
