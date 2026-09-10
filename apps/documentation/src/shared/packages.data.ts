import { PackageType } from '@root/types';
import metaStyles from '@/stories/packages/styles/styles.stories';
import metaComponents from '@/stories/packages/components/components.stories';
import metaComponentsAngular from '@/stories/packages/components-angular/components-angular.stories';
import metaComponentsReact from '@/stories/packages/components-react/components-react.stories';
import metaInternetHeader from '@/stories/packages/internet-header/internet-header.stories';
import metaIcons from '@/stories/packages/icons/package-icons.stories';
import metaTokens from '@/stories/packages/tokens/tokens.stories';
import metaThemeAGGrid from '@/stories/packages/theme-ag-grid/theme-ag-grid.stories';
import { DEPENDENCIES, getVersion } from '@/utils/version';

export interface IPackage {
  type: PackageType;
  name: string;
  version: string;
  links: Record<'github' | 'docs', IPackageLink>;
  image: {
    src: string;
    alt: string;
  };
}

interface IPackageLink {
  href: string;
  ariaLabel: string;
}

export const packages: Record<string, IPackage> = {
  'styles': definePackage(
    PackageType.Styles,
    'Styles',
    'styles',
    'design-system-styles',
    metaStyles.id,
  ),
  'components': definePackage(
    PackageType.Wc,
    'Components',
    'components',
    'design-system-components',
    metaComponents.id,
  ),
  'components-angular': definePackage(
    PackageType.Angular,
    'Components for Angular',
    'components-angular',
    'design-system-components-angular',
    metaComponentsAngular.id,
  ),
  'components-react': definePackage(
    PackageType.React,
    'Components for React',
    'components-react',
    'design-system-components-react',
    metaComponentsReact.id,
  ),
  'internet-header': definePackage(
    PackageType.Wc,
    'Internet-Header',
    'internet-header',
    'internet-header',
    metaInternetHeader.id,
  ),
  'icons': definePackage(PackageType.Assets, 'Icons', 'icons', 'design-system-icons', metaIcons.id),
  'theme-ag-grid': definePackage(
    PackageType.Ts,
    'Theme AG Grid',
    'theme-ag-grid',
    'design-system-theme-ag-grid',
    metaThemeAGGrid.id,
  ),
  'tokens': definePackage(
    PackageType.Assets,
    'Tokens',
    'tokens',
    'design-system-tokens',
    metaTokens.id,
  ),
};

function definePackage(
  type: PackageType,
  name: string,
  packageName: string,
  dependencyName: string,
  metaId: string,
): IPackage {
  const version = getVersion(DEPENDENCIES[`@swisspost/${dependencyName}`]);

  return {
    type,
    name,
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
        href: `/?path=/docs/${metaId}--docs`,
      },
    },
    image: {
      src: `/assets/images/packages/${packageName}.svg`,
      alt: '',
    },
  };
}
