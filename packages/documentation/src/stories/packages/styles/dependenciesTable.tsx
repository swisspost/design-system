import React, { useEffect, useState } from 'react';
import * as packageJson from '../../../../package.json';
import { getVersion } from '@/utils/version';

const VERSIONS_URL = 'https://design-system.post.ch/assets/versions.json';
const STYLES_VERSION = packageJson.dependencies['@swisspost/design-system-styles'] ?? '';
const CURRENT_VERSION = Number(getVersion(STYLES_VERSION, 'major'));

interface VersionEntry {
  title: string;
  version: string;
  dependencies: {
    '@angular/core'?: string;
    '@ng-bootstrap/ng-bootstrap'?: string;
    'bootstrap'?: string;
    [key: string]: string | undefined;
  };
}

const DependenciesTable: React.FC = () => {
  const [versions, setVersions] = useState<VersionEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(VERSIONS_URL)
      .then(res => {
        if (!res.ok) setError('Failed to fetch versions.json.');
        return res.json();
      })
      .then(data => {
        const filtered = (data as VersionEntry[]).filter(
          entry => Number(getVersion(entry.version, 'major')) <= CURRENT_VERSION,
        );
        setVersions(filtered);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const formatVersion = (version: string | undefined, majorOnly = false): string => {
    if (!version) return 'N/A';

    const formatSingle = (v: string): string => {
      const cleaned = v.trim().replace(/[\^~]/g, '');
      const match = cleaned.match(/^(\d+)(?:\.(\d+))?/);
      if (!match) return cleaned;
      return majorOnly ? `${match[1]}.x` : `${match[1]}.${match[2] || '0'}`;
    };

    return version.includes('||')
      ? version.split('||').map(formatSingle).join(' || ')
      : formatSingle(version);
  };

  const getVersionLabel = (version: string): string => {
    if (version.includes(' - ')) {
      return version;
    }
    const match = version.match(/^(\d+)\./);
    return match ? `${match[1]}.x` : version;
  };

  if (loading) return <p>Loading versions...</p>;
  if (error) return <p>Error loading versions: {error}</p>;

  return (
    <div className="table-responsive table-fit-content text-start">
      <table aria-describedby="dependencies" className="table">
        <thead>
          <tr>
            {['Version', 'Bootstrap', 'Angular', 'ng-Bootstrap'].map(header => (
              <th key={header} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {versions.map(entry => (
            <tr key={entry.version}>
              <th scope="col">{getVersionLabel(entry.version)}</th>
              <td>{formatVersion(entry.dependencies.bootstrap)}</td>
              <td>{formatVersion(entry.dependencies['@angular/core'], true)}</td>
              <td>{formatVersion(entry.dependencies['@ng-bootstrap/ng-bootstrap'], true)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DependenciesTable;
