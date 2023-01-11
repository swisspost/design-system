import React from 'react';
import { objectify } from '../../../utils/sass-export.ts';
import { forEach } from '../../../utils/react.ts';
import scss from './text.export.scss';

interface IAvailableClassesAndVariablesProps {
  variants: string[],
  cssSlot: string,
  cssPrefix: string,
  scssSlot: string,
  scssPrefix: string,
};

export const SCSS_VARIABLES = objectify(scss);

export function AvailableClassesAndVariables (props: IAvailableClassesAndVariablesProps) {
  return <div>
    <dl className="row">
      <dt className="col-3">Classes:</dt>
      <dd className="col-9">
        { props.cssSlot ? props.cssSlot : forEach(props.variants, (data: { key: number, value: any }) => <code key={ data.key } className="me-2">{ `${props.cssPrefix}-${data.value}` }</code>) }
      </dd>
      <dt className="col-3">Variables:</dt>
      <dd className="col-9">
      { props.scssSlot ? props.scssSlot : forEach(props.variants, (data: { key: number, value: any }) => <code key={ data.key } className="me-2">{ `$${props.scssPrefix}-${data.value}` }</code>) }
      </dd>
    </dl>
  </div>;
};
