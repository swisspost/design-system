# The Swiss Post Design System - Color Scheme Switch - Figma Plugin

:warning: This is only a POC and not an official Swiss Post Design System Plugin yet.

- Do not publish it yet!
- Do not use it in production!

---

## Setup Instructions

For the basic setup, follow the "Figma Plugin Quickstart Guide" instructions below

### Use the plugin locally in your Figma

For this to work, you need a github account and a full seat in the Swiss Post Figma organisation.

1. Clone the [Swiss Post Design System Repository](https://github.com/swisspost/design-system).
2. Checkout the branch `poc/figma-plugin/color-scheme-switch`.
3. Open the project in your IDE and navigate to the respositories root folder.
4. Run `pnpm install` to install dependencies.
5. Run `pnpm --filter color-scheme-switch build` to build the plugin.
6. Open [figma.com](https://figma.com) with your Swiss Post account and open the document [POC - SPDS Color Scheme Switch - Figma Plugin](https://www.figma.com/design/IHkLqX69CyIkhA1Wg6MI3b/POC---SPDS-Color-Scheme-Switch---Figma-Plugin?m=draw) in your local Figma client (:warning: this won't work in the browser).
7. Make sure you have nothing selected (e.g. click into the abyss or press `esc` until nothing is selected).
8. Right click anywhere empty and select `Plugins` > `Development` > `Import Plugin from Manifest...`.
9. Navigate to the folder `design-system/packages/figma-plugin/color-scheme-switch` and select the `manifest.json` file.
10. The plugin is now installed and can be run in that Figma file as usually.
11. Click on any element or select a frame and switch the scheme with the SPDS Color Scheme Switch Figma plugin.

## Figma Plugin Quickstart Guide

Below are the steps to get your plugin running. You can also find instructions at:

https://www.figma.com/plugin-docs/plugin-quickstart-guide/

This plugin template uses Typescript and NPM, two standard tools in creating JavaScript applications.

First, download Node.js which comes with NPM. This will allow you to install TypeScript and other
libraries. You can find the download link here:

https://nodejs.org/en/download/

Next, install TypeScript using the command:

npm install -g typescript

Finally, in the directory of your plugin, get the latest type definitions for the plugin API by running:

npm install --save-dev @figma/plugin-typings

If you are familiar with JavaScript, TypeScript will look very familiar. In fact, valid JavaScript code
is already valid Typescript code.

TypeScript adds type annotations to variables. This allows code editors such as Visual Studio Code
to provide information about the Figma API while you are writing code, as well as help catch bugs
you previously didn't notice.

For more information, visit https://www.typescriptlang.org/

Using TypeScript requires a compiler to convert TypeScript (code.ts) into JavaScript (code.js)
for the browser to run.

We recommend writing TypeScript code using Visual Studio code:

1. Download Visual Studio Code if you haven't already: https://code.visualstudio.com/.
2. Open this directory in Visual Studio Code.
3. Compile TypeScript to JavaScript: Run the "Terminal > Run Build Task..." menu item,
   then select "npm: watch". You will have to do this again every time
   you reopen Visual Studio Code.

That's it! Visual Studio Code will regenerate the JavaScript file every time you save.
