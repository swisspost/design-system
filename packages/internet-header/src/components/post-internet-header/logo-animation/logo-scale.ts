import { state } from '../../../data/store';
import { getScrollParent } from '../../../utils/scrollparent';

/**
 * Returns intersection ratio
 */
export const getLogoScale = (
  headerRef: HTMLSwisspostInternetHeaderElement,
  metaHeaderRef?: HTMLElement,
) => {
  const scrollParent = getScrollParent(headerRef);
  const scrollDistance =
    scrollParent instanceof Element
      ? scrollParent.scrollTop
      : scrollParent.documentElement.scrollTop;
  const scrollY = state.stickyness === 'full' ? 0 : scrollDistance;

  let adjustedHeaderHeight: number, metaHeaderHeight: number;
  if (metaHeaderRef) {
    // Minus 1px border at the bottom that the logo is not covering
    adjustedHeaderHeight = headerRef.clientHeight - 1;
    metaHeaderHeight = metaHeaderRef.clientHeight;
  } else {
    const headerStyles = window.getComputedStyle(headerRef);
    const fontSize = parseFloat(headerStyles.getPropertyValue('font-size'));
    metaHeaderHeight = parseFloat(headerStyles.getPropertyValue('--meta-header-height')) * fontSize;
    adjustedHeaderHeight =
      metaHeaderHeight + parseFloat(headerStyles.getPropertyValue('--header-height')) * fontSize;
  }

  // If meta navigation is not visible (mobile, not configured), scale should just be 1
  let scale = 1;
  if (metaHeaderHeight > 0) {
    scale = Math.max(
      (adjustedHeaderHeight - Math.max(scrollY, 0)) / (adjustedHeaderHeight - metaHeaderHeight),
      1,
    );
  }

  return scale.toString();
};
