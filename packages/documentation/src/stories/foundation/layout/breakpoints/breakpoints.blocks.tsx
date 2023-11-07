import { forEach } from '../../../../utils/react';
import { parse } from '../../../../utils/sass-export';
import { SpecTable } from '../shared.blocks';
import scss from './breakpoints.module.scss';

export const SCSS_VARIABLES = parse(scss);

export const BreakpointTable = () => (
  <SpecTable>
    <tr>
      <th>Name</th>
      {forEach(SCSS_VARIABLES.breakpoint, (data: { key: string; value: { name: string } }) => (
        <td key={data.key}>
          <small>{data.value.name}</small>
        </td>
      ))}
    </tr>

    <tr>
      <th>Code name</th>
      {forEach(SCSS_VARIABLES.breakpoint, (data: { key: string }) => (
        <td key={data.key}>
          <code>{data.key}</code>
        </td>
      ))}
    </tr>
    <tr>
      <th>Class infix</th>
      {forEach(SCSS_VARIABLES.breakpoint, (data: { key: string; value: { infix: string } }) => (
        <td key={data.key}>
          {data.value.infix === 'none' ? 'none' : <code>-{data.value.infix}-</code>}
        </td>
      ))}
    </tr>
  </SpecTable>
);
