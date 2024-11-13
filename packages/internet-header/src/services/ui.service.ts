/**
 * Check if an element with `text-overflow: ellipsis;` is fully displayed or concatenated
 * https://stackoverflow.com/questions/7738117/html-text-overflow-ellipsis-detection
 *
 * @param element Element to check. This is the element with the `text-overflow: ellipsis;` style
 * @returns
 */
export const isConcatenated = (element: HTMLElement) => element.offsetWidth < element.scrollWidth;

/**
 * Check if user preferes reduced motion
 * Windows 10: `Windows Settings` > `Ease of Access` > `Display` > `Simplify and Personalize Windows` > `Show animations in Windows`
 *
 * @returns
 */
export const userPrefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Check if an element has a transition applied
 *
 * @param element Element to check. This is the element with the `transition` style
 * @param transition Specific transition to check for (e.g. `translate`)
 * @returns
 */
export const elementHasTransition = (element: HTMLElement, transition: string) => {
  const style = window.getComputedStyle(element);

  // If not specified otherwise, the default value of transition is 'all 0s ease 0s',
  return style.transition !== 'all 0s ease 0s' && style.transition.includes(transition);
};
