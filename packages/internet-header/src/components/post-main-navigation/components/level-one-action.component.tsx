import { h } from '@stencil/core';
import { NavMainEntity } from '../../../models/header.model';
import { translate } from '../../../services/language.service';

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
      onTouchEnd={e => props.onTouchEnd(e)}
      onKeyDown={e => props.onKeyDown(e)}
      onClick={e => props.onClick(e)}
    >
      <span>{props.level.text}</span>
      {props.level.isActiveOverride ? (
        <span class="visually-hidden">{translate('Active navigation element')}</span>
      ) : null}
      <svg aria-hidden="true">
        <use href="#pi-pointy-arrow-right" />
      </svg>
    </TagName>
  );
};
