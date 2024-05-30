import { parse } from '@/utils/sass-export';
import { forEach } from '@/utils/react';
import { SpecTable } from '@/stories/foundation/layout/shared.blocks';
import scss from './grid.module.scss';

export const SCSS_VARIABLES = parse(scss);

export const GridTable = () => (
  <SpecTable>
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
        <a href="#gutters" target="_self">
          yes
        </a>
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
        <a href="/?path=/docs/cd70f48f-6308-4ec8-a8c6-982bd72c855c--docs">yes</a>
      </td>
    </tr>
  </SpecTable>
);
