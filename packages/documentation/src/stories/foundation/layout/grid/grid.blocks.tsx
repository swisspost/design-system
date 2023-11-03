import LinkTo from '@storybook/addon-links/react';
import { parse } from '../../../../utils/sass-export';
import { forEach } from '../../../../utils/react';
import scss from './grid.module.scss';

export const SCSS_VARIABLES = parse(scss);

export const SpecTable = () => (
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
          <th>Class prefix</th>
          {forEach(SCSS_VARIABLES.breakpoint, (data: { key: string; value: { infix: string } }) => (
            <td key={data.key}>
              <code>.col-{data.value.infix === 'none' ? '' : `${data.value.infix}-`}</code>
            </td>
          ))}
        </tr>

        <tr>
          <th>Gutter width</th>
          {forEach(
            SCSS_VARIABLES.grid,
            (data: { key: string; value: { ['gutter-width']: string } }) => (
              <td key={data.key}>{data.value['gutter-width']}</td>
            ),
          )}
        </tr>

        <tr>
          <th>Amount of columns</th>
          <td colSpan={SCSS_VARIABLES['breakpoint-count']}>{SCSS_VARIABLES['grid-columns']}</td>
        </tr>

        <tr>
          <th>Custom gutters</th>
          <td colSpan={SCSS_VARIABLES['breakpoint-count']}>
            <LinkTo kind="foundations-layout-gutters" story="docs">
              yes
            </LinkTo>
          </td>
        </tr>
        <tr>
          <th>Nestable</th>
          <td colSpan={SCSS_VARIABLES['breakpoint-count']}>
            <a href="#nesting" target="_self">
              yes
            </a>
          </td>
        </tr>
        <tr>
          <th>Column ordering</th>
          <td colSpan={SCSS_VARIABLES['breakpoint-count']}>
            <LinkTo kind="foundations-layout-columns" story="docs">
              yes
            </LinkTo>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);
