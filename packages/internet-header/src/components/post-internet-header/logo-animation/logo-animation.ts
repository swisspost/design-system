import { debounce } from 'throttle-debounce';
import { state } from '../../../data/store';

export const registerLogoAnimationObserver = (
  target: HTMLElement,
  headerRef: HTMLSwisspostInternetHeaderElement,
) => {
  /**
   * Set intersection ratio as CSS custom property
   */
  const handleScroll = () => {
    const fullStickyness = state.stickyness === 'full';
    let scale = 1;
    // Minus 1px border at the bottom that the logo is not covering
    const adjustedHeaderHeight = headerRef.clientHeight - 1;
    const scrollY = fullStickyness ? 0 : window.scrollY;

    // If meta navigation is not visible (mobile, not configured), scale should just be 1
    if (target.clientHeight > 0) {
      scale = Math.max(
        (adjustedHeaderHeight - Math.max(scrollY, 0)) /
          (adjustedHeaderHeight - target.clientHeight),
        1,
      );
    }
    headerRef.style.setProperty('--logo-scale', scale.toString());
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
          window.addEventListener('scroll', handleScroll, { passive: true });
          window.addEventListener('resize', debounced);

          // Ensure callback is called at least once in case main thread is too busy while scrolling up
          window.requestAnimationFrame(handleScroll);
        } else {
          window.removeEventListener('scroll', handleScroll);
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
