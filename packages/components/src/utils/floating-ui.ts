import { Rect } from '@floating-ui/utils';
import { computePosition, Platform, platform as domPlatform } from '@floating-ui/dom';
import {
  getParentNode,
  isHTMLElement,
  isLastTraversableNode,
  isTopLayer,
} from '@floating-ui/utils/dom';

const CLIPPING_RECT_CACHE = Symbol('Clipping Rect Cache');

type PlatformWithCache = Platform & { [CLIPPING_RECT_CACHE]: Map<Element, Rect> };

/**
 * A custom floating UI platform that restricts clipping rectangles to the safe area.
 */
const safeAreaPlatform = { ...domPlatform, getClippingRect } as PlatformWithCache;

/**
 * Computes the clipping rectangle of an element while accounting for the safe area.
 */
async function getClippingRect(
  this: PlatformWithCache,
  ...args: Parameters<Platform['getClippingRect']>
) {
  const element = args[0].element;

  // Check whether the clipping rectangle of the given element has already been computed during
  // this pass.
  const hit = this[CLIPPING_RECT_CACHE].get(element);
  if (hit) return hit;

  // Compute the clipping rectangle with the Floating UI DOM platform, then restrict it to the safe
  // area.
  const clippingRect = await domPlatform.getClippingRect.apply(this, args);
  applySafeArea(clippingRect, element);

  this[CLIPPING_RECT_CACHE].set(element, clippingRect);
  return clippingRect;
}

/**
 * Restricts a clipping rectangle to the safe area.
 *
 * The safe area only applies to elements that the header can actually cover, which excludes
 * elements without a header on their page, elements on a top layer and elements within the header.
 */
function applySafeArea(clippingRect: Rect, element: Element) {
  const headerElement = element.ownerDocument.querySelector('post-header');
  if (headerElement === null) return;

  let parent: Node = element;
  while (!isLastTraversableNode(parent)) {
    parent = getParentNode(parent);

    if (!isHTMLElement(parent)) continue;

    // Do not apply the safe area of the header to
    // - elements that are on a top layer, such as a dialog.
    // - elements that are located within the header itself.
    if (isTopLayer(parent) || parent === headerElement) return;
  }

  const headerRect = headerElement.getBoundingClientRect();
  const top = Math.max(clippingRect.y, headerRect.bottom);

  clippingRect.height -= top - clippingRect.y;
  clippingRect.y = top;
}

/**
 * Computes the coordinates that will position the `floating` element next to a given `reference`
 * element while accounting for the safe area.
 *
 * The safe area is the part of the viewport that the header does not cover. Restricting the
 * clipping rectangles to it makes floating elements behave as if they were clipped by the header.
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
