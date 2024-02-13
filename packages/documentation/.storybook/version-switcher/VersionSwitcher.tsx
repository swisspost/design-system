import { IconButton } from '@storybook/components';
import React, { useState, useEffect } from 'react';
import { PostPopovercontainer } from '@swisspost/design-system-components-react';

const designSystemURL = 'https://design-system.post.ch/assets/versions.json';

interface VersionInterface {
  title: string;
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
interface VersionsInterface extends Array<VersionInterface> {}

function VersionSwitcher() {
  const [versions, setVersions] = useState<VersionsInterface>([]);
  const [loading, setLoading] = useState(true);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target: HTMLElement = e.target as HTMLElement;
    (document.getElementById('Version-Switcher-Popover') as HTMLPostPopovercontainerElement).toggle(
      target,
    );
  };
  useEffect(() => {
    async function fetchVersions() {
      try {
        const response = await fetch(designSystemURL);
        const versionsJSON = await response.json();
        setVersions(versionsJSON);
        setLoading(false);
      } catch (error) {
        console.log(`failed to fetch versions file. Errormessage: ${error}`);
      }
    }
    fetchVersions();
  }, []);

  if (loading) {
    return <div>Loadinf...</div>;
  }

  return (
    <div>
      <IconButton
        title="Versions"
        placeholder="Versions"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e)}
      >
        Versions
      </IconButton>
      <PostPopovercontainer id="Version-Switcher-Popover" placement="bottom">
        <div className="version-switcher-dropdown">
          {versions.map(version => (
            <a className="version-switcher-dropdown-item" key={version.title} href={version.url}>
              <span>{version.title}</span>
              {version.dependencies ? (
                <div className="icons">
                  <span>
                    <img src="/assets/images/technologies/logo-angular.svg" alt="angular logo" />
                    {version.dependencies['@angular/core']}
                  </span>
                  <span>
                    <img
                      src="/assets/images/technologies/logo-bootstrap.svg"
                      alt="bootstrap logo"
                    />
                    {version.dependencies['bootstrap']}
                  </span>
                  <span>
                    <img
                      src="/assets/images/technologies/logo-ng-bootstrap.svg"
                      alt="ng-bootstrap logo"
                    />
                    {version.dependencies['@ng-bootstrap/ng-bootstrap']}
                  </span>
                </div>
              ) : (
                ''
              )}
            </a>
          ))}
        </div>
      </PostPopovercontainer>
    </div>
  );
}

export default VersionSwitcher;
