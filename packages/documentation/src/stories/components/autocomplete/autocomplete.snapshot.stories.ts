import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta from './autocomplete.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Autocomplete: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(() => html`
      <div class="d-flex flex-column gap-4">
        ${bombArgs({
          clearable: [false, true],
          disabled: [false, true],
        }).map(
          (args: Args) => html`
            <div>
              <h4 class="mb-3">
                ${args.clearable ? 'Clearable' : 'Default'}${args.disabled ? ' (Disabled)' : ''}
              </h4>
              <post-autocomplete
                filter-threshold="0"
                ?clearable="${args.clearable}"
                ?disabled="${args.disabled}"
              >
                <label for="snapshot-input-${args.clearable}-${args.disabled}" class="form-label">
                  Select a country
                </label>
                <input
                  id="snapshot-input-${args.clearable}-${args.disabled}"
                  class="form-control"
                  type="text"
                  placeholder="Type to search..."
                  ?disabled="${args.disabled}"
                />
                <post-listbox id="snapshot-listbox-${args.clearable}-${args.disabled}">
                  <post-option value="ch">Switzerland</post-option>
                  <post-option value="de">Germany</post-option>
                  <post-option value="fr">France</post-option>
                </post-listbox>
              </post-autocomplete>
            </div>
          `,
        )}
      </div>
    `);
  },
};
