import { FunctionalComponent, h } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { LinkConfig } from '@/models/shared.model';

export type LinkProps = {
  hiddenText?: boolean;
  ariaCurrentWhenActive?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
} & JSXBase.HTMLAttributes;

export const Link: FunctionalComponent<{ config: LinkConfig } & LinkProps> = ({
  config,
  hiddenText,
  ariaCurrentWhenActive,
  ...htmlAttributes
}) => (
  <a
    {...htmlAttributes}
    href={config.url}
    aria-label={config.label}
    aria-description={config.description}
    aria-current={config.active ? ariaCurrentWhenActive : undefined}
  >
    {hiddenText ? <span class="visually-hidden">{config.text}</span> : config.text}

    {'icon' in config && <post-icon aria-hidden="true" name={config.icon}></post-icon>}
    {'image' in config && <img src={config.image.src} alt={config.image.alt} />}
  </a>
);
