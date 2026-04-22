import { FunctionalComponent, h } from '@stencil/core';
import { UserMenuConfig } from '@/models/header.model';
import { createIdFrom } from '@/utils/create-id-from';
import { Avatar } from './Avatar';
import { Link } from './Link';

export type UserMenuProps = {
  slot?: string;
  textCurrentUser: string;
  textUserLinks: string;
};

export const UserMenu: FunctionalComponent<{ config: UserMenuConfig } & UserMenuProps> = ({
  config,
  slot,
  textCurrentUser,
  textUserLinks,
}) => {
  const userName = [config.user.firstName, config.user.lastName].join(' ');
  const userMenuId = createIdFrom(userName);
  return (
    <div slot={slot}>
      <post-menu-trigger for={userMenuId}>
        <button class="btn btn-link" type="button">
          <Avatar user={config.user} description={textCurrentUser} />
          <span class="visually-hidden">{textUserLinks}</span>
        </button>
      </post-menu-trigger>
      <post-menu id={userMenuId} label={textUserLinks}>
        <div slot="header">
          <Avatar user={config.user} />
          {userName}
        </div>
        {config.options.map(optionConfig => (
          <post-menu-item>
            <Link config={optionConfig} />
          </post-menu-item>
        ))}
      </post-menu>
    </div>
  );
};
