import { parse } from '@/utils/sass-export';
import { forEach } from '@/utils/react';
import { SpecTable } from '../shared.blocks';
import scss from './containers.module.scss';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const SCSS_VARIABLES: any = parse(scss);

export const ContainersTable = () => (
  <SpecTable>
    <tr>
      <th>
        Container <code>max-width</code>
      </th>
      {forEach(SCSS_VARIABLES.container, ({ key, value }) => (
        <td key={key}>{value['max-width']}</td>
      ))}
    </tr>
    <tr>
      <th>
        Container <code>padding</code>
      </th>
      {forEach(SCSS_VARIABLES.container, ({ key, value }) => (
        <td key={key}>{value.padding}</td>
      ))}
    </tr>

    <tr>
      <th>
        Container-Fluid <code>padding</code>
      </th>
      {forEach(SCSS_VARIABLES.container, ({ key, value }) => (
        <td key={key}>{value.fluid.padding}</td>
      ))}
    </tr>
  </SpecTable>
);
