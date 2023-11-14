import { parse } from '../../../../utils/sass-export';
import { forEach } from '../../../../utils/react';
import { SpecTable } from '../shared.blocks';
import scss from './containers.module.scss';

export const SCSS_VARIABLES = parse(scss);

export const ContainersTable = () => (
  <SpecTable>
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
      {forEach(SCSS_VARIABLES.container, (data: { key: string; value: { padding: string } }) => (
        <td key={data.key}>{data.value.padding}</td>
      ))}
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
  </SpecTable>
);
