import React from 'react';
import { forEach } from '../../../utils/react.ts';
import { parse } from '../../../utils/sass-export.ts';
import scss from './text.export.scss';

interface IAvailableClassesAndVariablesProps {
  variants: string[];
  cssSlot: string;
  cssPrefix: string;
  scssSlot: string;
  scssPrefix: string;
  hasVariable: boolean;
}

export const SCSS_VARIABLES = parse(scss);

export function AvailableClassesAndVariables(props: IAvailableClassesAndVariablesProps) {
  const cssPrefix = props.cssPrefix ? props.cssPrefix + '-' : '';
  const scssPrefix = props.scssPrefix ? props.scssPrefix + '-' : '';
  const hasVariable = props.hasVariable ?? true;

  return (
    <div>
      <dl className="row">
        <dt className="col-3">Class:</dt>
        <dd className="col-9">
          {props.cssSlot ?? <span className="fs-tiny text-danger">{`.${cssPrefix}{value}`}</span>}
        </dd>
        {hasVariable && [
          <dt key="variable-dt" className="col-3">
            Variable:
          </dt>,
          <dd key="variable-dd" className="col-9">
            {props.scssSlot ?? (
              <span className="fs-tiny text-danger">{`$${scssPrefix}{value}`}</span>
            )}
          </dd>,
        ]}
        <dt className="col-3">Values:</dt>
        <dd className="col-9">
          {forEach(props.variants, (data: { key: number; value: any }) => (
            <code key={data.key} className="me-2">
              {data.value}
            </code>
          ))}
        </dd>
      </dl>
    </div>
  );
}
