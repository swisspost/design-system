import { parse } from '@/utils/sass-export';
import { forEach } from '@/utils/react';
import scss from './shared.module.scss';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const SCSS_VARIABLES: any = parse(scss);

export const SpecTable = (props: { children: string | JSX.Element | JSX.Element[] }) => (
  <div className="table-responsive my-32">
    <table className="table text-center">
      <thead>
        <tr>
          <th></th>
          {forEach(SCSS_VARIABLES.breakpoint, ({ key, value }) => (
            <th key={key}>
              {key}
              <br />
              <small className="fw-normal">{value.dimensions}</small>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{props.children}</tbody>
    </table>
  </div>
);
