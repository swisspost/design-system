import React, { useEffect, useState } from 'react';
import type { Version } from '@root/.storybook/helpers/get-versions-json';
import { getCurrentVersion, getDistTag } from '@root/.storybook/helpers/get-versions-json';

interface PackageShieldsProps {
  packageName?: string;
}

export const PackageShields: React.FC<PackageShieldsProps> = ({ packageName = '' }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [packageVersion, setPackageVersion] = useState<string | null>(null);
  const [peerDependencies, setPeerDependencies] = useState<string[]>([]);
  const [distTag, setDistTag] = useState<string>('');

  useEffect(() => {
    setLoading(true);

    Promise.all([getCurrentVersion(), getDistTag()])
      .then(([currentVersion, distTag]) => {
        if (packageName && currentVersion) {
          const packageVersion = currentVersion.dependencies?.[packageName] ?? null;
          setPackageVersion(packageVersion);

          const peers = currentVersion.peerDependencies?.[packageName] ?? {};
          if (Object.keys(peers).length > 0) setPeerDependencies(Object.keys(peers));
        }

        if (distTag) setDistTag(distTag);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [packageName]);

  return (
    <React.Fragment>
      <div className="row">
        <p className="col-sm-6 m-0">
          <strong>Package</strong>
          <span
            className="d-flex flex-wrap gap-4 align-items-center"
            aria-live="polite"
            style={{ minHeight: '20px' }}
          >
            {loading ? (
              <span style={{ height: '20px' }} className="fs-11">
                Loading...
              </span>
            ) : (
              <React.Fragment>
                <a href={`https://www.npmjs.com/package/${packageName}/v/${packageVersion}`}>
                  <img
                    alt={`${packageName} version`}
                    src={`https://img.shields.io/npm/v/${packageName}/${distTag}?style=flat&color=%23fc0`}
                  />
                </a>
                <img
                  alt={`${packageName} NPM Last Update`}
                  src={`https://img.shields.io/npm/last-update/${packageName}/${distTag}?style=flat`}
                />
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
          </span>
        </p>

        {!loading && peerDependencies.length > 0 && (
          <p className="col-sm-6 m-0 text-sm-end">
            <strong>Peer Dependencies</strong>
            <span className="d-flex flex-wrap gap-4 justify-content-sm-end align-items-center">
              {peerDependencies.map((peerDependency: string) => (
                <img
                  key={peerDependency}
                  alt={`${packageName} peer dependency: ${peerDependency}`}
                  src={`https://img.shields.io/npm/dependency-version/${packageName}/peer/${peerDependency}?style=flat&color=%23686abb`}
                />
              ))}
            </span>
          </p>
        )}
      </div>
      <hr className="mb-32" />
    </React.Fragment>
  );
};
