import { join } from 'node:path';
import {
  detectBrowserPlatform,
  getInstalledBrowsers,
  install,
  resolveBuildId,
  uninstall,
} from '@puppeteer/browsers';

const CACHE_DIR = join(import.meta.dirname, 'browsers');

export const BROWSER = {
  name: 'chrome',
  family: 'chromium',
  channel: 'stable',
  displayName: 'Chrome for Testing',
};

const getMajorVersion = buildId => parseInt(buildId, 10);

export async function installBrowser() {
  const platform = detectBrowserPlatform();
  if (!platform) {
    throw new Error(`Unsupported platform: ${process.platform}/${process.arch}.`);
  }

  const target = await resolveBuildId(BROWSER.name, platform, BROWSER.channel).catch(() => null);
  const installed = await getInstalledBrowsers({ cacheDir: CACHE_DIR }).catch(() => []);

  if (!target) {
    if (installed.length === 0) {
      throw new Error(
        `Could not resolve the latest ${BROWSER.channel} ${BROWSER.displayName} build.`,
      );
    }

    return installed
      .filter(browser => browser.browser === BROWSER.name)
      .reduce((latest, browser) =>
        getMajorVersion(browser.buildId) > getMajorVersion(latest.buildId) ? browser : latest,
      );
  }

  if (!installed.some(browser => browser.buildId === target)) {
    console.log(`Installing ${BROWSER.displayName} ${target}, this may take a moment…`);
  }

  const browser = await install({
    browser: BROWSER.name,
    buildId: target,
    buildIdAlias: BROWSER.channel,
    cacheDir: CACHE_DIR,
    platform,
  });

  await Promise.all(
    installed
      .filter(installed => installed.buildId !== browser.buildId)
      .map(installed =>
        uninstall({
          browser: installed.browser,
          buildId: installed.buildId,
          platform: installed.platform,
          cacheDir: CACHE_DIR,
        }),
      ),
  );

  return browser;
}
