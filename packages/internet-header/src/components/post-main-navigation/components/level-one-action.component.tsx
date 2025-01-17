import { h } from '@stencil/core';
import { NavMainEntity } from '../../../models/header.model';
import { translate } from '../../../services/language.service';

export const LevelOneAction = (props: {
  level: NavMainEntity;
  isOpen: boolean;
  onTouchEnd: (e: Event) => void;
  onKeyDown: (e: Event) => void;
  onClick: (e: Event) => void;
}) => {
  const TagName = props.level.url !== undefined ? 'a' : 'button';
  const title = props.level.title?.trim();
  const text = props.level.text?.trim();

  return (
    <TagName
      class={{
        'main-link': true,
        'active': !!props.level.isActiveOverride,
        'focus': props.isOpen,
      }}
      href={props.level.url}
      title={title !== undefined && title !== text ? props.level.title : undefined}
      tabindex={props.level.url !== undefined ? undefined : 0}
      aria-haspopup={!props.level.noFlyout + ''}
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
