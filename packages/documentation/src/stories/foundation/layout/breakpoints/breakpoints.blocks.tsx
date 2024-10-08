import { forEach } from '@/utils/react';
import { parse } from '@/utils/sass-export';
import { SpecTable } from '@/stories/foundation/layout/shared.blocks';
import scss from '../breakpoints.module.scss';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const SCSS_VARIABLES: any = parse(scss);

export const BreakpointTable = () => (
  <SpecTable>
    <tr>
      <th>Breakpoint Name</th>
      {forEach(SCSS_VARIABLES.breakpoint, ({ key, value }) => (
        <td key={key}>
          <small>{value.name}</small>
        </td>
      ))}
    </tr>

    <tr>
      <th>Class Infix</th>
      {forEach(SCSS_VARIABLES.breakpoint, ({ key, value }) => (
        <td key={key}>
          {value.infix === 'none' ? <small>(none)</small> : <code>-{value.infix}-</code>}
        </td>
      ))}
    </tr>
  </SpecTable>
);
