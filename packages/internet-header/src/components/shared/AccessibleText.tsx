import { FunctionalComponent, h } from '@stencil/core';
import { AccessibleTextConfig } from '@/models/shared.model';

export interface AccessibleTextProps<T extends AccessibleTextConfig = AccessibleTextConfig> {
  tag?: string;
  config: T;
  [key: string]: unknown; // for extra attributes
}

export const AccessibleText: FunctionalComponent<AccessibleTextProps> = (
  { tag: Tag = 'span', config, ...otherAttributes },
  children,
) => {
  return <Tag {...otherAttributes}>{children.length ? children : config.text}</Tag>;
};
