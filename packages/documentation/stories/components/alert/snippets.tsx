export const CustomIconSnippet = `@use "@swisspost/design-system-styles/core" as post;

.pi-1000--white {
  @include post.pi(1000, 'white');
}

.pi-1000--success {
  @include post.pi(1000, 'success');
}`;

export const PackageImports = `@import "@swisspost/design-system-styles/index.scss";`;

export const ComponentImports = `@import "@swisspost/design-system-styles/basis.scss";
@import "@swisspost/design-system-styles/components/alert.scss";`;
