import { Middleware, MiddlewareState } from '@floating-ui/dom';
import { getNextSide, getOppositeSide, getPreviousSide } from '@/utils/floating-ui/util';
import {
  ClientRectObject,
  getSide,
  getSideAxis,
  Rect,
  rectToClientRect,
  Side,
} from '@floating-ui/utils';

export const SAFE_SPACE_MIDDLEWARE = 'post-safe-space';

export interface SafeSpaceData {
  polygon: string;
}

/**
 * Computes the safe space, the area the pointer can travel through to get from the reference to
 * the floating element.
 */
export function safeSpace(): Middleware {
  return {
    name: SAFE_SPACE_MIDDLEWARE,
    async fn(state) {
      const { placement, rects, x, y } = state;
      const side = getSide(placement);

      const reference = await getViewportRect(state, rects.reference);
      const floating = await getViewportRect(state, { ...rects.floating, x, y });

      const path = [
        ...getPathAlongSide(floating, getOppositeSide(side)),
        ...getPathAlongSide(reference, side),
      ];

      const points = [];

      for (let i = 0; i < path.length; i += 2) {
        points.push(`${path[i]}px ${path[i + 1]}px`);
      }

      const data: SafeSpaceData = { polygon: `polygon(${points.join(', ')})` };
      return { data };
    },
  };
}

/**
 * Converts a rectangle from the floating element's offset parent's coordinate system to viewport
 * coordinates.
 */
async function getViewportRect({ elements, platform, strategy }: MiddlewareState, rect: Rect) {
  const viewportRect = await platform.convertOffsetParentRelativeRectToViewportRelativeRect?.({
    offsetParent: await platform.getOffsetParent?.(elements.floating),
    rect,
    elements,
    strategy,
  });

  return rectToClientRect(viewportRect ?? rect);
}

/**
 * Returns the path along the specified side of the given rectangle.
 *
 * The path is a list of coordinates in the form of [x₁, y₁, x₂, y₂] and is given in clockwise order.
 */
function getPathAlongSide(rect: ClientRectObject, side: Side) {
  const self = rect[side];
  const prev = rect[getPreviousSide(side)];
  const next = rect[getNextSide(side)];

  return getSideAxis(side) === 'x' ? [self, prev, self, next] : [prev, self, next, self];
}
