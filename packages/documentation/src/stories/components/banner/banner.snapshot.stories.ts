import { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';
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
  render: () => {
    return schemes(
      () => html`
        <div class="d-flex flex-column gap-16 flex-wrap">
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
                          temporibus blanditiis expedita inventore atque. Numquam velit aut eveniet
                          cumque non?
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
    );
  },
};

export const PostBanner: Story = {
  render: () => {
    return schemes(
      () => html`
        <div class="d-flex flex-column gap-16 flex-wrap">
          ${bombArgs({
            type: ['neutral', 'success', 'error', 'warning', 'info'],
            icon: ['none', undefined, '1001'],
            dismissible: [true, false],
            hasButtons: [true, false],
          }).map(
            args => html`
              <post-banner
                type=${args.type}
                icon=${args.icon}
                dismissible=${args.dismissible}
                dismiss-label="${args.dismissible ? 'Dismiss' : undefined}"
              >
                <h4 slot="heading">Heading</h4>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis temporibus
                  blanditiis expedita inventore atque. Numquam velit aut eveniet cumque non?
                </p>
                ${args.hasButtons
                  ? html` <button class="btn btn-primary" slot="actions">
                        <span>Akcepti</span></button
                      ><button class="btn btn-secondary" slot="actions">
                        <span>Aborti</span>
                      </button>`
                  : ''}
              </post-banner>
            `,
          )}
        </div>
      `,
    );
  },
};
