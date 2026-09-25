import type { KlpStorage } from './storage';

/**
 * Documents pushed to the widget over the event bus, of which there is exactly one kind today:
 * the unread notification count.
 *
 * v9 wrote the badge from here with a jQuery selector that searched the light DOM while the badge
 * lived in the shadow root, so the count was cached but never actually shown. Rendering is the
 * component's job now; this only keeps the number and the cache in step.
 */

export const UNREAD_NOTIFICATIONS = 'UNREAD_NOTIFICATIONS';

export interface KlpNotificationsOptions {
  log?: (message: string) => void;
  storage: Pick<KlpStorage, 'saveDocumentOnCache' | 'removeDocumentFromCache'>;
}

function unreadCountOf(doc: unknown): number {
  const count = (doc as { unreadNotifications?: unknown })?.unreadNotifications;
  return typeof count === 'number' ? count : 0;
}

export function createNotifications({ log = () => {}, storage }: KlpNotificationsOptions) {
  let unreadNotifications = 0;

  function showDocument(doc: unknown, documentType: string): void {
    if (documentType !== UNREAD_NOTIFICATIONS) {
      log(`Unknown documentType received: ${documentType}`);
      return;
    }

    unreadNotifications = unreadCountOf(doc);
    storage.saveDocumentOnCache(doc, UNREAD_NOTIFICATIONS);
  }

  function removeDocument(documentType: string): void {
    if (documentType !== UNREAD_NOTIFICATIONS) {
      log(`Unknown documentType received: ${documentType}`);
      return;
    }

    removeFromCache();
  }

  function removeFromCache(): void {
    unreadNotifications = 0;
    storage.removeDocumentFromCache(UNREAD_NOTIFICATIONS);
  }

  return {
    showDocument,
    removeDocument,
    removeFromCache,
    getUnreadNotifications: () => unreadNotifications,
  };
}
