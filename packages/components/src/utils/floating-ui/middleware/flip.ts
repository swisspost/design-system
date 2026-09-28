import {
  Derivable,
  detectOverflow,
  DetectOverflowOptions,
  Middleware,
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

const NAME = 'post-flip';

export type FlipOptions = Omit<DetectOverflowOptions, 'elementContext'> & {
  minSize?: Partial<Dimensions>;
};

interface FlipData {
  placements: Placement[];
  deficits: number[];
}

export function flip(options: FlipOptions | Derivable<FlipOptions> = {}): Middleware {
  return {
    name: NAME,
    options,
    async fn(state) {
      const { middlewareData, placement, platform, elements } = state;

      // see https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
      if (middlewareData.arrow?.alignmentOffset) return {};

      const { minSize = {}, ...detectOverflowOptions } = evaluate(options, state);

      const gap = Math.abs(middlewareData.offset?.[getSideAxis(placement)] ?? 0);
      const rtl = await platform.isRTL?.(elements.floating);

      const referenceOverflow = await detectOverflow(state, {
        ...detectOverflowOptions,
        elementContext: 'reference',
      });

      const floatingOverflow = await detectOverflow(state, {
        ...detectOverflowOptions,
        elementContext: 'floating',
      });

      const side = getSide(placement);
      const overflow = Math.max(referenceOverflow[side], floatingOverflow[side]);

      // The current placement fits.
      if (overflow <= 0) return {};

      const data: FlipData = state.middlewareData[NAME] ?? {
        placements: getPlacements(placement, referenceOverflow, minSize, gap, rtl),
        deficits: [],
      };

      console.log(data);

      if (data.deficits.length < data.placements.length) {
        data.deficits.push(getDeficit(side, referenceOverflow, minSize, gap));
        return { data, reset: { placement: data.placements[data.deficits.length] } };
      }

      const bestPlacement = data.placements[data.deficits.indexOf(Math.min(...data.deficits))];
      return bestPlacement === placement ? {} : { data, reset: { placement: bestPlacement } };
    },
  };
}

function getDeficit(side: Side, overflow: SideObject, size: Partial<Dimensions>, gap: number) {
  const minLength = size[getAxisLength(getSideAxis(side))] ?? 0;
  return gap + minLength + overflow[side];
}

function getPlacements(
  placement: Placement,
  overflow: SideObject,
  size: Partial<Dimensions>,
  gap: number,
  rtl: boolean,
) {
  const side = getSide(placement);
  const placements = [placement, getOppositePlacement(placement)];

  if (
    Math.min(
      getDeficit(side, overflow, size, gap),
      getDeficit(getOppositeSide(side), overflow, size, gap),
    ) <= 0
  )
    return placements;

  const crossPlacements = getOppositeAxisPlacements(placement, true, 'start', rtl);
  crossPlacements.sort((a, b) => overflow[getSide(a)] - overflow[getSide(b)]);
  placements.push(...crossPlacements);

  return placements;
}
