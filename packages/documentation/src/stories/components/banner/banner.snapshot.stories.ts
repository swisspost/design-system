import { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { bombArgs, spreadArgs } from '@/utils';
import bannerMeta from './standard-html/banner.stories';
import { getBannerClasses } from './standard-html/getBannerClasses';

const { id, ...metaWithoutId } = bannerMeta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
  parameters: {
    badges: [],
  },
};

type Story = StoryObj;

export const Banner: Story = {
  render: () => html`
    <div class="d-flex gap-16 flex-wrap">
      ${['bg-white', 'bg-dark'].map(
        bg => html`
          <div
            class="${bg + ' d-flex flex-column gap-16 flex-wrap p-16'}"
            data-color-scheme="light"
          >
            ${bombArgs({
              type: bannerMeta?.argTypes?.type?.options,
              icon: ['no-icon', undefined, '1001'],
              action: [true, false],
              dismissible: [true, false],
            })
              .map(args => {
                if (args.icon === 'no-icon') {
                  args.noIcon = true;
                }
                return { ...args, show: true } as Args;
              })
              .map(
                args => html`
                  <div class="${getBannerClasses(args)}" role="alert">
                    ${args.dismissible
                      ? html`
                          <button class="btn-close">
                            <span class="visually-hidden">Close</span>
                          </button>
                        `
                      : null}
                    ${args.icon && !args.noIcon
                      ? html`
                          <post-icon
                            aria-hidden="true"
                            class="banner-icon"
                            name="${args.icon}"
                          ></post-icon>
                        `
                      : null}
                    ${args.action
                      ? html`
                          <div class="banner-content">
                            <h4 class="banner-heading">Banner</h4>
                            <p>
                              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis
                              temporibus blanditiis expedita inventore atque. Numquam velit aut
                              eveniet cumque non?
                            </p>
                          </div>
                        `
                      : html`
                          <h4 class="banner-heading">Banner</h4>
                          <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis
                            temporibus blanditiis expedita inventore atque. Numquam velit aut
                            eveniet cumque non?
                          </p>
                        `}
                    ${args.action
                      ? html`
                          <div class="banner-buttons">
                            <button class="btn btn-primary">
                              <span>Akcepti</span>
                            </button>
                            <button class="btn btn-secondary">
                              <span>Aborti</span>
                            </button>
                          </div>
                        `
                      : null}
                  </div>
                `,
              )}
          </div>
        `,
      )}
    </div>
  `,
};

export const PostBanner: Story = {
  render: () => {
    const textContent =
      '<h4 slot="heading">post-banner</h4>' +
      '<p>' +
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis' +
      'temporibus blanditiis expedita inventore atque. Numquam velit aut' +
      'eveniet cumque non?' +
      '</p>';

    const actionButton =
      '<button class="btn btn-primary" slot="actions" >' +
      '<span>Akcepti</span>' +
      '</button>' +
      '<button class="btn btn-secondary" slot="actions" >' +
      '<span>Aborti</span>' +
      '</button>';

    return html`
      <div class="d-flex gap-16 flex-wrap">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div class="${bg + ' d-flex flex-column gap-16 flex-wrap p-16'}">
              ${bombArgs({
                type: ['neutral', 'success', 'error', 'warning', 'info'],
                icon: ['none', undefined, '1001'],
                dismissible: [true, false],
                innerHTML: [textContent + actionButton, textContent],
              }).map(
                args => html`
                  <post-banner
                    ${spreadArgs(args)}
                    dismiss-label="${args.dismissible ? 'Dismiss' : undefined}"
                  ></post-banner>
                `,
              )}
            </div>
          `,
        )}
      </div>
    `;
  },
};
