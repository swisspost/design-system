const SIDES = ['top', 'right', 'bottom', 'left'] as const;

export type Side = (typeof SIDES)[number];

function getOtherSide(side: Side, offset: number): Side {
  return SIDES[(SIDES.indexOf(side) + offset) % 4];
}

export const getNextSide = (side: Side) => getOtherSide(side, 1);
export const getOppositeSide = (side: Side) => getOtherSide(side, 2);
export const getPreviousSide = (side: Side) => getOtherSide(side, 3);

export function getPathAlongSide(rect: DOMRect, side: Side) {
  const self = rect[side];
  const prev = rect[getPreviousSide(side)];
  const next = rect[getNextSide(side)];

  return side === 'left' || side === 'right' ? [self, prev, self, next] : [prev, self, next, self];
}

export function getPolygon(path: number[]) {
  const points = [];

  for (let i = 0; i < path.length; i += 2) {
    points.push(`${path[i]}px ${path[i + 1]}px`);
  }

  return `polygon(${points.join(', ')})`;
}
