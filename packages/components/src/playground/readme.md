# playground

Think of this as the `public/` folder you know from other frontend setups: whatever lands here is
copied into `www/` and served by the playground dev server at the matching path, so
`klp-platform-mock.js` is reachable as `/playground/klp-platform-mock.js` and can be pulled into
[`index.html`](../index.html) with a plain `<script src>`.

Nothing in here is part of the library. It lives under `src/` only so that the watcher picks up
edits — a folder outside `src/` is copied once at startup and then ignored, which means every
change needs a server restart. The price for that is `dist-collection`, which copies everything
under `src/` into the published `dist/collection`, so the folder is excluded again in
[`package.json`](../../package.json) via `"!dist/collection/playground/"`. Check it with
`npm pack --dry-run | grep playground` after touching either side.

## `klp-platform-mock.js`

Stands in for the KLP platform, so the login widget can be driven without a backend.

| Query parameter | Effect                                                                  |
| --------------- | ----------------------------------------------------------------------- |
| `?session=`     | `ada`, `grace` or `alan`; anything else is anonymous. Default `ada`.    |
| `?unread=`      | How many messages are waiting. Default `3`.                             |
| anything else   | Overrides that `KlpSessionData` field, e.g. `?surname=Hopper&company=`. |

The login and logout links work: logging out lands on `?session=none`, the login link opens a
stand-in login page that lets you pick a user, and picking one lands on `?session=<id>`. The panel
in the bottom left sends the two messages the platform would push into an already open session —
`bye` to sign out and `hi` to switch to another user.
