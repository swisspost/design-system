import { forEach } from '../../../utils/react';

const enum PostSizeImplementation {
  Pixel,
  Rem,
}
const sizes = [
  {
    key: 1,
    name: 'hair',
    size_pixel: 1,
    size_rem: 0.0625,
    implemented: PostSizeImplementation.Pixel,
    equivalent: 0,
  },
  {
    key: 2,
    name: 'line',
    size_pixel: 2,
    size_rem: 0.125,
    implemented: PostSizeImplementation.Pixel,
    equivalent: 0,
  },
  {
    key: 3,
    name: 'micro',
    size_pixel: 4,
    size_rem: 0.25,
    implemented: PostSizeImplementation.Rem,
    equivalent: 1,
  },
  {
    key: 4,
    name: 'mini',
    size_pixel: 8,
    size_rem: 0.5,
    implemented: PostSizeImplementation.Rem,
    equivalent: 2,
  },
  {
    key: 5,
    name: 'small-regular',
    size_pixel: 12,
    size_rem: 0.75,
    implemented: PostSizeImplementation.Rem,
    equivalent: 0,
  },
  {
    key: 6,
    name: 'regular',
    size_pixel: 16,
    size_rem: 1,
    implemented: PostSizeImplementation.Rem,
    equivalent: 3,
  },
  {
    key: 7,
    name: 'small-large',
    size_pixel: 20,
    size_rem: 1.25,
    implemented: PostSizeImplementation.Rem,
    equivalent: 0,
  },
  {
    key: 8,
    name: 'large',
    size_pixel: 24,
    size_rem: 1.5,
    implemented: PostSizeImplementation.Rem,
    equivalent: 4,
  },
  {
    key: 9,
    name: 'big',
    size_pixel: 32,
    size_rem: 2,
    implemented: PostSizeImplementation.Rem,
    equivalent: 0,
  },
  {
    key: 10,
    name: 'bigger-big',
    size_pixel: 40,
    size_rem: 2.5,
    implemented: PostSizeImplementation.Rem,
    equivalent: 0,
  },
  {
    key: 11,
    name: 'small-huge',
    size_pixel: 48,
    size_rem: 3,
    implemented: PostSizeImplementation.Rem,
    equivalent: 5,
  },
  {
    key: 12,
    name: 'huge',
    size_pixel: 56,
    size_rem: 3.5,
    implemented: PostSizeImplementation.Rem,
    equivalent: 0,
  },
  {
    key: 14,
    name: 'small-giant',
    size_pixel: 72,
    size_rem: 4.5,
    implemented: PostSizeImplementation.Rem,
    equivalent: 0,
  },
  {
    key: 14,
    name: 'giant',
    size_pixel: 80,
    size_rem: 5,
    implemented: PostSizeImplementation.Rem,
    equivalent: 0,
  },
  {
    key: 15,
    name: 'bigger-giant',
    size_pixel: 112,
    size_rem: 7,
    implemented: PostSizeImplementation.Rem,
    equivalent: 0,
  },
];
export const SizesTable = () => (
  <table className="table table-sm table-striped table-bordered">
    <thead>
      <tr>
        <th>Size name</th>
        <th>Size name in classes</th>
        <th>Size in pixels (approx.)</th>
        <th>Size in rem</th>
        <th>Effective size used in css</th>
        <th>Bootstrap size equivalent</th>
      </tr>
    </thead>
    <tbody>
      {forEach(
        sizes,
        (size: {
          key: number;
          value: {
            name: string;
            size_pixel: number;
            size_rem: number;
            implemented: PostSizeImplementation;
            equivalent: number;
          };
        }) => {
          return (
            <tr key={size.key}>
              <td>{size.value.name}</td>
              <td>{'*-' + size.value.name}</td>
              <td>{size.value.size_pixel} px</td>
              <td>{size.value.size_rem} rem</td>
              <td>
                {size.value.implemented === PostSizeImplementation.Pixel
                  ? size.value.size_pixel + 'px'
                  : size.value.size_rem + 'rem'}
              </td>
              <td>{size.value.equivalent > 0 ? '*-' + size.value.equivalent : 'none'}</td>
            </tr>
          );
        },
      )}
    </tbody>
  </table>
);
