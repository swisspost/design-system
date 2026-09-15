/*
 * ------------------------------------------------------------------------------------------------
 * Copyright 2014 by Swiss Post, Information Technology Services
 * ------------------------------------------------------------------------------------------------
 * Documents pushed to the widget over the event bus, of which there is exactly one kind today:
 * the unread notification count.
 *
 * The count is held here because two places need it at different times. The badge is written when
 * the document arrives, the detail count when the menu is opened, and nothing re-reads it from the
 * platform in between.
 * ------------------------------------------------------------------------------------------------
 */

import jQuery from 'jquery/dist/jquery.slim';

const $ = jQuery;

export const UNREAD_NOTIFICATIONS = 'UNREAD_NOTIFICATIONS';

export function createNotifications({
  log = () => {},
  selectFromShadowDom,
  getDocumentCallbacks,
  saveDocumentOnCache,
  removeDocumentFromCache,
}) {
  let unreadNotifications = 0;

  function showDocument(document, documentType) {
    switch (documentType) {
      case UNREAD_NOTIFICATIONS:
        renderNotificationsWidget(document);
        saveDocumentOnCache(document, UNREAD_NOTIFICATIONS);
        break;
      default:
        log('Unknown documentType received: ' + documentType);
    }

    notifyConsumer(documentType, document);
  }

  function removeDocument(documentType) {
    switch (documentType) {
      case UNREAD_NOTIFICATIONS:
        removeDocumentFromCache(UNREAD_NOTIFICATIONS);
        break;
      default:
        log('Unknown documentType received: ' + documentType);
    }

    notifyConsumer(documentType, undefined);
  }

  /** Consumers register per document type and are told about every one of them, known or not. */
  function notifyConsumer(documentType, document) {
    const callbacks = getDocumentCallbacks();
    if (typeof callbacks[documentType] == 'function') {
      callbacks[documentType](document);
    }
  }

  function renderNotificationsWidget(notifications) {
    // Searches the light DOM while the badge lives in the shadow root, so the comparison always
    // holds and the badge is never actually revealed.
    if (
      notifications != null &&
      $('.notification-number').text() !== notifications.unreadNotifications
    ) {
      unreadNotifications = notifications.unreadNotifications;
      if (unreadNotifications === 0) {
        $('.notification-number').css('visibility', 'hidden');
      } else {
        $('.notification-number').css('visibility', 'visible');
      }
    }
  }

  function toggleNotificationsMenu() {
    if (unreadNotifications !== 0) {
      if (unreadNotifications > 99) {
        selectFromShadowDom()
          .find('.notification-number-detail')
          .css('visibility', 'visible')
          .text('99+');
      } else {
        selectFromShadowDom()
          .find('.notification-number-detail')
          .css('visibility', 'visible')
          .text(unreadNotifications);
      }
    } else {
      selectFromShadowDom().find('.notification-number-detail').css('visibility', 'hidden');
    }
  }

  return { showDocument, removeDocument, toggleNotificationsMenu };
}
