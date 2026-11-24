import metaStyles from '@preview/stories/packages/styles/styles.stories';
import metaComponents from '@preview/stories/packages/components/components.stories';
import metaComponentsAngular from '@preview/stories/packages/components-angular/components-angular.stories';
import metaComponentsReact from '@preview/stories/packages/components-react/components-react.stories';
import metaInternetHeader from '@preview/stories/packages/internet-header/internet-header.stories';
import metaIcons from '@preview/stories/packages/icons/package-icons.stories';
import metaTokens from '@preview/stories/packages/tokens/tokens.stories';
import metaThemeAGGrid from '@preview/stories/packages/theme-ag-grid/theme-ag-grid.stories';
import { bookmarkUrl } from '@shared/urls';
import { getPackageVersion } from '@shared/versions';

export type PackageType =
  | 'Styles'
  | 'WebComponents'
  | 'React'
  | 'Angular'
  | 'Assets'
  | 'Typescript';

export interface Package {
  type: PackageType;
  name: string;
  npmName: string;
  version: string;
  links: Record<'github' | 'docs', PackageLink>;
  image: {
    src: string;
    alt: string;
  };
}

interface PackageLink {
  href: string;
  ariaLabel: string;
}

export const packages: Record<string, Package> = {
  'styles': definePackage('Styles', 'Styles', 'styles', 'design-system-styles', metaStyles.id),
  'components': definePackage(
    'WebComponents',
    'Components',
    'components',
    'design-system-components',
    metaComponents.id,
  ),
  'components-angular': definePackage(
    'Angular',
    'Components for Angular',
    'components-angular',
    'design-system-components-angular',
    metaComponentsAngular.id,
  ),
  'components-react': definePackage(
    'React',
    'Components for React',
    'components-react',
    'design-system-components-react',
    metaComponentsReact.id,
  ),
  'internet-header': definePackage(
    'WebComponents',
    'Internet-Header',
    'internet-header',
    'internet-header',
    metaInternetHeader.id,
  ),
  'icons': definePackage('Assets', 'Icons', 'icons', 'design-system-icons', metaIcons.id),
  'theme-ag-grid': definePackage(
    'Typescript',
    'Theme AG Grid',
    'theme-ag-grid',
    'design-system-theme-ag-grid',
    metaThemeAGGrid.id,
  ),
  'tokens': definePackage('Assets', 'Tokens', 'tokens', 'design-system-tokens', metaTokens.id),
};

function definePackage(
  type: PackageType,
  name: string,
  packageName: string,
  dependencyName: string,
  metaId: string,
): Package {
  const npmName = `@swisspost/${dependencyName}`;
  const version = getPackageVersion(npmName);

  return {
    type,
    name,
    npmName,
    version: version !== null ? `v${version}` : '',
    links: {
      github: {
        ariaLabel: `Source of ${name} package`,
        href:
          'https://github.com/swisspost/design-system/tree/' +
          (version !== null
            ? `@swisspost/${dependencyName}@${version}/packages/${packageName}`
            : `main/packages/${packageName}`),
      },
      docs: {
        ariaLabel: `Getting started with ${name} package`,
        href: bookmarkUrl(metaId),
      },
    },
    image: {
      src: `/assets/images/packages/${packageName}.svg`,
      alt: '',
    },
  };
}
