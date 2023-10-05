import { forEach } from '../../../../utils/react';
import { parse } from '../../../../utils/sass-export';
import scss from './breakpoints.module.scss';

export const SCSS_VARIABLES = parse(scss);

export const BreakpointTable = () => (
  <div className="table-responsive">
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>Class infix</th>
          <th>Dimensions</th>
        </tr>
      </thead>
      <tbody>
        {forEach(
          SCSS_VARIABLES.breakpoint,
          (data: {
            key: number;
            value: { name: string; infix: any; dimensions: string; deprecated: boolean };
          }) => {
            return (
              <tr>
                <th>
                  {data.value.name}
                  {data.value.deprecated ? (
                    <span>
                      {' '}
                      <code className="fw-normal bg-danger text-white">deprecated</code>
                    </span>
                  ) : null}
                </th>
                <td dangerouslySetInnerHTML={{ __html: data.value.infix }}></td>
                <td>{data.value.deprecated ? '-' : data.value.dimensions}</td>
              </tr>
            );
          },
        )}
      </tbody>
    </table>
  </div>
);
