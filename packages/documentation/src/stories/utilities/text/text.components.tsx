import React from 'react';
import { objectify } from '../../../utils/sass-export.ts';
import { forEach } from '../../../utils/react.ts';
import scss from './text.export.scss';

export const SCSS_VARIABLES = objectify(scss);

export function ColorUtilities (props: {}) {
  return <article className="mb-3 sb-textcolors">
    <div className="row">
      {
        forEach(SCSS_VARIABLES.colorUtilities,
          (data: { key: number, value: any }) => (
            <div key={ data.key } className="col-sm-3 py-2">
              <p className={ `m-0 p-2 bg-${SCSS_VARIABLES.colorBgUtilities[data.key]} text-${data.key}` }>.text-{ data.key }</p>
            </div>
          )
        )
      }
    </div>
  </article>;
};