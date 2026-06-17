import { UserMenuConfig } from '@/models/header.model';
import { createIdFrom } from '@/utils/create-id-from';
import { FunctionalComponent, h } from '@stencil/core';
import { Avatar } from './Avatar';
import { Link } from './Link';

export type UserMenuProps = {
  slot?: string;
  textCurrentUser: string;
  textUserLinks: string;
  textAccessUserLinks?: string;
};

export const UserMenu: FunctionalComponent<{ config: UserMenuConfig } & UserMenuProps> = ({
  config,
  slot,
  textCurrentUser,
  textUserLinks,
  textAccessUserLinks,
}) => {
  const userFullname = [config.user.name, config.user.surname].join(' ');
  const userMenuId = createIdFrom(userFullname);
  return (
    <div slot={slot}>
      <post-menu-trigger for={userMenuId}>
        <button class="btn btn-link" type="button">
          <Avatar
            user={config.user}
            description={textCurrentUser.replace('{user}', `${userFullname}`)}
          />
          <span class="visually-hidden">{textAccessUserLinks ?? textUserLinks}</span>
        </button>
      </post-menu-trigger>
      <post-menu id={userMenuId} label={textUserLinks}>
        <div slot="header">
          <Avatar user={config.user} />
          {config.user.company && <p>{config.user.company}</p>}
          {userFullname}
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
