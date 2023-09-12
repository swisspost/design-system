import fs from 'fs';
import path from 'path';

const args = process.argv.splice(2);
const versionsPath = path.resolve(process.cwd(), args[1]);
const packagePath = path.resolve(process.cwd(), args[3]);

const getMajorVersion = version =>
  version === 'next' ? version : parseInt(version.split('.')[0].replace('workspace:', ''));

if (!fs.existsSync(versionsPath)) {
  throw new Error(`versions.json could not be found at ${versionsPath}`);
}

if (!fs.existsSync(packagePath)) {
  throw new Error(`package.json could not be found at ${packagePath}`);
}

// Load source files
const packageJSON = JSON.parse(fs.readFileSync(packagePath));
const versionsJSON = JSON.parse(fs.readFileSync(versionsPath));

// Get some constants
const currentMajorVersion = getMajorVersion(packageJSON.version);
const interestingKeywords = ['@swisspost', '@angular/core', 'react', 'bootstrap'];
const interestingDependencies = Object.entries({
  ...packageJSON.dependencies,
  ...packageJSON.devDependencies,
})
  .filter(([key]) => interestingKeywords.some(i => key.includes(i)))
  .reduce((acc, [key, value]) => {
    acc[key] = value.replace('workspace:', '');
    return acc;
  }, {});
const hasVersionEntry = versionsJSON.find(v => getMajorVersion(v.version) === currentMajorVersion);
const allMajors = versionsJSON
  .map(v => getMajorVersion(v.version))
  .filter(n => typeof n !== 'number')
  .sort((a, b) => b - a);
const latestMajor = allMajors[0];
// Update an url. If it's from the current prod release, don't append a /vX path
const getURL = majorVersion =>
  majorVersion === latestMajor
    ? 'https://design-system.post.ch'
    : `https://design-system.post.ch/v${majorVersion}`;
const getTitle = majorVersion =>
  majorVersion === latestMajor ? 'Current' : `Version ${majorVersion}`;

// Update or add an entry
let updatedVersions;
if (hasVersionEntry) {
  // Update the existing entry
  updatedVersions = versionsJSON.map(version => {
    const localMajorVersion = getMajorVersion(version.version);

    // Not the current release
    if (localMajorVersion !== currentMajorVersion) return version;

    return {
      ...version,
      version: packageJSON.version,
      description: packageJSON.description,
      url: getURL(localMajorVersion),
      lastUpdated: Date.now(),
      dependencies: interestingDependencies,
    };
  });
} else {
  // Add a new entry and sort based on version number
  updatedVersions = [
    // Update URL and title on past releases to prevent two URLs going to prod
    ...versionsJSON.map(v => ({
      ...v,
      url: getURL(getMajorVersion(v.version)),
      title: getTitle(getMajorVersion(v.version)),
    })),
    {
      title: getTitle(currentMajorVersion),
      version: packageJSON.version,
      description: packageJSON.description,
      created: Date.now(),
      lastUpdated: Date.now(),
      url: getURL(currentMajorVersion),
      dependencies: interestingDependencies,
    },
  ].sort((a, b) => (a.version > b.version ? -1 : 1));
}

fs.writeFileSync(versionsPath, JSON.stringify(updatedVersions, null, 2));
