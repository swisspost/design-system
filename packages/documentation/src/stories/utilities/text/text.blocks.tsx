import React from 'react';
import { parse } from '../../../utils/sass-export';
import scss from './text.module.scss';

export const SCSS_VARIABLES = parse(scss);

export const TextUtilityAPI = (props: {
  cssPrefix: string;
  scssPrefix?: string;
  values: string[];
}) => (
  <div>
    <dl className="row">
      {props.cssPrefix && (
        <>
          <dt className="col-3">Class:</dt>
          <dd className="col-9">
            <span className="fs-tiny text-danger">{`.${props.cssPrefix}-{value}`}</span>
          </dd>
        </>
      )}
      {props.scssPrefix && (
        <>
          <dt className="col-3">Variable:</dt>
          <dd className="col-9">
            <span className="fs-tiny text-danger">{`$${props.scssPrefix}-{value}`}</span>
          </dd>
        </>
      )}
      <dt className="col-3">Values:</dt>
      <dd className="col-9">
        {props.values.map((value, index) => (
          <code key={value} className="me-2">
            {value}
          </code>
        ))}
      </dd>
    </dl>
  </div>
);
