import fs from 'fs';
import path from 'path';

const args = process.argv.splice(2);
const versionsPath = path.resolve(process.cwd(), args[1]);
const packagePath = path.resolve(process.cwd(), args[3]);

const getMajorVersion = version => version.split('.')[0];

if (!fs.existsSync(versionsPath)) {
  throw new Error(`versions.json could not be found at ${versionsPath}`);
}

if (!fs.existsSync(packagePath)) {
  throw new Error(`package.json could not be found at ${packagePath}`);
}

const packageJSON = JSON.parse(fs.readFileSync(packagePath));
const versionsJSON = JSON.parse(fs.readFileSync(versionsPath));

const currentMajorVersion = getMajorVersion(packageJSON.version);
const allDependencies = { ...packageJSON.dependencies, ...packageJSON.devDependencies };
const hasVersionEntry = versionsJSON.find(
  v => 'version' in v && getMajorVersion(v.version) === currentMajorVersion,
);
const interestingKeywords = ['@swisspost', '@angular/core', 'react', 'bootstrap'];

let updatedVersions;
if (hasVersionEntry) {
  // Update the existing entry
  updatedVersions = versionsJSON.map(version => {
    if (!('version' in version) || getMajorVersion(version.version) !== currentMajorVersion)
      return version;

    const updatedVersion = {
      ...version,
      version: packageJSON.version,
      dependencies:
        'dependencies' in version
          ? Object.keys(version.dependencies).reduce((acc, key) => {
              acc[key] = allDependencies[key].replace('workspace:', '');
              return acc;
            }, {})
          : null,
    };

    return updatedVersion;
  });
} else {
  console.log(allDependencies);
  // Add a new entry and sort based on version number
  updatedVersions = [
    ...versionsJSON,
    {
      title: `Version ${currentMajorVersion}`,
      version: packageJSON.version,
      description: packageJSON.description,
      url: `https://design-system.post.ch/v${currentMajorVersion}`,
      dependencies: Object.keys(allDependencies)
        .filter(k => interestingKeywords.some(i => k.includes(i)))
        .reduce((acc, key) => {
          acc[key] = allDependencies[key];
          return acc;
        }, {}),
    },
  ].sort((a, b) => (a.version > b.version ? -1 : 1));
}

fs.writeFileSync(versionsPath, JSON.stringify(updatedVersions, null, 2));
