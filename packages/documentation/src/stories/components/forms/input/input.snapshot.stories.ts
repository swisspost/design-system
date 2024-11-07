import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './input.stories';
import { html } from 'lit';
import { COMBINATIONS, getCombinations } from '@/utils/inputComponentsGetCombinations';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
  render: renderInputSnapshot,
};

function renderInputSnapshot(_args: Args, context: StoryContext) {
  const combinations = [
    ...COMBINATIONS,
    {
      label: `Label - no Placeholder`,
      placeholder: null,
    },
    {
      label: `Label - with Value`,
      value: 'Lorem Ipsum',
    },
    {
      label: `Label - Floating label`,
      floatingLabel: true,
    },
  ];
  return html`
    <div class="d-flex flex-wrap align-items-start gap-16">
      ${['bg-white', 'bg-dark'].map(
        bg => html`
          <div class="${bg} d-flex gap-16 flex-column p-16">
            <div class="mb-3">
              <label for="formFile" class="form-label">Default file input example</label>
              <input class="form-control" type="file" id="formFile" />
            </div>
            <div class="mb-3">
              <label for="formFileMultiple" class="form-label">Multiple files input example</label>
              <input class="form-control" type="file" id="formFileMultiple" multiple />
            </div>
            <div class="mb-3">
              <label for="formFileDisabled" class="form-label">Disabled file input example</label>
              <input class="form-control" type="file" id="formFileDisabled" disabled />
            </div>
            <div class="mb-3">
              <label for="formFileSm" class="form-label">Small file input example</label>
              <input class="form-control form-control-sm" id="formFileSm" type="file" />
            </div>
            <div>
              <label for="formFileLg" class="form-label">Large file input example</label>
              <input class="form-control form-control-lg" id="formFileLg" type="file" />
            </div>
            <h3>Standard</h3>
            ${getCombinations('size', [true], combinations)
              .filter(
                (args: Args) =>
                  !args.value ||
                  (args.value &&
                    (context.args.type === 'text' || context.args.type === 'password')),
              )
              .map((args: Args) => {
                context.id = `a-${crypto.randomUUID()}`;
                return html`
                  <div>
                    <div>${meta.render?.({ ...context.args, ...args }, context)}</div>
                  </div>
                `;
              })}
            <h3>Floating Label</h3>
            ${getCombinations('floatingLabel', [true], combinations)
              .filter(
                (args: Args) =>
                  !args.value ||
                  (args.value &&
                    (context.args.type === 'text' || context.args.type === 'password')),
              )
              .map((args: Args) => {
                context.id = `${bg}-${crypto.randomUUID()}`;
                return html` <div>${meta.render?.({ ...context.args, ...args }, context)}</div> `;
              })}
          </div>
        `,
      )}
    </div>
  `;
}

type Story = StoryObj;

export const Inputtext: Story = {
  args: {
    type: 'text',
  },
};
export const Inputpassword: Story = {
  args: {
    type: 'password',
  },
};
export const Inputdate: Story = {
  args: {
    type: 'date',
  },
};
export const Inputdatetimelocal: Story = {
  args: {
    type: 'datetime-local',
  },
};
export const Inputmonth: Story = {
  args: {
    type: 'month',
  },
};
export const Inputweek: Story = {
  args: {
    type: 'week',
  },
};
export const Inputtime: Story = {
  args: {
    type: 'time',
  },
};
