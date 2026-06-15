import { state } from '@/data/store';
import { LinkConfig } from '@/models/shared.model';
import { FunctionalComponent, h } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';

export type LinkProps = {
  hiddenText?: boolean;
  ariaCurrentWhenActive?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
} & JSXBase.HTMLAttributes;

export const Link: FunctionalComponent<{ config: LinkConfig } & LinkProps> = ({
  config,
  hiddenText,
  ariaCurrentWhenActive,
  ...htmlAttributes
}) => {
  const isActive = state.activeLink !== null ? config === state.activeLink : config.active;

  return (
    <a
      {...htmlAttributes}
      href={config.url}
      aria-label={config.label}
      aria-description={config.description}
      aria-current={isActive ? ariaCurrentWhenActive : undefined}
    >
      {hiddenText ? <span class="visually-hidden">{config.text}</span> : config.text}

      {'icon' in config && <post-icon aria-hidden="true" name={config.icon}></post-icon>}
      {'image' in config && <img src={config.image.src} alt={config.image.alt} />}
    </a>
  );
};
