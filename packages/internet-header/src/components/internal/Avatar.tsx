import { UserConfig } from '@/models/user.model';
import { FunctionalComponent, h } from '@stencil/core';

export interface AvatarProps {
  user: UserConfig;
  description?: string;
}

export const Avatar: FunctionalComponent<AvatarProps> = ({ user, description }) => (
  <post-avatar
    firstname={user.name}
    lastname={user.surname}
    email={user.email}
    description={description}
    aria-hidden={description ? undefined : 'true'}
  ></post-avatar>
);
