import LinkTo from '@storybook/addon-links/react';
import { parse } from '../../../../utils/sass-export';
import { forEach } from '../../../../utils/react';
import scss from './containers.module.scss';

export const SCSS_VARIABLES = parse(scss);

export const GridBreakpoints = () => (
  <div className="table-responsive my-big">
    <table className="table">
      <thead>
        <tr>
          <th></th>
          {forEach(
            SCSS_VARIABLES.breakpoint,
            (data: { key: string; value: { dimensions: string } }) => (
              <th key={data.key}>
                {data.key}
                <br />
                <small className="fw-normal">{data.value.dimensions}</small>
              </th>
            ),
          )}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>
            Container <code>max-width</code>
          </th>
          {forEach(
            SCSS_VARIABLES.container,
            (data: { key: string; value: { ['max-width']: string } }) => (
              <td key={data.key}>{data.value['max-width']}</td>
            ),
          )}
        </tr>
        <tr>
          <th>
            Container <code>padding</code>
          </th>
          {forEach(
            SCSS_VARIABLES.container,
            (data: { key: string; value: { padding: string } }) => (
              <td key={data.key}>{data.value.padding}</td>
            ),
          )}
        </tr>

        <tr>
          <th>
            Container-Fluid <code>padding</code>
          </th>
          {forEach(
            SCSS_VARIABLES.container,
            (data: { key: string; value: { fluid: { padding: string } } }) => (
              <td key={data.key}>{data.value.fluid.padding}</td>
            ),
          )}
        </tr>
      </tbody>
    </table>
  </div>
);
