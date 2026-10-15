# playground

Think of this as the `public/` folder you know from other frontend setups: whatever lands here is
copied into `www/` and served by the playground dev server at the matching path, so
`klp-platform-mock.js` is reachable as `/playground/klp-platform-mock.js` and can be pulled into
[`src/index.html`](../src/index.html) with a plain `<script src>`.

> [!NOTE]
> It sits outside `src/` on purpose. Stencil's `dist-collection` copies everything under `src/` into
> `dist/collection`, and that folder gets published — so anything in here would end up in the npm
> package of consumers. Nothing in this folder is part of the library.
