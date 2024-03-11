import { IconButton, WithTooltip } from '@storybook/components';
import React, { Fragment, useEffect, useState } from 'react';
import { getVersion } from '../../../src/utils/version';

const DESIGN_SYSTEM_URL = 'https://design-system.post.ch/assets/versions.json';

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
        console.log(`failed to fetch versions file. Errormessage: ${error}`);
      }
    }
    void fetchVersions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const latestVersionMajorMinor = getVersion(
    versions.find(version => version?.version)?.version || '',
    'majorminor',
  );

  return (
    <Fragment>
      <WithTooltip
        placement="bottom"
        trigger="click"
        closeOnOutsideClick
        tooltip={() => {
          return (
            <div className="version-switcher-dropdown">
              {versions.map(version => (
                <a
                  className="version-switcher-dropdown-item"
                  key={version.title}
                  href={version.url}
                >
                  <span>{version.title}</span>
                  {version.dependencies ? (
                    <table className="version-switcher-dependencies">
                      <caption className="visually-hidden">Compatibility</caption>
                      <thead className="visually-hidden">
                        <tr>
                          <th scope="col">Angular</th>
                          <th scope="col">Bootstrap</th>
                          <th scope="col">Ng-bootstrap</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <span>
                              <img src="/assets/images/technologies/logo-angular.svg" alt="" />
                              {version.dependencies['@angular/core']}
                            </span>
                          </td>
                          <td>
                            <span>
                              <img src="/assets/images/technologies/logo-bootstrap.svg" alt="" />
                              {version.dependencies['bootstrap']}
                            </span>
                          </td>
                          <td>
                            <span>
                              <img src="/assets/images/technologies/logo-ng-bootstrap.svg" alt="" />
                              {version.dependencies['@ng-bootstrap/ng-bootstrap']}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ) : (
                    ''
                  )}
                </a>
              ))}
            </div>
          );
        }}
      >
        <IconButton placeholder="Versions">Versions {latestVersionMajorMinor}</IconButton>
      </WithTooltip>
    </Fragment>
  );
}

export default VersionSwitcher;
