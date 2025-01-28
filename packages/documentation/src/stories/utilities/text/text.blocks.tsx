import React from 'react';
import { parse } from '@/utils/sass-export';
import scss from './text.module.scss';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const SCSS_VARIABLES: any = parse(scss);

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
            <span className="fs-tiny">{`.${props.cssPrefix}-{value}`}</span>
          </dd>
        </>
      )}
      {props.scssPrefix && (
        <>
          <dt className="col-3">Variable:</dt>
          <dd className="col-9">
            <span className="fs-tiny">{`$${props.scssPrefix}-{value}`}</span>
          </dd>
        </>
      )}
      <dt className="col-3">Values:</dt>
      <dd className="col-9">
        {props.values.map(value => (
          <code key={value} className="me-8">
            {value}
          </code>
        ))}
      </dd>
    </dl>
  </div>
);
