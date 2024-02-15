import { bombArgs } from '../../../../utils';
import { choiceCardDefault, choiceCardMeta } from './choice-card';
import { StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const { id, ...metaWithoutId } = choiceCardMeta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

const bombedArgs = bombArgs({
  type: choiceCardMeta.argTypes!.type!.options,
  validation: choiceCardMeta.argTypes!.validation!.options,
  checked: [false, true],
  disabled: [false, true],
  label: ['Card check text', 'Really long running choice card text that wraps to two lines'],
  showDescription: [false, true],
  description: ['A very long running description that is wrapping to two lines'],
  showIcon: [false, true],
})
  // Filter out disabled and invalid combinations
  .filter(args => !(args.disabled && args.validation === 'is-invalid'));

export const ChoiceCard: StoryObj = {
  render: () => {
    return html`
      <div class="d-flex gap-3 flex-wrap">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div class="${bg + ' row g-3'}">
              ${bombedArgs.map(
                args => html` <div class="col-sm-6">${choiceCardDefault(args)}</div> `,
              )}
            </div>
          `,
        )}
      </div>
    `;
  },
};
