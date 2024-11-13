import React from 'react';

interface IFeatureProps {
  icon: string;
  title: string;
  children: React.ReactNode;
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
