import { Args, Meta } from '@storybook/web-components';

export interface MetaExtended<T = Args> extends Meta<T> {
  id: string; // Make id required
  title: string; // Make title required
}
