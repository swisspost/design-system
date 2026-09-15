// This script checks if the packages about to be released are available on npm

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

// Read the changesets.json file and parse it into an object
const changesets = JSON.parse(fs.readFileSync('changesets.json', 'utf8'));

// Get the list of releases from the changesets object
const releases = changesets.releases ?? [];
const missingPackages = [];

// Check if each package exists on npm and log an error for the missing ones
for (const release of releases) {
  try {
    execFileSync('pnpm', ['view', release.name, '--registry=https://registry.npmjs.org'], {
      stdio: 'ignore',
    });

    console.log(`Package exists on npm: ${release.name}`);
  } catch {
    missingPackages.push(release.name);
  }
}

if (missingPackages.length > 0) {
  for (const packageName of missingPackages) {
    console.error(
      `::error::Package ${packageName} does not exist on npmjs.org. Create it manually and configure trusted publishing before releasing.`,
    );
  }

  process.exit(1);
}
