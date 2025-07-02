import React from 'react';
import versionsData from '../../../../../public/assets/versions.json';

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
  const versions = versionsData as VersionEntry[];

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