'use client';

import { PostIcon, PostTooltip } from '@swisspost/design-system-components-react';

export default function TooltipButton() {
  return (
    <>
      <button className="btn btn-primary" data-tooltip-target="t1">
        <PostIcon name="1000"></PostIcon>test button
      </button>
      <PostTooltip id="t1">I'm a tip!</PostTooltip>
    </>
  );
}
