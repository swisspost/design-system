import { Args, Meta } from '@storybook/web-components-vite';
import type { Globals } from '@shared/globals';
import { PackageTag, Tag } from '@shared/tags';
import { DesignParameter } from '@preview/blocks/story-links/story-links.component';

export interface MetaBase<T = Args> extends Omit<Meta<T>, 'tags' | 'globals'> {
  tags?: Tag[];
  globals?: Partial<Globals>;
}

export interface MetaExtended<T = Args> extends MetaBase<T> {
  id: string; // Make id required
  title: string; // Make title required
}

export interface MetaComponent<T = Args> extends MetaExtended<T> {
  tags: [PackageTag, ...Tag[]];
  parameters: {
    [key: string]: unknown;
    design: DesignParameter;
  };
}
