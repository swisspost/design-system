import { equalizeArrays } from './search.service';

describe('search.service.ts', () => {
  it('proportionally fills the suggestions array with max. 8 items', () => {
    const a1 = [1, 2, 3, 4];
    const a2 = ['a', 'b', 'c', 'd'];
    const r = equalizeArrays(a1, a2);
    expect(r).toStrictEqual([
      [1, 2, 3, 4],
      ['a', 'b', 'c', 'd'],
    ]);
  });

  it('proportionally fills the suggestions array with max. 8 items when there are more than four per array', () => {
    const a1 = [1, 2, 3, 4, 5, 6, 7, 8];
    const a2 = ['a', 'b', 'c', 'd', 'e', 'f'];
    const r = equalizeArrays(a1, a2);
    expect(r).toStrictEqual([
      [1, 2, 3, 4],
      ['a', 'b', 'c', 'd'],
    ]);
  });

  it('proportionally fills the suggestions array with items from arr 2', () => {
    const a1 = [1, 2];
    const a2 = ['a', 'b', 'c', 'd', 'e', 'f'];
    const r = equalizeArrays(a1, a2);
    expect(r).toStrictEqual([
      [1, 2],
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ]);
  });

  it('proportionally fills the suggestions array with items from arr1', () => {
    const a1 = [1, 2, 3, 4, 5, 6, 7, 8];
    const a2 = ['a', 'b'];
    const r = equalizeArrays(a1, a2);
    expect(r).toStrictEqual([
      [1, 2, 3, 4, 5, 6],
      ['a', 'b'],
    ]);
  });

  it('does not slice if there are not enough items', () => {
    const a1 = [1, 2];
    const a2 = ['a', 'b'];
    const r = equalizeArrays(a1, a2);
    expect(r).toStrictEqual([
      [1, 2],
      ['a', 'b'],
    ]);
  });
});
