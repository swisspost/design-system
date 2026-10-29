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
| `?unread=`      | How many messages are already waiting. Default `0`.                     |
| anything else   | Overrides that `KlpSessionData` field, e.g. `?surname=Hopper&company=`. |

The query parameters only decide what the page starts with. From there the buttons at the bottom
of the page push the messages the platform would send into an open session — `bye` to sign out,
one `hi` per user to sign in as that one, `new message` to raise the unread count by one and
`no messages` to clear it.

Only one of them ever reloads: the widget opens its socket just once it is signed in, so a `hi`
on an anonymous page has nothing to push into and comes back as `?session=<id>` instead.

The integration apps serve the same file and load it on every page, so it stays dormant until the
URL carries `?klpmock`. The playground's own tag carries `data-always` instead, which skips that
check.

## `klp-real.html`

Runs the login widget against the real KLP platform, without the mock, at
`/playground/klp-real.html`. `klp-real.js` sets the environment, the initial state and the
platform routes on every slot before the widget upgrades.

| Query parameter  | Effect                                                                  |
| ---------------- | ----------------------------------------------------------------------- |
| `?env=`          | The widget's `environment`. Default `int02`.                            |
| `?lang=`         | Language of the platform pages. Default `de`.                           |
| `?initialState=` | `anonymous` or `authenticated`, passed on as `initial-state`.           |
| `?app=`          | The KLP app the login link goes through. Default `kvm`, empty for none. |
| `?widgets=2`     | Renders a second widget below the header.                               |

The platform only answers pages served over `https://` from a `*.post.ch` host on port 443, so
`localhost:9200` does not work. To test locally:

1. Map a host to your machine, e.g. `127.0.0.1 local.post.ch` in `/etc/hosts`.
2. Put a TLS proxy with a certificate your browser trusts on port 443 in front of the dev server,
   e.g. Caddy with `tls internal` proxying `local.post.ch` to `localhost:9200`. Live reload may
   not pass through the proxy; reload by hand then.
3. If you are behind a proxy, exclude `local.post.ch` from it, but keep the platform hosts
   (`n.account*.post.ch`) going through it.
4. Open `https://local.post.ch/playground/klp-real.html`.

To sign in, follow the login link and sign in with a test user of that environment. KLP sends you
to the app's page afterwards, not back here, so open the test page again yourself. All
environments share the session cookie on `post.ch`, and a widget of one environment ends the
session of another, so use one browser profile per environment.
