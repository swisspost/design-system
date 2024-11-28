import type { StoryObj } from '@storybook/web-components';
import meta, { FooterArgs } from './form-footer.stories';
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
                showPrimaryButton: [true, false],
                showSecondaryButton: [true, false],
                showTertiaryButton: [true, false],
              }).map(args => {
                const primaryButton = args.showPrimaryButton
                  ? html`<button class="btn btn-primary">
                      ${FooterArgs.primaryButtonText}<post-icon
                        aria-hidden="true"
                        name="${FooterArgs.primaryButtonIcon}"
                      ></post-icon>
                    </button>`
                  : null;
                const secondaryButton = args.showSecondaryButton
                  ? html`<button class="btn btn-secondary">
                      ${FooterArgs.secondaryButtonText}
                    </button>`
                  : null;

                return html`
                  <div class="form-footer">
                    ${args.showPrimaryButton || args.showSecondaryButton
                      ? html`
                          <div class="form-footer-primary-actions">
                            ${primaryButton} ${secondaryButton}
                          </div>
                        `
                      : null}
                    ${args.showTertiaryButton
                      ? html`
                          <button class="btn btn-tertiary">
                            <post-icon
                              aria-hidden="true"
                              name="${FooterArgs.tertiaryButtonIcon}"
                            ></post-icon
                            >${FooterArgs.tertiaryButtonText}
                          </button>
                        `
                      : null}
                  </div>
                `;
              })}
            </div>
          `,
        )}
      </div>
    `;
  },
};
