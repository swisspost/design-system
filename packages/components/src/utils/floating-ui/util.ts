import { Side, sides } from '@floating-ui/utils';

/**
 * Returns the nth side in clockwise direction relative to the given side.
 */
function getOtherSide(side: Side, n: number): Side {
  return sides[(sides.indexOf(side) + n) % 4];
}

export const getNextSide = (side: Side) => getOtherSide(side, 1);
export const getOppositeSide = (side: Side) => getOtherSide(side, 2);
export const getPreviousSide = (side: Side) => getOtherSide(side, 3);
