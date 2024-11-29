import { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';
import meta, { Default } from './card-control.stories';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

const bombedArgs = bombArgs({
  type: meta.argTypes?.type?.options,
  validation: meta.argTypes?.validation?.options,
  checked: [false, true],
  disabled: [false, true],
  label: ['Card check text', 'Really long running choice card text that wraps to two lines'],
  showDescription: [false, true],
  description: ['A very long running description that is wrapping to two lines'],
  showIcon: [false, true],
})
  // Filter out disabled and invalid combinations
  .filter(args => !(args.disabled && args.validation === 'is-invalid'));

export const CardControl: StoryObj = {
  render: () => {
    return schemes(
      () => html`
        <div class="row g-3">
          ${bombedArgs.map(args => html` <div class="col-sm-6">${Default.render(args)}</div> `)}
        </div>
      `,
    );
  },
};
