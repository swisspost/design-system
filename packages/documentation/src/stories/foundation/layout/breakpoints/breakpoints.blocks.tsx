import { forEach } from '../../../../utils/react';
import { parse } from '../../../../utils/sass-export';
import scss from './breakpoints.module.scss';

export const SCSS_VARIABLES = parse(scss);

export const BreakpointTable = () => (
  <table className="table table-sm table-striped table-bordered">
    <thead>
      <tr>
        <th>Breakpoint</th>
        <th>Class infix</th>
        <th>Dimensions</th>
      </tr>
    </thead>
    <tbody>
      {forEach(
        SCSS_VARIABLES.breakpoint,
        (data: { key: number; value: { name: string; infix: any; dimensions: string } }) => {
          return (
            <tr>
              <td>{data.value.name}</td>
              <td dangerouslySetInnerHTML={{ __html: data.value.infix }}></td>
              <td>{data.value.dimensions}</td>
            </tr>
          );
        },
      )}
    </tbody>
  </table>
);
