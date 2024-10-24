import type { Args, StoryObj, StoryFn, StoryContext } from '@storybook/web-components';
import { html } from 'lit';
import './vertical-align.styles.scss';
import { MetaExtended } from '@root/types';

export const alignOptions = ['baseline', 'top', 'middle', 'bottom', 'text-bottom', 'text-top'];

const meta: MetaExtended = {
  id: 'cf01f6d1-970f-444e-aaa9-8a96c25cc8b2',
  title: 'Utilities/Vertical Align',
  args: {
    align: '',
  },
  argTypes: {
    align: {
      name: 'align',
      description: 'Set the vertical alignment of the text',
      control: {
        type: 'select',
      },
      options: alignOptions,
    },
  },
  render: (args: Args) => {
    return html`<span class="align-baseline">baseline</span>
      <span class="align-top">top</span>
      <span class="align-middle">middle</span>
      <span class="align-bottom">bottom</span>
      <span class="align-text-bottom">text-bottom</span>
      <span class="align-text-top">text-top</span>
      <span class="${args.align ? 'align-' + args.align : ''}"
        >${args.align ? args.align : 'text'}</span
      >`;
  },
  decorators: [
    (story: StoryFn, context: StoryContext) => {
      const storyTemplate = html`<div class="vertical-align-example">
        ${story(context.args, context)}
      </div>`;
      return storyTemplate;
    },
  ],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const tableVersion: Story = {
  render: (args: Args) => {
    return html`<table>
      <tbody>
        <tr>
          <td class="align-baseline">baseline</td>
          <td class="align-top">top</td>
          <td class="align-middle">middle</td>
          <td class="align-bottom">bottom</td>
          <td class="align-text-top">text-top</td>
          <td class="align-text-bottom">text-bottom</td>
          <td class="${args.align ? 'align-' + args.align : ''}">
            ${args.align ? args.align : 'text'}
          </td>
        </tr>
      </tbody>
    </table>`;
  },
};
