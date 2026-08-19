import { Rect } from '@floating-ui/utils';
import { computePosition, Platform, platform as domPlatform } from '@floating-ui/dom';
import { getContainingBlock, getParentNode, isLastTraversableNode } from '@floating-ui/utils/dom';

const CLIPPING_RECT_CACHE = Symbol('Clipping Rect Cache');

type PlatformWithCache = Platform & { [CLIPPING_RECT_CACHE]: Map<Element, Rect> };

/** A custom floating UI platform that applies safe areas to clipping rectangles. */
const safeAreaPlatform = { ...domPlatform, getClippingRect } as PlatformWithCache;

async function getClippingRect(
  this: PlatformWithCache,
  ...args: Parameters<Platform['getClippingRect']>
) {
  const element = args[0].element;

  // Check whether the clipping rectangle for the specified element has already been computed in this pass.
  const hit = this[CLIPPING_RECT_CACHE].get(element);
  if (hit) return hit;

  // Use the Floating UI DOM-Platform to compute the clipping rectangle, and then apply safe areas to it.
  const clippingRect = await domPlatform.getClippingRect.apply(this, args);
  applySafeArea(clippingRect, element);

  this[CLIPPING_RECT_CACHE].set(element, clippingRect);
  return clippingRect;
}

function applySafeArea(clippingRect: Rect, element: Element) {
  // Do not apply safe areas to elements that are inside another containing block, such as a dialog.
  if (getContainingBlock(element) !== null) return;

  const headerElement = element.ownerDocument.querySelector('post-header');
  if (headerElement === null) return;

  // Do not apply the safe area of the header to elements that are located within the header itself.
  let parent: Node = element;
  while (!isLastTraversableNode(parent)) {
    parent = getParentNode(parent);
    if (parent === headerElement) return;
  }

  const headerRect = headerElement.getBoundingClientRect();
  const top = Math.max(clippingRect.y, headerRect.bottom);

  clippingRect.height -= top - clippingRect.y;
  clippingRect.y = top;
}

/**
 * Computes the coordinates that will position the `floating` element next to a given `reference`
 * element while accounting for safe areas.
 */
export const computePositionWithSafeArea: typeof computePosition = (
  reference,
  floating,
  options,
) => {
  options ??= {};

  return computePosition(reference, floating, {
    ...options,
    platform: {
      ...safeAreaPlatform,
      ...options.platform,
      [CLIPPING_RECT_CACHE]: new Map(),
    } as PlatformWithCache,
  });
};
