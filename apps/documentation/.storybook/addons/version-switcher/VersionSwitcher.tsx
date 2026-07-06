import { IconButton, WithTooltip } from 'storybook/internal/components';
import React, { useEffect, useState, version } from 'react';
import { getVersion } from '../../../src/utils/version';
import type { Versions, Version } from '../../helpers/get-versions-json';
import { getVersions, getCurrentVersion } from '../../helpers/get-versions-json';

function VersionSwitcher() {
  const [loading, setLoading] = useState<boolean>(true);
  const [versions, setVersions] = useState<Versions>([]);
  const [currentVersion, setCurrentVersion] = useState<Version | null>(null);
  const [currentMajorVersion, setCurrentMajorVersion] = useState<string>('');

  useEffect(() => {
    setLoading(true);

    Promise.all([getVersions(), getCurrentVersion()])
      .then(([versions, currentVersion]) => {
        setVersions(versions);
        setCurrentVersion(currentVersion);
        setCurrentMajorVersion(getVersion(currentVersion?.version ?? '', 'major') ?? '');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div role="status" aria-live="polite" className="spinner spinner-12">
        <span className="visually-hidden">Loading…</span>
      </div>
    );
  }

  return (
    <WithTooltip
      placement="bottom"
      trigger="click"
      closeOnOutsideClick
      tooltip={() => (
        <>
          <div className="addon-dropdown version-switcher__dropdown">
            {versions?.map(v => {
              const isActive =
                getVersion(v.version ?? '', 'major') === currentMajorVersion ? 'active' : '';
              const deps = Object.entries(v.dependencies || [])
                .filter(([k]) => !/^@swisspost\//.test(k))
                .map(([k, v]) => ({
                  key: k,
                  name: k.match(/(?:@?)([^/]+)/)?.[1],
                  version: v,
                }));

              return (
                <a
                  className={['addon-dropdown__item', isActive].filter(c => c).join(' ')}
                  key={v.title}
                  href={v.url}
                >
                  <span className="item__title">v{getVersion(v.version, 'major')}</span>
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
          <IconButton
            placeholder="Versions"
            className="version_switcher__sizing_placeholder"
            aria-hidden="true"
          >
            {`v${currentMajorVersion}`}
            <post-icon name="chevrondown"></post-icon>
          </IconButton>
        </>
      )}
    >
      <IconButton placeholder="Versions" className="addon-label">
        {`v${currentMajorVersion}`}
        <post-icon name="chevrondown"></post-icon>
      </IconButton>
    </WithTooltip>
  );
}

export default VersionSwitcher;
