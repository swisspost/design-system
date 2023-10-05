import stylesVersions from '@swisspost/design-system-styles/package.json';
import componentsVersions from '@swisspost/design-system-components/package.json';
import internetHeaderVersions from '@swisspost/internet-header/package.json';
import componentsReactVersions from '@swisspost/design-system-components-react/package.json';
import documentationVersions from '../../../../package.json';

const dependencies = [
  stylesVersions,
  componentsVersions,
  internetHeaderVersions,
  componentsReactVersions,
];

interface PackageJSON {
  version: string;
  dependencies: { [key: string]: string };
  devDependencies: { [key: string]: string };
}

const getInterestingDependencies = (packageJson: PackageJSON): [string, string][] => {
  const dependencies = Object.entries({
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  });
  const interestingFullMatch = [
    'react',
    'bootstrap',
    '@angular/core',
    '@ng-bootstrap/ng-bootstrap',
  ];
  const interestingDesignSystem = '@swisspost/';

  return [
    ...dependencies.filter(([key]) => key.includes(interestingDesignSystem)),
    ...dependencies.filter(([key]) => interestingFullMatch.includes(key)),
  ];
};

export const DocumentationVersion = () => (
  <code>Design System Documentation v{documentationVersions.version}</code>
);

export const PackageVersions = (props: { dependencies?: [string, string][] }) => {
  const deps = props.dependencies ?? getInterestingDependencies(documentationVersions);
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: '50%' }}>Package</th>
            <th style={{ width: '50%' }}>Version</th>
          </tr>
        </thead>
        <tbody>
          {deps.map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value.replace('workspace:', '')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const PackageDependencies = () =>
  dependencies.map(dependency => (
    <div className="mt-5" key={dependency.name}>
      <h2 className="h4">{dependency.name}</h2>
      <PackageVersions dependencies={getInterestingDependencies(dependency)} />
    </div>
  ));
