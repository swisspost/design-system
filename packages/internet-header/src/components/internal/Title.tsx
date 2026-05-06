import { FunctionalComponent, h } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { AccessibleTextConfig, LinkConfig } from '@/models/shared.model';
import { Link } from './Link';

type TitleConfig = string | AccessibleTextConfig | LinkConfig;

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type InlineTag = 'p' | 'span';
type TitleTag = HeadingTag | InlineTag;

export type TitleProps = {
  tag?: TitleTag;
} & JSXBase.HTMLAttributes;

function isLinkConfig(config: TitleConfig): config is LinkConfig {
  return typeof config !== 'string' && 'url' in config;
}

function isInlineTag(tag: TitleTag): tag is InlineTag {
  return tag === 'p' || tag === 'span';
}

function resolveTextAttributes(config: string | AccessibleTextConfig) {
  if (typeof config === 'string') return { innerHTML: config };

  return {
    'innerHTML': config.text,
    'aria-label': config.label,
    'aria-description': config.description,
  };
}

export const Title: FunctionalComponent<{ config: TitleConfig } & TitleProps> = ({
  config,
  tag: TagName = 'p',
  ...htmlAttributes
}) => {
  if (isLinkConfig(config)) {
    // Inline tags render the Link directly; heading tags wrap it
    return isInlineTag(TagName) ? (
      <Link {...htmlAttributes} config={config} />
    ) : (
      <TagName {...htmlAttributes}>
        <Link config={config} />
      </TagName>
    );
  }

  return <TagName {...htmlAttributes} {...resolveTextAttributes(config)} />;
};
