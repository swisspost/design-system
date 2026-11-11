/**
 * Shared validation for the documentation Netlify config (`netlify.config.json`).
 *
 * Used by:
 * - deploy-documentation.yaml: reads the config from a build artifact, which can come from a fork,
 *   so its values are untrusted until validated.
 * - release-documentation.yaml: reads the config from the checked out branch.
 */

// Netlify site IDs are lowercase, hyphenated UUIDs.
export const SITE_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

// A single-label subdomain of netlify.app (e.g. `swisspost-design-system.netlify.app`).
// It must be a single label, because preview URLs are built as `<alias>--<siteUrl>`.
export const SITE_URL_PATTERN = /^[a-z0-9-]+\.netlify\.app$/;

/**
 * Parses and validates the content of a `netlify.config.json` file.
 * Error messages never contain the config values, so untrusted content is not echoed into the logs.
 *
 * @param {string} content - The raw JSON content of the config file.
 * @returns {{ siteId: string, siteUrl: string }} The validated config values.
 */
export function parseNetlifyConfig(content) {
  let config;

  try {
    config = JSON.parse(content);
  } catch {
    throw new Error('Invalid Netlify config: the file does not contain valid JSON.');
  }

  const { siteId, siteUrl } = config ?? {};

  if (typeof siteId !== 'string' || !SITE_ID_PATTERN.test(siteId)) {
    throw new Error('Invalid Netlify config: "siteId" must be a lowercase, hyphenated UUID.');
  }

  if (typeof siteUrl !== 'string' || !SITE_URL_PATTERN.test(siteUrl)) {
    throw new Error('Invalid Netlify config: "siteUrl" must look like "<site-name>.netlify.app".');
  }

  return { siteId, siteUrl };
}
