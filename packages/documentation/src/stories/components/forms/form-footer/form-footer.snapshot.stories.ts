import type { StoryObj } from '@storybook/web-components';
import meta from './form-footer.stories';
import { html } from 'lit';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const FormFooter: Story = {
  render: () => {
    return html`
      <div class="d-flex flex-column gap-3">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div class="${bg} d-flex flex-column p-3 gap-3">
              ${bombArgs({
                secondaryButton: [true, false],
                tertiaryButton: [true, false],
              }).map(
                args => html`
                  <div class="form-footer">
                    <div class="form-footer-primary-actions">
                      <button class="btn btn-primary">
                        Send<post-icon aria-hidden="true" name="3020"></post-icon>
                      </button>

                      ${args.secondaryButton
                        ? html` <button class="btn btn-secondary">Cancel</button> `
                        : null}
                    </div>
                    ${args.tertiaryButton
                      ? html`
                          <button class="btn btn-tertiary">
                            <post-icon aria-hidden="true" name="3024"></post-icon>Back
                          </button>
                        `
                      : null}
                  </div>
                `,
              )}
            </div>
          `,
        )}
      </div>
    `;
  },
};
