import stencilConfig from '@stencil/ssr/next';

type StencilConfigFunction = typeof stencilConfig;
type NextConfig = ReturnType<ReturnType<StencilConfigFunction>>;

export const postSSR = (nextConfig: NextConfig): NextConfig => {
  return stencilConfig({
    module: import('./stencil-generated/components.js'),
    from: '@swisspost/design-system-components-react',
    hydrateModule: import('@swisspost/design-system-components/hydrate'),
  })(nextConfig);
};
