import 'cypress';
import {
  Browser,
  BrowserPlatform,
  BrowserTag,
  detectBrowserPlatform,
  getInstalledBrowsers,
  getVersionComparator,
  install,
  InstalledBrowser,
  resolveBuildId,
  uninstall,
} from '@puppeteer/browsers';

import { resolve } from 'node:path';

interface BrowserConfig {
  name: Browser;
  channel: BrowserTag;
  family: Cypress.BrowserFamily;
  displayName: string;
}

const CACHE_DIR = resolve(import.meta.dirname, '../../browsers');

const BROWSERS: BrowserConfig[] = [
  {
    name: Browser.CHROME,
    channel: BrowserTag.STABLE,
    family: 'chromium',
    displayName: 'Chrome for Testing',
  },
];

export async function browsersPlugin(config: Cypress.PluginConfigOptions) {
  const platform = detectBrowserPlatform();

  if (!platform) {
    throw new Error(`Unsupported platform: ${process.platform}/${process.arch}.`);
  }

  const installedBrowsers = await getInstalledBrowsers({ cacheDir: CACHE_DIR });
  const resolvedBrowsers = await Promise.all(
    BROWSERS.map(config => resolveBrowser(config, platform, installedBrowsers)),
  );

  config.browsers = resolvedBrowsers;
  config.defaultBrowser = resolvedBrowsers[0].name;
}

async function resolveBrowser(
  config: BrowserConfig,
  platform: BrowserPlatform,
  installed: InstalledBrowser[],
): Promise<Cypress.Browser> {
  const buildId = await getLatestBuildId(config, platform);
  const candidates = installed.filter(b => b.platform === platform && b.browser === config.name);

  const compareVersions = getVersionComparator(config.name);
  candidates.sort((a, b) => compareVersions(a.buildId, b.buildId));

  const latest = candidates.at(-1);

  let resolved: InstalledBrowser | undefined;

  // Use the latest cached build if
  // - the lookup failed (e.g. offline); or
  // - it already corresponds to the latest available build.
  if (buildId === null || latest?.buildId === buildId) {
    resolved = latest;
  } else if (buildId) {
    console.log(`Installing the latest build of ${config.name}. This may take some time…`);

    resolved = await install({
      browser: config.name,
      buildId,
      cacheDir: CACHE_DIR,
      platform,
    });
  }

  if (!resolved) {
    throw new Error(`Failed to resolve a build of ${config.name}.`);
  }

  // Remove every cached build except the resolved one
  await Promise.all(
    candidates
      .filter(b => b.buildId !== resolved.buildId)
      .map(b => uninstall({ ...b, cacheDir: CACHE_DIR })),
  );

  return {
    ...config,
    version: resolved.buildId,
    majorVersion: Number.parseInt(resolved.buildId, 10),
    path: resolved.executablePath,
    // Required by `Cypress.Browser`, but Cypress sets the effective mode when it launches.
    isHeaded: true,
    isHeadless: true,
  };
}

async function getLatestBuildId(config: BrowserConfig, platform: BrowserPlatform) {
  try {
    return await resolveBuildId(config.name, platform, config.channel);
  } catch (error) {
    console.warn(`Failed to determine the latest build of ${config.name}.`, error);
    return null;
  }
}
