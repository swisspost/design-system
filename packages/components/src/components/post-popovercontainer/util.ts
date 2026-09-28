import { Side } from '@floating-ui/utils';
import { getNextSide, getPreviousSide } from '@/utils/floating-ui/util';

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
