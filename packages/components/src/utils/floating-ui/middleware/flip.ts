import {
  Derivable,
  detectOverflow,
  DetectOverflowOptions,
  Middleware,
  MiddlewareState,
  Placement,
  SideObject,
} from '@floating-ui/dom';
import {
  Dimensions,
  evaluate,
  getAxisLength,
  getOppositeAxisPlacements,
  getOppositePlacement,
  getSide,
  getSideAxis,
  Side,
} from '@floating-ui/utils';
import { getOppositeSide } from '@/utils/floating-ui/util';

export const FLIP_MIDDLEWARE = 'post-flip';

export type FlipOptions = Omit<DetectOverflowOptions, 'elementContext'> & {
  minSize?: Partial<Dimensions>;
};

interface FlipData {
  placements: Placement[];
  deficits: number[];
}

interface ReferenceMeasurement {
  overflow: SideObject;
  minSize: Partial<Dimensions>;
  gap: number;
}

/**
 * Changes the placement of the floating element to keep it in view.
 *
 * Unlike the Floating UI `flip` middleware, placements are measured against `minSize` rather than
 * against the current size of the floating element, and the placement with the smallest deficit is
 * used when none of them fits.
 */
export function flip(options: FlipOptions | Derivable<FlipOptions> = {}): Middleware {
  return {
    name: FLIP_MIDDLEWARE,
    options,
    async fn(state) {
      const { middlewareData, placement } = state;

      // see https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
      if (middlewareData.arrow?.alignmentOffset) return {};

      const { minSize = {}, ...detectOverflowOptions } = evaluate(options, state);

      const gap = Math.abs(middlewareData.offset?.[getSideAxis(placement)] ?? 0);
      const side = getSide(placement);

      const referenceOverflow = await detectOverflow(state, {
        ...detectOverflowOptions,
        elementContext: 'reference',
      });

      const floatingOverflow = await detectOverflow(state, {
        ...detectOverflowOptions,
        elementContext: 'floating',
      });

      // The floating element fits at its current placement, there is nothing left to do.
      if (Math.max(referenceOverflow[side], floatingOverflow[side]) <= 0) return {};

      const previous: FlipData | undefined = middlewareData[FLIP_MIDDLEWARE];
      const measurement: ReferenceMeasurement = { overflow: referenceOverflow, minSize, gap };

      let deficits = previous?.deficits ?? [];
      const placements = previous?.placements ?? (await getPlacements(state, measurement));

      if (deficits.length < placements.length) {
        deficits = [...deficits, getDeficit(side, measurement)];
      }

      const data = { placements, deficits };

      // If there are still placements to try, move on to the next one.
      if (deficits.length < placements.length) {
        return { data, reset: { placement: placements[deficits.length] } };
      }

      // If none of the placements fit, fall back to the one that loses the least space.
      const fallback = data.placements[data.deficits.indexOf(Math.min(...data.deficits))];
      return fallback === placement ? { data } : { data, reset: { placement: fallback } };
    },
  };
}

/**
 * Returns the placements to try, ordered from most to least promising.
 */
async function getPlacements(state: MiddlewareState, measurement: ReferenceMeasurement) {
  const { placement, platform, elements } = state;
  const { overflow } = measurement;

  const side = getSide(placement);
  const placements = [placement, getOppositePlacement(placement)];

  const mainAxisDeficit = Math.min(
    getDeficit(side, measurement),
    getDeficit(getOppositeSide(side), measurement),
  );

  if (mainAxisDeficit <= 0) return placements;

  const rtl = (await platform.isRTL?.(elements.floating)) ?? false;
  const crossAxisPlacements = getOppositeAxisPlacements(placement, true, 'start', rtl);

  // Try the side with the most available space first.
  crossAxisPlacements.sort((a, b) => overflow[getSide(a)] - overflow[getSide(b)]);

  return [...placements, ...crossAxisPlacements];
}

/**
 * Returns the amount of space required to display the floating element at its minimum size on the
 * given side of the reference element.
 */
function getDeficit(side: Side, { minSize, overflow, gap }: ReferenceMeasurement) {
  const minLength = minSize[getAxisLength(getSideAxis(side))] ?? 0;
  return gap + minLength + overflow[side];
}
