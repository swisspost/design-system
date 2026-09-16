const SIDES = ['top', 'right', 'bottom', 'left'] as const;

export type Side = (typeof SIDES)[number];

/**
 * Returns the nth side in clockwise direction relative to the given side.
 */
function getOtherSide(side: Side, n: number): Side {
  return SIDES[(SIDES.indexOf(side) + n) % 4];
}

export const getNextSide = (side: Side) => getOtherSide(side, 1);
export const getOppositeSide = (side: Side) => getOtherSide(side, 2);
export const getPreviousSide = (side: Side) => getOtherSide(side, 3);

/**
 * Returns the path along the specified side of the given rectangle.
 *
 * The path is a list of coordinates in the form of [x₁, y₁, x₂, y₂] and is given in clockwise order.
 */
export function getPathAlongSide(rect: DOMRect, side: Side) {
  const self = rect[side];
  const prev = rect[getPreviousSide(side)];
  const next = rect[getNextSide(side)];

  return side === 'left' || side === 'right' ? [self, prev, self, next] : [prev, self, next, self];
}

/**
 * Returns a CSS polygon string from the given path.
 */
export function getPolygon(path: number[]) {
  const points = [];

  for (let i = 0; i < path.length; i += 2) {
    points.push(`${path[i]}px ${path[i + 1]}px`);
  }

  return `polygon(${points.join(', ')})`;
}
