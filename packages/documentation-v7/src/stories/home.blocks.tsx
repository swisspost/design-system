import React from 'react';

interface ITileProps {
  title?: string;
  href?: string;
  children: React.ReactNode;
}

interface IFeatureProps {
  icon: string;
  title: string;
  children: React.ReactNode;
}

export function Tile(props: ITileProps) {
  const isLink = props.href !== undefined;
  const Tag = isLink ? 'a' : 'div';
  const attributes = isLink ? { href: props.href, target: '_blank', rel: 'noopener' } : null;

  return (
    <Tag className="tile" {...attributes}>
      {props.title ? <span className="tile--title">{props.title}</span> : null}
      <span className="tile--icon">{props.children}</span>
    </Tag>
  );
}

export function Feature(props: IFeatureProps) {
  return (
    <div className="feature">
      <post-icon name={props.icon} class="feature--icon"></post-icon>
      <div className="feature--content">
        <h3 className="content--title">{props.title}</h3>
        {props.children}
      </div>
    </div>
  );
}
