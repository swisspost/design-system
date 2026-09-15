import { Environment } from './general.model';

/**
 * Mirrors `ILoginWidgetOptions` from internet-header v9, extended with the option keys the
 * legacy widget actually reads at runtime but which v9 never declared.
 */
export interface ILoginWidgetOptions {
  applicationId: string;
  serviceId: string;
  appLoginUrl: string;
  currentLang: string;
  environment?: Environment;
  options: ILoginWidgetConf;
  platform: ILoginWidgetPlatform;
}

export interface ILoginWidgetPlatform {
  endPoint: string;
  notificationsEndPoint: string;
  logoutURL: string;
  keepAliveURL: string;
  autoLoginURL: string;
  selfAdminOrigin?: string;
}

export interface ILoginWidgetConf {
  /** Declared by v9 but never read by the widget, which only looks at `debug`. */
  isDebugEnabled?: boolean;
  logoutTargetURL?: string;
  keepAlive?: boolean;
  keepAliveListeningEvents?: string;
  keepAliveOnInit?: boolean;
  keepAliveInterval?: number;
  showLinks?: boolean;
  tabIndex?: number;
  accessKeys?: boolean;
  notificationsNrToLoad?: number;
  debug?: boolean;
}

/** Session payload pushed by the Widget API (`typ: 'sub' | 'hi'`). */
export interface ISessionData {
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

export type WidgetMessage =
  | { typ: 'sub'; adr: string; ttl: number; data: ISessionData; adt?: number }
  | { typ: 'ukn'; sub?: boolean; adt?: number }
  | { typ: 'hi'; data: ISessionData; ttl: number; adt?: number }
  | { typ: 'bye'; adt?: number }
  | { typ: 'doc'; doc: unknown; doctyp: string; adt?: number }
  | { typ: 'rem'; doctyp: string; adt?: number };

/** The object returned by `window.klpWidgetDev()`. */
export interface IKlpWidget {
  keepAliveSessions(): void;
  isUserAuthenticated(): boolean;
  getUserType(): 'B2B' | 'B2C' | 'NONE';
  getCurrentAuthLevel(): string;
  changeAppLoginURL(appLoginURL: string): void;
  updateWidget(options: ILoginWidgetConf): void;
  registerLoginCallback(callback: () => void): void;
  unregisterLoginCallback(): void;
  registerKeepAliveCallback(callback: () => void): void;
  unregisterKeepAliveCallback(): void;
  registerLogoutCallback(callback: () => void): void;
  unregisterLogoutCallback(): void;
  registerDocumentCallback(documentType: string, callback: (doc: unknown) => void): void;
  unregisterDocumentCallback(documentType: string): void;
  version(): string;
  setDebug(debug: boolean): void;
}
