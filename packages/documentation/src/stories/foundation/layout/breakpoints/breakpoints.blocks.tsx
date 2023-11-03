import { forEach } from '../../../../utils/react';
import { parse } from '../../../../utils/sass-export';
import scss from './breakpoints.module.scss';

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
      </tbody>
    </table>
  </div>
);
