import { createNotifications, UNREAD_NOTIFICATIONS } from '../notifications';

function setup() {
  const storage = {
    saveDocumentOnCache: jest.fn(),
    removeDocumentFromCache: jest.fn(),
  };
  const log = jest.fn();

  return { notifications: createNotifications({ log, storage }), storage, log };
}

describe('notifications', () => {
  it('keeps the unread count that was pushed to it', () => {
    const { notifications } = setup();

    notifications.showDocument({ unreadNotifications: 7 }, UNREAD_NOTIFICATIONS);

    expect(notifications.getUnreadNotifications()).toBe(7);
  });

  it('starts at nothing unread', () => {
    const { notifications } = setup();

    expect(notifications.getUnreadNotifications()).toBe(0);
  });

  it('caches the document, so another tab does not have to ask again', () => {
    const { notifications, storage } = setup();
    const doc = { unreadNotifications: 3 };

    notifications.showDocument(doc, UNREAD_NOTIFICATIONS);

    expect(storage.saveDocumentOnCache).toHaveBeenCalledWith(doc, UNREAD_NOTIFICATIONS);
  });

  it('reads a malformed document as nothing unread rather than failing', () => {
    const { notifications } = setup();

    notifications.showDocument({ unreadNotifications: 'many' }, UNREAD_NOTIFICATIONS);

    expect(notifications.getUnreadNotifications()).toBe(0);
  });

  it('ignores a document type it does not know', () => {
    const { notifications, storage, log } = setup();

    notifications.showDocument({ unreadNotifications: 7 }, 'PARCELS');

    expect(storage.saveDocumentOnCache).not.toHaveBeenCalled();
    expect(log).toHaveBeenCalledWith('Unknown documentType received: PARCELS');
  });

  it('forgets the count when the document is withdrawn', () => {
    const { notifications, storage } = setup();
    notifications.showDocument({ unreadNotifications: 7 }, UNREAD_NOTIFICATIONS);

    notifications.removeDocument(UNREAD_NOTIFICATIONS);

    expect(notifications.getUnreadNotifications()).toBe(0);
    expect(storage.removeDocumentFromCache).toHaveBeenCalledWith(UNREAD_NOTIFICATIONS);
  });

  it('withdraws nothing for a document type it does not know', () => {
    const { notifications, storage } = setup();
    notifications.showDocument({ unreadNotifications: 7 }, UNREAD_NOTIFICATIONS);

    notifications.removeDocument('PARCELS');

    expect(notifications.getUnreadNotifications()).toBe(7);
    expect(storage.removeDocumentFromCache).not.toHaveBeenCalled();
  });

  it('clears count and cache together on logout', () => {
    const { notifications, storage } = setup();
    notifications.showDocument({ unreadNotifications: 7 }, UNREAD_NOTIFICATIONS);

    notifications.removeFromCache();

    expect(notifications.getUnreadNotifications()).toBe(0);
    expect(storage.removeDocumentFromCache).toHaveBeenCalledWith(UNREAD_NOTIFICATIONS);
  });
});
