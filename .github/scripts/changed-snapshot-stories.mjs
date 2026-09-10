#!/usr/bin/env node

/**
 * Matches the files changed in a pull request against the snapshot stories known to storybook.
 *
 * Usage: node changed-snapshot-stories.mjs <changed-files.json|-> <storybook-index.json> [--verbose]
 * Pass "-" to read a newline separated file list from stdin.
 * Output: JSON array of story ids (e.g. ["snapshots--button-group"]) on stdout, report on stderr.
 */

import { readFileSync } from 'node:fs';

const args = process.argv.slice(2);
const verbose = args.includes('--verbose');
const [changedFilesPath, storybookIndexPath] = args.filter(arg => !arg.startsWith('--'));

const changedFiles =
  changedFilesPath === '-'
    ? readFileSync(0, 'utf8').split('\n').filter(Boolean)
    : JSON.parse(readFileSync(changedFilesPath, 'utf8'));

const storybookIndex = JSON.parse(readFileSync(storybookIndexPath, 'utf8'));

// Naive singular form, so that "tables.scss" still matches the "table" story.
const tokenize = value =>
  value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .map(token => token.replace(/s$/, ''));

// The index is built from pull request code, so ids that could not be embedded safely are dropped.
const stories = Object.values(storybookIndex.entries ?? {})
  .filter(entry => entry.type === 'story' && entry.title === 'Snapshots')
  .filter(entry => /^snapshots--[a-z0-9]+(-[a-z0-9]+)*$/.test(entry.id))
  .map(entry => ({ id: entry.id, tokens: tokenize(entry.id.replace(/^snapshots--/, '')) }));

function indexOfTokens(haystack, needle) {
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    if (needle.every((token, offset) => haystack[i + offset] === token)) return i;
  }
  return -1;
}

// The most specific match wins, so "selection-card.scss" resolves to the selection card and not to the card.
function bestMatch(candidate) {
  const tokens = tokenize(candidate);

  return stories
    .map(story => ({ story, at: indexOfTokens(tokens, story.tokens) }))
    .filter(({ at }) => at !== -1)
    .sort((a, b) => b.story.tokens.length - a.story.tokens.length || a.at - b.at)[0]?.story;
}

const storyIds = new Set();

for (const file of changedFiles) {
  const segments = file.split('/');
  const fileName = segments.pop().replace(/\.[^.]+$/, '');
  const folderName = segments.pop() ?? '';

  const match = bestMatch(fileName) ?? bestMatch(folderName);
  if (match) storyIds.add(match.id);

  if (verbose) console.error(`${match ? match.id.padEnd(40) : '-'.padEnd(40)} ${file}`);
}

if (verbose) console.error(`\n${storyIds.size} snapshot stories from ${changedFiles.length} files`);

process.stdout.write(JSON.stringify([...storyIds].sort()));
