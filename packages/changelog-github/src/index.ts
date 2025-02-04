/**
 * "Forked" from https://github.com/changesets/changesets/tree/main/packages/changelog-github
 * and updated with a custom output format
 */

import { ChangelogFunctions } from '@changesets/types';
import { config } from 'dotenv';
import { getInfo } from '@changesets/get-github-info';

config();

const changelogFunctions: ChangelogFunctions = {
  getDependencyReleaseLine: async (_changesets, dependenciesUpdated, options) => {
    if (!options.repo) {
      throw new Error(
        'Please provide a repo to this changelog generator like this:\n"changelog": ["@changesets/changelog-github", { "repo": "org/repo" }]',
      );
    }
    if (dependenciesUpdated.length === 0) return '';

    const changesetLink = `- Updated dependencies:`;

    const updatedDepenenciesList = dependenciesUpdated.map(
      dependency => `  - ${dependency.name}@${dependency.newVersion}`,
    );

    return [changesetLink, ...updatedDepenenciesList].join('\n');
  },
  getReleaseLine: async (changeset, _type, options) => {
    if (!options || !options.repo) {
      throw new Error(
        'Please provide a repo to this changelog generator like this:\n"changelog": ["@changesets/changelog-github", { "repo": "org/repo" }]',
      );
    }

    const replacedChangelog = changeset.summary.trim();

    const [firstLine, ...futureLines] = replacedChangelog.split('\n').map(l => l.trimEnd());

    const links = await (async () => {
      const commitToFetchFrom = changeset.commit;
      if (commitToFetchFrom) {
        const { links } = await getInfo({
          repo: options.repo,
          commit: commitToFetchFrom,
        });
        return links;
      }
      return {
        commit: null,
        pull: null,
        user: null,
      };
    })();

    const users = links.user;

    const pullOrCommit = links.pull || links.commit || null;
    const userString = users !== null ? `by ${users}` : '';
    const pullString = pullOrCommit !== null ? `with ${pullOrCommit}` : '';
    const hasUserOrPull = userString && pullString;
    const entry = [
      '\n\n- ',
      firstLine,
      futureLines.map(l => `  ${l}`).join('\n'),
      hasUserOrPull ? ' (' : '',
      [userString, pullString].join(' '),
      hasUserOrPull ? ')' : '',
    ];

    return entry.join('');
  },
};

export default changelogFunctions;
