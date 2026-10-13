// This script checks if the packages about to be released are available on npm

import fs from 'node:fs';

// Read the changesets.json file and parse it into an object
const changesets = JSON.parse(fs.readFileSync('changesets.json', 'utf8'));

// Get the list of releases from the changesets object
const releases = changesets.releases ?? [];
const missingPackages = [];

// Check if each package exists on npm and log an error for the missing ones
for (const release of releases) {
  let response;

  try {
    const packageUrl = `https://registry.npmjs.org/${encodeURIComponent(release.name)}`;
    response = await fetch(packageUrl, {
      headers: { Accept: 'application/vnd.npm.install-v1+json' },
    });
  } catch (error) {
    console.error(`::error::Could not check ${release.name} on npm: ${error.message}`);
    process.exitCode = 1;
    continue;
  }

  if (response.status === 404) {
    missingPackages.push(release.name);
  } else if (!response.ok) {
    console.error(
      `::error::npm registry returned ${response.status} while checking ${release.name}.`,
    );
    process.exitCode = 1;
  } else {
    console.log(`Package exists on npm: ${release.name}`);
  }

  await response.body?.cancel();
}

if (missingPackages.length > 0) {
  for (const packageName of missingPackages) {
    console.error(
      `::error::Package ${packageName} does not exist on npmjs.org. Create it manually and configure trusted publishing before releasing.`,
    );
  }

  process.exit(1);
}
