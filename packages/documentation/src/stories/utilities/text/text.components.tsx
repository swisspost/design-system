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

export function ColorUtilities (props: {}) {
  return <article className="mb-3 sb-textcolors">
    <div className="row">
      {
        forEach(SCSS_VARIABLES.colorUtilities,
          (data: { key: number, value: any }) => (
            <div key={ data.key } className="col-md-6 col-lg-4 py-2">
              <p className={ `d-flex justify-content-between m-0 p-2 bg-${SCSS_VARIABLES.colorBgUtilities[data.key]}` }>
                <span className={ `text-${data.key}` }>{ data.key } text</span>
                <a href="javascript:void" className={ `link-${data.key}` }>{ data.key } link</a>
              </p>
            </div>
          )
        )
      }
    </div>
  </article>;
};

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
