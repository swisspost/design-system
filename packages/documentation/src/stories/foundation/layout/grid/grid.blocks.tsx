import LinkTo from '@storybook/addon-links/react';
import { parse } from '../../../../utils/sass-export';
import { forEach } from '../../../../utils/react';
import scss from './grid.module.scss';

export const SCSS_VARIABLES = parse(scss);

export const GridBreakpoints = () => (
  <div className="table-responsive">
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
          <th>Name</th>
          {forEach(SCSS_VARIABLES.breakpoint, (data: { key: string; value: { name: string } }) => (
            <td key={data.key}>{data.value.name}</td>
          ))}
        </tr>
        <tr>
          <th>
            Container <code>max-width</code>
          </th>
          {forEach(
            SCSS_VARIABLES.breakpoint,
            (data: { key: string; value: { maxWidth: string } }) => (
              <td key={data.key}>{data.value.maxWidth}</td>
            ),
          )}
        </tr>
        <tr>
          <th>
            Container <code>padding</code>
          </th>
          {forEach(
            SCSS_VARIABLES.breakpoint,
            (data: { key: string; value: { containerPadding: string } }) => (
              <td key={data.key}>{data.value.containerPadding}</td>
            ),
          )}
        </tr>

        <tr>
          <th>Class prefix</th>
          {forEach(SCSS_VARIABLES.breakpoint, (data: { key: string; value: { infix: string } }) => (
            <td key={data.key}>
              <code>.col-{data.value.infix !== 'none' && `${data.key}-`}</code>
            </td>
          ))}
        </tr>

        <tr>
          <th>Amount of columns</th>
          <td colSpan={Object.keys(SCSS_VARIABLES.breakpoint).length}>
            {SCSS_VARIABLES.variables['grid-columns']}
          </td>
        </tr>

        <tr>
          <th>Gutter width</th>
          <td colSpan={Object.keys(SCSS_VARIABLES.breakpoint).length}>
            {SCSS_VARIABLES.variables['grid-gutter-width']}
          </td>
        </tr>

        <tr>
          <th>Custom gutters</th>
          <td colSpan={Object.keys(SCSS_VARIABLES.breakpoint).length}>
            <LinkTo kind="foundations-layout-gutters" story="docs">
              yes
            </LinkTo>
          </td>
        </tr>
        <tr>
          <th>Nestable</th>
          <td colSpan={Object.keys(SCSS_VARIABLES.breakpoint).length}>
            <a href="#nesting" target="_self">
              yes
            </a>
          </td>
        </tr>
        <tr>
          <th>Column ordering</th>
          <td colSpan={Object.keys(SCSS_VARIABLES.breakpoint).length}>
            <LinkTo kind="foundations-layout-columns" story="docs">
              yes
            </LinkTo>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);
