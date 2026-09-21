import { resolve } from 'node:path';
import {
  Browser,
  detectBrowserPlatform,
  getInstalledBrowsers,
  getVersionComparator,
  install,
  resolveBuildId,
  uninstall,
} from '@puppeteer/browsers';
import { BrowserTag } from '@puppeteer/browsers/src/browser-data/types';

const CACHE_DIR = resolve(import.meta.dirname, '../browsers');

const BROWSERS = [
  {
    name: Browser.CHROME,
    family: Browser.CHROMIUM,
    channel: BrowserTag.STABLE,
    displayName: 'Chrome for Testing',
  },
];

/**
 *
 * @param config @type {import('cypress').PluginConfigOptions}
 */
export async function browserPlugin(config) {
  const browsers = await resolveBrowsers(BROWSERS);

  config.browsers = browsers;
  config.defaultBrowser = browsers[0].name;
}

async function resolveBrowsers(browsers) {
  const platform = detectBrowserPlatform();
  if (!platform) {
    throw new Error(`Unsupported platform: ${process.platform}/${process.arch}.`);
  }

  const installed = await getInstalledBrowsers({ cacheDir: CACHE_DIR });

  return Promise.all(
    browsers.map(async browser => {
      const resolved = await resolveBrowser(browser, platform, installed);

      return {
        ...browser,
        version: resolved.buildId,
        majorVersion: Number.parseInt(resolved.buildId, 10),
        path: resolved.executablePath,
      };
    }),
  );
}

async function resolveBrowser(browser, platform, installed) {
  const latestBuildId = await getLatestBuildId(browser, platform);
  const latestInstalled = await getLatestInstalledBrowser(browser, platform, installed);

  if (!latestBuildId) {
    if (!latestInstalled) {
      throw new Error(`Failed to resolve a ${browser.channel} build of ${browser.name}.`);
    }

    return latestInstalled;
  }

  if (latestInstalled?.buildId === latestBuildId) {
    return latestInstalled;
  }

  console.log(`Installing latest ${browser.channel} build of ${browser.name}`);

  return await install({
    browser: browser.name,
    buildId: latestBuildId,
    cacheDir: CACHE_DIR,
    platform,
  });
}

async function getLatestBuildId(browser, platform) {
  try {
    return await resolveBuildId(browser.name, platform, browser.channel);
  } catch (error) {
    console.warn(
      `Failed to determine the latest ${browser.channel} build of ${browser.name}.`,
      error,
    );
    return null;
  }
}

async function getLatestInstalledBrowser(browser, platform, installed) {
  const candidates = installed.filter(b => b.platform === platform && b.browser === browser.name);
  candidates.sort(getVersionComparator(browser.name));

  const latest = candidates.pop();
  await Promise.all(candidates.map(browser => uninstall({ ...browser, cacheDir: CACHE_DIR })));

  return latest;
}
