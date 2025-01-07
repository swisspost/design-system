---
'@swisspost/design-system-components': patch
---

Reduced the length of random IDs generated in the components; they are now generated using the [nanoid library](https://github.com/ai/nanoid) instead of the [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API).
