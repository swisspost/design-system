import { UserMenuConfig } from '@/models/header.model';
import { createIdFrom } from '@/utils/create-id-from';
import { FunctionalComponent, h } from '@stencil/core';
import { Avatar } from './Avatar';
import { Link } from './Link';

export type UserMenuProps = {
  slot?: string;
  textCurrentUser: string;
  textUserLinks: string;
  textAccessUserLinks: string;
};

export const UserMenu: FunctionalComponent<{ config: UserMenuConfig } & UserMenuProps> = ({
  config,
  slot,
  textCurrentUser,
  textUserLinks,
  textAccessUserLinks,
}) => {
  const isB2C = config.user.userType === 'B2C';
  const isB2B = config.user.userType === 'B2B';
  const canChangeUserAndProfile = (isB2C || isB2B) && config.user.changeUserAndProfile === 'userAndProfile';
  const canChangeCompany = isB2B && config.user.canChangeCompany && config.user.company;
  const canSeeAccountSwitch = canChangeUserAndProfile || canChangeCompany;

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
          <span class="visually-hidden">{textAccessUserLinks}</span>
        </button>
      </post-menu-trigger>
      <post-menu id={userMenuId} label={textUserLinks}>
        <div slot="header">
          <Avatar user={config.user} />
          {config.user.company && <p>{config.user.company}</p>}
          <p>{userFullname}</p>
        </div>
        {config.accountSwitch && canSeeAccountSwitch && (
          <post-menu-item>
            <Link
              config={{
                text: config.accountSwitch.text,
                url: `${config.accountSwitch.url}?returnURL=${encodeURIComponent(window.location.href)}`,
                icon: config.accountSwitch.icon,
              }}
            />
          </post-menu-item>
        )}
        {config.options.map((optionConfig, index) => (
          <post-menu-item key={index}>
            <Link config={optionConfig} />
          </post-menu-item>
        ))}
      </post-menu>
    </div>
  );
};