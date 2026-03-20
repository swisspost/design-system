import { FunctionalComponent, h } from '@stencil/core';
import { LinkConfig } from '@/models/shared.model';
import { JSXBase } from '@stencil/core/internal';

export interface LinkProps extends JSXBase.AnchorHTMLAttributes<HTMLAnchorElement> {
  hiddenText?: boolean;
}

export const Link: FunctionalComponent<LinkProps & { config: LinkConfig }> = ({
  config,
  hiddenText,
  ...props
}) => (
  <a {...props} href={config.url} aria-label={config.label} aria-description={config.description}>
    {'icon' in config && <post-icon aria-hidden="true" name={config.icon}></post-icon>}
    {'image' in config && <img src={config.image.src} alt={config.image.alt} />}

    {hiddenText ? <span class="visually-hidden">{config.text}</span> : config.text}
  </a>
);
