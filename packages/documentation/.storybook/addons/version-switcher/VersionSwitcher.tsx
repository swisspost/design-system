import { IconButton, WithTooltip } from '@storybook/components';
import React, { useEffect, useState } from 'react';
import { getVersion } from '../../../src/utils/version';
import * as packageJson from '../../../package.json';

const DESIGN_SYSTEM_URL = 'https://design-system.post.ch/assets/versions.json';
const BROWSED_VERSION = getVersion(
  packageJson.dependencies['@swisspost/design-system-styles'] || '',
  'majorminor',
);

interface Version {
  title: string;
  version?: string;
  description: string;
  url: string;
  dependencies?: {
    ['@angular/core']: string;
    ['@ng-bootstrap/ng-bootstrap']: string;
    ['@swisspost/design-system-intranet-header']: string;
    ['@swisspost/design-system-styles']: string;
    bootstrap: string;
  };
}

function VersionSwitcher() {
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVersions() {
      try {
        const response = await fetch(DESIGN_SYSTEM_URL);
        const versionsJSON = await response.json();
        setVersions(versionsJSON);
        setLoading(false);
      } catch (error) {
        console.log(`Failed to fetch versions file. Errormessage: ${error}`);
      }
    }
    void fetchVersions();
  }, []);

  if (loading) return <div className="version-switcher__loading">Loading...</div>;

  return (
    <WithTooltip
      placement="bottom"
      trigger="click"
      closeOnOutsideClick
      tooltip={() => (
        <>
          <IconButton
            placeholder="Versions"
            className="version_switcher__sizing_placeholder"
            aria-hidden="true"
          >
            v{BROWSED_VERSION}
            <post-icon name="2052"></post-icon>
          </IconButton>
          <div className="version-switcher__dropdown">
            {versions.map(version => {
              const isActive =
                getVersion(version.version || '', 'majorminor') === BROWSED_VERSION ? 'active' : '';
              const deps = Object.entries(version.dependencies || [])
                .filter(([k]) => !/^@swisspost\//.test(k))
                .map(([k, v]) => ({
                  key: k,
                  name: k.match(/(?:@?)([^/]+)/)?.[1],
                  version: v,
                }));

              return (
                <a
                  className={['dropdown__item', isActive].filter(c => c).join(' ')}
                  key={version.title}
                  href={version.url}
                >
                  <span className="item__title">v{version.version}</span>
                  <span className="item__deps">
                    {deps.map(d => (
                      <span key={d.key} className="deps_dep" title={d.key}>
                        {d.name !== null ? (
                          <img
                            className="dep__icon"
                            src={`/assets/images/technologies/logo-${d.name}.svg`}
                            alt={`${d.key} logo`}
                          />
                        ) : null}
                        <span className="dep__version">{d.version}</span>
                      </span>
                    ))}
                  </span>
                </a>
              );
            })}
          </div>
        </>
      )}
    >
      <IconButton placeholder="Versions">
        v{BROWSED_VERSION}
        <post-icon name="2052"></post-icon>
      </IconButton>
    </WithTooltip>
  );
}

export default VersionSwitcher;
