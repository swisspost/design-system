const collapseDuration = 350;
const collapseEasing = 'ease';
const collapsedKeyframe: Keyframe = { height: '0', overflow: 'hidden' };

export const collapse = (el: HTMLElement): Animation => {
  const { height } = window.getComputedStyle(el);
  const expandedKeyframe: Keyframe = { height };

  return el.animate(
    [expandedKeyframe, collapsedKeyframe],
    { duration: collapseDuration, easing: collapseEasing, fill: 'forwards' },
  );
};

export const expand = (el: HTMLElement): Animation => {
  const expandedKeyframe: Keyframe = { height: `${el.scrollHeight}px` };

  return el.animate(
    [collapsedKeyframe, expandedKeyframe],
    { duration: collapseDuration, easing: collapseEasing, fill: 'forwards' },
  );
};
