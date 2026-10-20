// This script checks if the packages about to be released are available on npm

import fs from 'node:fs';

// Read the changesets.json file and parse it into an object
const changesets = JSON.parse(fs.readFileSync('changesets.json', 'utf8'));

const workspaceDirectories = [
  'packages',
  'packages/components-angular/projects',
  'packages/intranet-header-workspace/projects',
  'packages/styles-primeng-workspace/projects',
];
const manifests = workspaceDirectories.flatMap(directory =>
  fs
    .readdirSync(directory, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => `${directory}/${entry.name}/package.json`)
    .filter(manifestPath => fs.existsSync(manifestPath))
    .map(manifestPath => JSON.parse(fs.readFileSync(manifestPath, 'utf8'))),
);

const packagesByName = new Map(manifests.map(manifest => [manifest.name, manifest]));

const releases = (changesets.releases ?? []).filter(release => {
  const packageJson = packagesByName.get(release.name);

  if (!packageJson) {
    throw new Error(`Cannot find workspace package: ${release.name}`);
  }

  // `publishConfig.access = 'public'` is required for scoped packages (e.g. `@swisspost/...`), because npm defaults scoped packages to `restricted` and then the publish command would fail with 402.
  return packageJson.private !== true && packageJson.publishConfig?.access === 'public';
});

// Check all packages concurrently to avoid serial registry requests
const results = await Promise.all(
  releases.map(async release => {
    let response;

    try {
      const packageUrl = `https://registry.npmjs.org/${encodeURIComponent(release.name)}`;
      response = await fetch(packageUrl, {
        headers: { Accept: 'application/vnd.npm.install-v1+json' },
      });

      if (response.status === 404) {
        return { name: release.name, status: 'missing' };
      }

      if (!response.ok) {
        return {
          name: release.name,
          message: `npm registry returned ${response.status}.`,
          status: 'error',
        };
      }

      return { name: release.name, status: 'exists' };
    } catch (error) {
      return { name: release.name, message: error.message, status: 'error' };
    } finally {
      await response?.body?.cancel();
    }
  }),
);

const missingPackages = results
  .filter(result => result.status === 'missing')
  .map(result => result.name);

for (const result of results) {
  if (result.status === 'exists') {
    console.log(`Package exists on npm: ${result.name}`);
  } else if (result.status === 'error') {
    console.error(`::error::Could not check ${result.name} on npm: ${result.message}`);
    process.exitCode = 1;
  }
}

if (missingPackages.length > 0) {
  for (const packageName of missingPackages) {
    console.error(
      `::error::Package ${packageName} does not exist on npmjs.org. Create it manually and configure trusted publishing before releasing.`,
    );
  }

  process.exitCode = 1;
}
