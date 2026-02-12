import { isMotionReduced } from '@/utils';
import { Build } from '@stencil/core';

const collapseDuration = 350;
const collapseEasing = 'ease';
export const collapsedKeyframe: Keyframe = { height: '0', overflow: 'hidden' };

const animationOptions: KeyframeAnimationOptions = {
  duration: isMotionReduced() ? 0 : collapseDuration,
  easing: collapseEasing,
  fill: 'forwards',
};

export function collapse(el: HTMLElement): Animation {
  const elHeight = Build.isBrowser ? window.getComputedStyle(el).height : `${el.scrollHeight}px`;
  const expandedKeyframe: Keyframe = { height: elHeight };

  return el.animate([expandedKeyframe, collapsedKeyframe], animationOptions);
}

export function expand(el: HTMLElement): Animation {
  const expandedKeyframe: Keyframe = { height: `${el.scrollHeight}px`, offset: 1 };
  const finalKeyframe: Keyframe = { height: 'auto', overflow: 'visible' };

  return el.animate([collapsedKeyframe, expandedKeyframe, finalKeyframe], animationOptions);
}
