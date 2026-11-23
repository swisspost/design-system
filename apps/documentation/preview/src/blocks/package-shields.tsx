import React, { useEffect, useRef, useState } from 'react';
import type { Release } from '@shared/versions';
import { getReleases, getLatestRelease } from '@shared/versions';

interface PackageShieldsProps {
  packageName: string;
}

export const PackageShields: React.FC<PackageShieldsProps> = ({ packageName }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [releases, setReleases] = useState<Release[]>([]);
  const [currentRelease, setCurrentRelease] = useState<Release | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleToggle = (event: Event) => {
      setDialogOpen((event as Event & { newState?: string }).newState === 'open');
    };

    dialog.addEventListener('toggle', handleToggle);
    return () => dialog.removeEventListener('toggle', handleToggle);
  }, []);

  useEffect(() => {
    setLoading(true);

    Promise.all([getReleases(), getLatestRelease()])
      .then(([releases, currentRelease]) => {
        if (packageName && currentRelease) {
          setReleases(releases.filter(release => release !== currentRelease));
          setCurrentRelease(currentRelease);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [packageName]);

  function getReleasePackageVersion(release: Release | null): string {
    return release?.dependencies?.[packageName] ?? '';
  }

  function getReleaseDistTag(release: Release | null, separator: string = '/'): string {
    return release?.distTag ? `${separator}${release.distTag}` : '';
  }

  function renderReleaseShields(
    release: Release | null,
    renderTitle: boolean = true,
  ): React.ReactNode {
    const packageVersion = getReleasePackageVersion(release);
    const renderStats = release === currentRelease;
    const renderWithNoDistTag = release !== null && release.distTag === '';

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
                  alt={`${packageName}${getReleaseDistTag(release, '@')} NPM version`}
                  src={`https://img.shields.io/npm/v/${packageName}${getReleaseDistTag(release)}?style=flat&color=%23fc0`}
                />
              </a>
              <img
                alt={`${packageName}${getReleaseDistTag(release, '@')} NPM last update`}
                src={`https://img.shields.io/npm/last-update/${packageName}${getReleaseDistTag(release)}?style=flat`}
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

  function renderReleasePeerShields(
    release: Release | null,
    renderTitle: boolean = true,
  ): React.ReactNode {
    const peers = Object.entries(release?.peerDependencies?.[packageName] ?? {});

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

  function renderRelease(release: Release | null, renderTitle: boolean = true): React.ReactNode {
    const isCurrent = release === currentRelease;

    return (
      <React.Fragment key={release?.title || ''}>
        <div className={`d-sm-flex gap-24${renderTitle ? '' : ' mt-8 pt-8 border-top'}`}>
          {renderReleaseShields(release, renderTitle)}
          {renderReleasePeerShields(release, renderTitle)}
        </div>
        {isCurrent && (
          <div className="text-end mt-8">
            <button
              type="button"
              className="btn btn-link fs-9"
              onClick={() => dialogRef.current?.showModal()}
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
      {renderRelease(currentRelease)}

      <hr className="mb-32" />
      {/* only render releases which contain a packageVersion of given packageName */}
      <dialog
        ref={dialogRef}
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
            {dialogOpen &&
              releases
                .filter(v => getReleasePackageVersion(v))
                .map((v, i) => renderRelease(v, i === 0))}
          </div>
          <post-closebutton button-type="button">Close</post-closebutton>
        </div>
      </dialog>
    </div>
  );
};
