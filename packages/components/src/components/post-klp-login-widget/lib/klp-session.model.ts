/**
 * The wire contract of the KLP platform. These names are the platform's and cannot be renamed.
 */

/** Session payload pushed by the Widget API (`typ: 'sub' | 'hi'`). */
export interface KlpSessionData {
  name: string;
  surname: string;
  email?: string;
  company?: string;
  userType: 'B2B' | 'B2C';
  authLevel: 'AUTOLOGIN' | 'PASSWORD';
  support?: boolean;
  canChangeCompany?: boolean;
  changeUserAndProfile?: 'notAvailable' | 'profile' | 'userAndProfile';
}

/**
 *   ukn  the platform does not know us. With `sub` set it also wants us to subscribe again.
 *   sub  the answer to a subscription: carries our address and, if any, an existing session.
 *   hi   somebody logged in, in this tab or another one.
 *   bye  somebody logged out.
 *   doc  a document was pushed to us.
 *   rem  a document was withdrawn.
 */
export type KlpMessage =
  | { typ: 'sub'; adr: string; ttl: number; data: KlpSessionData; adt?: number }
  | { typ: 'ukn'; sub?: boolean; adt?: number }
  | { typ: 'hi'; data: KlpSessionData; ttl: number; adt?: number }
  | { typ: 'bye'; adt?: number }
  | { typ: 'doc'; doc: unknown; doctyp: string; adt?: number }
  | { typ: 'rem'; doctyp: string; adt?: number };

export interface KlpEndPoints {
  audit: string;
  keepalive: string;
  subscribe: string;
  eventbus: string;
}

/** Every effect the router can ask for, injected so the routing table needs no browser. */
export interface KlpRouterActions {
  audit(message: KlpMessage): void;
  setRetrySubscribeOnFail(retry: boolean): void;
  setAddress(address: string): void;
  login(data: KlpSessionData, ttl: number, notify: boolean): void;
  logout(): void;
  subscribe(): void;
  openCommunication(): void;
  removeNotificationsFromCache(): void;
  showDocument(doc: unknown, documentType: string): void;
  removeDocument(documentType: string): void;
}
