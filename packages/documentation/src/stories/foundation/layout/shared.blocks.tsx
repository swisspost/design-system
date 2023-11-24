import { parse } from '../../../utils/sass-export';
import { forEach } from '../../../utils/react';
import scss from './shared.module.scss';

export const SCSS_VARIABLES = parse(scss);

export const SpecTable = (props: { children: string | JSX.Element | JSX.Element[] }) => (
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
      <tbody>{props.children}</tbody>
    </table>
  </div>
);
