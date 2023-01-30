import { h } from '@stencil/core';

export const SvgIcon = (props: { name: string; classNames?: string }) => (
  <svg viewBox="0 0 32 32" aria-hidden="true" class={props.classNames}>
    <use href={`#${props.name}`} />
  </svg>
);
