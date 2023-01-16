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
          : undefined
      }
      tabindex={props.level.url ? undefined : 0}
      aria-haspopup={!props.level.noFlyout + ''}
      aria-expanded={props.level.noFlyout ? null : props.isOpen + ''}
      onTouchEnd={props.onTouchEnd}
      onKeyDown={props.onKeyDown}
      onClick={props.onClick}
    >
      <span>{props.level.text}</span>
      <svg aria-hidden="true">
        <use href="#pi-pointy-arrow-right" />
      </svg>
    </TagName>
  );
};
