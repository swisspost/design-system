# @swisspost/klp (legacy)

The v9 KLP login widget, lifted out of `release/v9` so it can be characterized, split and ported
to v10. **Never published, never released.** Delete this package once the new widget ships.

## Scripts

| Script | What it does |
| --- | --- |
| `pnpm build` | Production build of the Stencil wrapper. Minified, so **not** usable for coverage. |
| `pnpm dev` | Same build unminified, with working source maps. |
| `pnpm start` | Unminified build in watch mode, served on a local dev server. |
| `pnpm unit` | Node's own test runner over the modules that need no browser. Fast, no build. |
| `pnpm server` | The fake KLP platform on its own, if you want to poke it by hand. |
| `pnpm e2e` | Builds, then runs the Playwright suite against the fake platform. |
| `pnpm e2e:ui` | The same suite in Playwright's UI, for stepping through a failure. |
| `pnpm e2e:update` | The same suite, rewriting the stored snapshots. Check the diff before committing. |
| `pnpm coverage` | `dev` build, e2e suite with V8 coverage, then the report. Fails on any uncovered line that has no explanation. |

## Testing

Unit tests cover url assembly, markup, the message router, the session client, storage, the
control cookie and the translations. Everything that touches the DOM is left to the e2e suite,
which drives a real browser against a real HTTPS server.

That server is virtually hosted as `*.post.ch` via Chromium's host resolver rules, because the
widget behaves differently anywhere else: it writes a `domain=post.ch` cookie, sends
`SameSite=None; Secure`, and skips subscribing entirely off post.ch. Only the data is faked.

`pnpm coverage` needs the unminified build, hence `dev` rather than `build`: Stencil minifies
after emitting source maps and does not remap them.

Uncovered lines must be explained in `test/coverage/report.js`, which fails the run on anything
uncovered that a test could have reached. That check is also what catches wrappers left without
callers after a refactor.

## Known defects

Several v9 bugs are pinned as **passing** tests, so the port can decide about them deliberately.
They are documented next to the code that causes them. Do not "fix" them here.

## If a run hangs

The server holds port 8443:

```sh
pkill -f playwright; lsof -ti:8443 | xargs kill -9
```
