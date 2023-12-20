import { useArgs } from '@storybook/preview-api';
import { Args, Meta, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../../.storybook/constants';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { PostCardControlCustomEvent } from '@swisspost/design-system-components';

const meta: Meta = {
  title: 'Components/Forms/Card-Control',
  component: 'post-card-control',
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    innerHTML: '',
    label: 'Label',
    description: '',
    controlId: 'ExampleCardControl',
    type: 'checkbox',
    form: '',
    name: '',
    value: '',
    checked: '',
    disabled: '',
    state: 'null',
    icon: '',
  },
  argTypes: {
    innerHTML: {
      name: 'Content',
      description:
        'Defines the HTML markup contained in the card. <div className="alert alert-sm alert-info">Content only shows up if the control is checked.</div><p>Markup accepted: <a href="https://developer.mozilla.org/en-US/docs/Glossary/Block-level_content" target="_blank">block content</a>.<br>This means, you can put everything in it, as long as there is enough space to render it.</p>',
      table: {
        category: 'General',
        type: {
          summary: 'string',
        },
      },
    },
    type: {
      control: {
        type: 'radio',
        labels: {
          checkbox: 'Checkbox',
          radio: 'Radio',
        },
      },
      options: ['checkbox', 'radio'],
    },
    state: {
      control: {
        type: 'radio',
        labels: {
          null: 'Default',
          true: 'Valid',
          false: 'Invalid',
        },
      },
      options: ['null', 'true', 'false'],
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: Args) => {
    const [, updateArgs] = useArgs();

    return html`
      <post-card-control
        label="${args.label}"
        description="${args.description || nothing}"
        control-id="${args.controlId}"
        type="${args.type || nothing}"
        form="${args.form || nothing}"
        name="${args.name || nothing}"
        value="${args.value || nothing}"
        checked="${args.checked || nothing}"
        disabled="${args.disabled || nothing}"
        state="${args.state !== 'null' ? args.state : nothing}"
        icon="${args.icon || nothing}"
        @controlChange="${(e: PostCardControlCustomEvent<boolean>) =>
          updateArgs({ checked: e.detail })}"
      >
        ${unsafeHTML(args.innerHTML)}
      </post-card-control>
    `;
  },
};
