import { debounce } from 'throttle-debounce';
import { getScrollParent } from '../../../utils/scrollparent';
import { getLogoScale } from './logo-scale';

export const registerLogoAnimationObserver = (
  target: HTMLElement,
  headerRef: HTMLSwisspostInternetHeaderElement,
) => {
  const scrollParent = getScrollParent(headerRef);

  /**
   * Set intersection ratio as CSS custom property
   */
  const handleScroll = () => {
    headerRef.style.setProperty('--logo-scale', getLogoScale(headerRef, target));
  };

  const debounced = debounce(150, handleScroll);

  /**
   * Observe the meta navigation in order to not track scroll events throughout the whole page.
   * This ensures that the scroll listener is only active while the meta navigation is visible.
   */
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          scrollParent.addEventListener('scroll', handleScroll, { passive: true });
          window.addEventListener('resize', debounced);

          // Ensure callback is called at least once in case main thread is too busy while scrolling up
          window.requestAnimationFrame(handleScroll);
        } else {
          scrollParent.removeEventListener('scroll', handleScroll);
          window.removeEventListener('resize', debounced);
          window.requestAnimationFrame(handleScroll);
        }
      });
    },
    {
      // Fires when element leaves viewport (0) and when it just about enters it (0.001)
      threshold: [0, 0.001],
    },
  );
  observer.observe(target);

  return handleScroll;
};
