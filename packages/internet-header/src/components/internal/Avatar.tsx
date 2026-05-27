import { FunctionalComponent, h } from '@stencil/core';
import { UserConfig } from '@/models/header.model';

export interface AvatarProps {
  user: UserConfig;
  description?: string;
}

export const Avatar: FunctionalComponent<AvatarProps> = ({ user, description }) => (
  <post-avatar
    firstname={user.firstName}
    lastname={user.lastName}
    email={user.email}
    description={description}
  ></post-avatar>
);
