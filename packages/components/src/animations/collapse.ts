const collapseDuration = 350;
const collapseEasing = 'ease';
const collapsedKeyframe: Keyframe = { height: '0', overflow: 'hidden' };

const animationOptions: KeyframeAnimationOptions = {
  duration: collapseDuration,
  easing: collapseEasing,
  fill: 'forwards',
};

export function collapse(el: HTMLElement): Animation {
  const expandedKeyframe: Keyframe = { height: window.getComputedStyle(el).height };

  return el.animate([expandedKeyframe, collapsedKeyframe], animationOptions);
}

export function expand(el: HTMLElement): Animation {
  const expandedKeyframe: Keyframe = { height: `${el.scrollHeight}px`, offset: 1 };
  const finalKeyframe: Keyframe = { height: 'auto', overflow: 'visible' };

  return el.animate([collapsedKeyframe, expandedKeyframe, finalKeyframe], animationOptions);
}
