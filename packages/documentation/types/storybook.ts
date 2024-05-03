import { Args, Meta } from '@storybook/web-components';
import { PackageType } from './package';
import { DesignParameter } from '@/shared/link-design/link-design.component';

export interface MetaExtended<T = Args> extends Meta<T> {
  id: string; // Make id required
  title: string; // Make title required
}

export type TagPackagePrefix<K> = K extends string ? `package:${K}` : K;

export interface MetaComponent<T = Args> extends MetaExtended<T> {
  tags: [TagPackagePrefix<PackageType>, ...string[]];
  parameters: {
    [key: string]: any;
    design: DesignParameter;
  };
}
