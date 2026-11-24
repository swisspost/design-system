# KLP Login Widget: Session and Unread-Message Flow

## Overview

The KLP login widget owns the browser session lifecycle for the header. It asks KLP for the current
session, listens for session and unread-notification updates, and renders the login link or signed-in
user menu accordingly.

The widget receives an unread-message count only. Message contents are not sent through the widget's
session channel; the Messages link opens the account portal, where users read their messages.

## Session Startup

1. The widget selects the KLP API host from its `environment` property.
2. It sends a credentialed `GET` request to `/v1/session/subscribe`.
3. KLP responds with the session state. A `sub` response includes a session payload, a time-to-live,
   and an event-bus address. If there is no active session, the widget renders the login link.
4. For a signed-in session, the widget renders the user menu and connects to the KLP event bus over
   WebSocket at `/eventbus`, registering the address returned by the subscription.

## Live Updates

KLP sends events to the address assigned to the widget. The widget handles these event types:

| Event                                     | Widget behavior                                                                                                       |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `hi`                                      | A sign-in occurred in this tab or another tab. The widget updates the session and clears a stale cached unread count. |
| `bye`                                     | The session ended. The widget clears session and unread state and shows the login link.                               |
| `doc` with `doctyp: UNREAD_NOTIFICATIONS` | The widget stores the notification document and updates the unread count.                                             |
| `rem` with `doctyp: UNREAD_NOTIFICATIONS` | The widget removes the notification document and resets the unread count.                                             |

The notification document has an `unreadNotifications` numeric field. The Messages entry displays
the count; the avatar displays an indicator while the count is greater than zero. The visible badge
caps the displayed value at `99+`, while assistive technology receives the exact count.

The messages backend updates KLP when messages are read or the count otherwise changes. KLP then
pushes the updated notification document to the widget, so the header updates without a page reload.

## Message Contents

The default Messages target is the account portal's messages page (`/selfadmin/messages/?lang=...`).
Selecting it navigates to the portal, which retrieves and displays the actual messages. The session
event bus carries notification counts and session events, not message content.

## Connection Recovery

If the WebSocket drops while the session is still valid, the widget subscribes again and registers
the newly assigned event-bus address. Messages arriving for an old address are ignored. If KLP
reports that a session ended, the widget does not retry as an authenticated session; it clears its
state and returns to the login link.
