import { Side, sides } from '@floating-ui/utils';

/**
 * Returns the nth side in clockwise direction relative to the given side.
 */
function getRelativeSide(side: Side, n: number): Side {
  return sides[(sides.indexOf(side) + n) % 4];
}

export const getNextSide = (side: Side) => getRelativeSide(side, 1);
export const getOppositeSide = (side: Side) => getRelativeSide(side, 2);
export const getPreviousSide = (side: Side) => getRelativeSide(side, 3);
