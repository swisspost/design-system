import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';
import { spreadArgs } from '@/utils';
import { clickBlocker } from '@/shared/decorators/click-blocker';

const meta: MetaComponent<HTMLPostUserMenuElement> = {
  id: 'e3cb7914-a3cd-4d84-ad0a-102c3452146f',
  title: 'Raw Components/User Menu',
  tags: ['package:WebComponents', 'devOnly'],
  component: 'post-user-menu',
  render: renderUserMenu,
  decorators: [clickBlocker],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=2883-35906&t=S9WGw6hb21TlQxf0-4&m=dev',
    },
  },
  args: {
    caption: 'Access user links',
    description: 'You are currently logged in as John Doe.',
    user: {
      name: 'John',
      surname: 'Doe',
    }
  },
  argTypes: {
    user: {
      table: {
        type: {
          detail: 'extends { name: \'string\', surname?: \'string\', email?: \'string\' }',
        },
      },
    },
  }
};

export default meta;

// RENDERERS
function renderUserMenu(args: Partial<HTMLPostUserMenuElement>) {
  return html`
    <post-user-menu ${spreadArgs(args)}>
      <post-menu-item>
        <a href="#">
          <post-icon aria-hidden="true" name="profile"></post-icon>
          My Profile
        </a>
      </post-menu-item>
      <post-menu-item>
        <a href="#">
          <post-icon aria-hidden="true" name="letter"></post-icon>
          Messages
        </a>
      </post-menu-item>
      <post-menu-item>
        <a href="#">
          <post-icon aria-hidden="true" name="gear"></post-icon>
          Setting
        </a>
      </post-menu-item>
      <post-menu-item>
        <button type="button">
          <post-icon aria-hidden="true" name="logout"></post-icon>
          Logout
        </button>
      </post-menu-item>
    </post-user-menu>
  `;
}

// STORIES
type Story = StoryObj<HTMLPostUserMenuElement>;

export const Default: Story = {};
