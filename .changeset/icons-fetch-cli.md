---
'@swisspost/design-system-icons': minor
---

Added the `design-system-icons fetch` command to download and build icons into a required `--out <dir>`, using credentials from environment variables. The command warns when the output directory is not empty and preserves existing files except for matching generated filenames. To make the CLI usable, required dependencies have been moved from `devDependencies` to `dependencies` of the icons package.
