export const registerLogoAnimationObserver = (
  target: HTMLElement,
  headerRef: HTMLSwisspostInternetHeaderElement,
) => {
  let targetClientHeight = target.clientHeight;
  let headerClientHeight = headerRef.clientHeight;

  /**
   * Set intersection ratio as CSS custom property
   */
  const handleScroll = () => {
    let scale = 1;
    // Minus 1px border at the bottom that the logo is not covering
    const adjustedHeaderHeight = headerClientHeight - 1;

    // If meta navigation is not visible (mobile, not configured), scale should just be 1
    if (targetClientHeight > 0) {
      scale = Math.max(
        (adjustedHeaderHeight - Math.max(window.scrollY, 0)) /
          (adjustedHeaderHeight - targetClientHeight),
        1,
      );
    }
    headerRef.style.setProperty('--logo-scale', scale.toString());
  };

  /**
   * Observe the meta navigation in order to not track scroll events throughout the whole page.
   * This ensures that the scroll listener is only active while the meta navigation is visible.
   */
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          targetClientHeight = target.clientHeight;
          headerClientHeight = headerRef.clientHeight;
          window.addEventListener('scroll', handleScroll, { passive: true });

          // Ensure callback is called at least once in case main thread is too busy while scrolling up
          window.requestAnimationFrame(handleScroll);
        } else {
          window.removeEventListener('scroll', handleScroll);
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
};
