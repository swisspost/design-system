import { h } from '@stencil/core';
import { NavMainEntity } from '../../../models/header.model';

export const LevelOneAction = (props: {
  level: NavMainEntity;
  isOpen: boolean;
  onTouchEnd: (e: any) => void;
  onKeyDown: (e: any) => void;
  onClick: (e: any) => void;
}) => {
  const TagName = props.level.url ? 'a' : 'button';

  return (
    <TagName
      class={{
        'main-link': true,
        'active': !!props.level.isActiveOverride,
        'focus': props.isOpen,
      }}
      href={props.level.url}
      title={
        props.level.title?.trim() && props.level.title?.trim() !== props.level.text?.trim()
          ? props.level.title
          : null
      }
      tabindex={props.level.url ? null : 0}
      aria-haspopup={!props.level.noFlyout + ''}
      aria-expanded={props.level.noFlyout ? null : props.isOpen + ''}
      onTouchEnd={e => props.onTouchEnd(e)}
      onKeyDown={e => props.onKeyDown(e)}
      onClick={e => props.onClick(e)}
    >
      <span>{props.level.text}</span>
      <svg aria-hidden="true">
        <use href="#pi-pointy-arrow-right" />
      </svg>
    </TagName>
  );
};
