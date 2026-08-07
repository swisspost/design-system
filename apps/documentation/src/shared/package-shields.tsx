import React, { useEffect, useState } from 'react';
import type { Versions, Version } from '@root/.storybook/helpers/get-versions-json';
import {
  getVersions,
  getDistTag,
  getCurrentVersion,
  getCurrentDistTag,
} from '@root/.storybook/helpers/get-versions-json';

interface PackageShieldsProps {
  packageName: string;
}

type VersionWithDistTag = Version & { distTag?: string };

type VersionsWithDistTag = Versions & VersionWithDistTag[];

export const PackageShields: React.FC<PackageShieldsProps> = ({ packageName }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [versions, setVersions] = useState<VersionsWithDistTag>([]);
  const [currentVersion, setCurrentVersion] = useState<VersionWithDistTag | null>(null);

  useEffect(() => {
    setLoading(true);

    Promise.all([getVersions(), getCurrentVersion(), getCurrentDistTag()])
      .then(async ([versions, currentVersion, currentDistTag]) => {
        if (packageName && versions && currentVersion) {
          await Promise.all(versions.map(async v => ({ ...v, distTag: await getDistTag(v) })))
            .then(versions => versions.filter(v => v !== currentVersion))
            .then(setVersions);
          setCurrentVersion({ ...currentVersion, distTag: currentDistTag });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [packageName]);

  function getVersionPackage(version: VersionWithDistTag | null): string {
    return version?.dependencies?.[packageName] ?? '';
  }

  function getVersionDistTag(version: VersionWithDistTag | null, separator: string = '/'): string {
    return version?.distTag ? `${separator}${version.distTag}` : '';
  }

  function renderVersionShields(
    version: VersionWithDistTag | null,
    renderTitle: boolean = true,
  ): React.ReactNode {
    const packageVersion = getVersionPackage(version);
    const renderStats = version === currentVersion;
    const renderWithNoDistTag = version !== null && version.distTag === '';

    if (loading) {
      return <span className="fs-11">Loading...</span>;
    }

    return (
      <p className="col m-0">
        {<strong className={`d-block${renderTitle ? '' : ' d-sm-none'}`}>Package</strong>}
        <span
          className="d-flex flex-wrap gap-4 align-items-center"
          aria-live="polite"
          style={{ minHeight: '20px' }}
        >
          {renderWithNoDistTag ? (
            <a href={`https://www.npmjs.com/package/${packageName}/v/${packageVersion}`}>
              <img
                alt={`${packageName}@${packageVersion} NPM version`}
                src={`https://img.shields.io/badge/npm-${encodeURIComponent(packageVersion)}-%23fc0`}
              />
            </a>
          ) : (
            <React.Fragment>
              <a href={`https://www.npmjs.com/package/${packageName}/v/${packageVersion}`}>
                <img
                  alt={`${packageName}${getVersionDistTag(version, '@')} NPM version`}
                  src={`https://img.shields.io/npm/v/${packageName}${getVersionDistTag(version)}?style=flat&color=%23fc0`}
                />
              </a>
              <img
                alt={`${packageName}${getVersionDistTag(version, '@')} NPM last update`}
                src={`https://img.shields.io/npm/last-update/${packageName}${getVersionDistTag(version)}?style=flat`}
              />
              {renderStats && (
                <React.Fragment>
                  <img
                    alt={`${packageName} NPM License`}
                    src={`https://img.shields.io/npm/l/${packageName}?style=flat`}
                  />
                  <img
                    alt={`${packageName} weekly downloads`}
                    src={`https://img.shields.io/npm/dw/${packageName}?style=flat&color=%23ccc`}
                  />
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </span>
      </p>
    );
  }

  function renderVersionPeerShields(
    version: VersionWithDistTag | null,
    renderTitle: boolean = true,
  ): React.ReactNode {
    const peers = Object.entries(version?.peerDependencies?.[packageName] ?? {});

    return (
      <React.Fragment>
        {!loading && peers.length > 0 ? (
          <p className="col-sm-6 m-0 text-sm-end">
            <strong className={`d-block${renderTitle ? '' : ' d-sm-none'}`}>
              Peer Dependencies
            </strong>
            <span className="d-flex flex-wrap gap-4 justify-content-sm-end align-items-center">
              {peers.map(([peerName, peerVersion]: [string, string]) => {
                const shieldPeerName = encodeURIComponent(peerName.replaceAll(/-/g, '--'));
                const shieldPeerVersion = encodeURIComponent(
                  peerVersion.replaceAll(/workspace:/g, ''),
                );

                return (
                  <img
                    key={peerName}
                    alt={`${packageName} peer dependency ${peerName}: ${peerVersion}`}
                    src={`https://img.shields.io/badge/${shieldPeerName}-${shieldPeerVersion}-%23686abb`}
                  />
                );
              })}
            </span>
          </p>
        ) : null}
      </React.Fragment>
    );
  }

  function renderVersion(
    version: VersionWithDistTag | null,
    renderTitle: boolean = true,
  ): React.ReactNode {
    const isCurrent = version === currentVersion;

    return (
      <React.Fragment key={version?.title || ''}>
        <div className={`d-sm-flex position-relative${renderTitle ? '' : ' mt-8 pt-8 border-top'}`}>
          {renderVersionShields(version, renderTitle)}
          {renderVersionPeerShields(version, renderTitle)}
        </div>
        {isCurrent && (
          <div className="text-end mt-8">
            <button
              command="show-modal"
              commandfor="PackageShieldsDialog"
              className="btn btn-link fs-9"
            >
              Show Package History <post-icon name="history" />
            </button>
          </div>
        )}
      </React.Fragment>
    );
  }

  return (
    <div>
      {renderVersion(currentVersion)}

      <hr className="mb-32" />
      {/* only render versions which contain a packageVersion of given packageName */}
      <dialog
        id="PackageShieldsDialog"
        className="post-dialog"
        closedby="any"
        aria-labelledby="PackageShieldsDialogLabel"
        aria-describedby="PackageShieldsDialogDescription"
        data-size="large"
        data-position="top"
        data-animation="slide-in"
        style={{ width: '90vw', minWidth: 'min(1000px, 90vw)' }}
      >
        <div className="dialog-grid">
          <h3 className="dialog-header" id="PackageShieldsDialogLabel">
            Package History
          </h3>
          <div className="dialog-body">
            {versions.filter(v => getVersionPackage(v)).map((v, i) => renderVersion(v, i === 0))}
          </div>
          <post-closebutton button-type="button">Close</post-closebutton>
        </div>
      </dialog>
    </div>
  );
};
