import { JSXBase } from '@stencil/core/internal';

export const If = (
  props: {
    condition: boolean;
  },
  children: JSXBase.IntrinsicElements,
) => {
  if (!props.condition) {
    return null;
  }
  return children;
};
