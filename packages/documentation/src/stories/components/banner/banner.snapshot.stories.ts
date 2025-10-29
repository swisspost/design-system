import { StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';
import { useArgs } from 'storybook/preview-api';
import bannerMeta from './banner.stories';

const { id, render, ...metaWithoutId } = bannerMeta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
  parameters: {
    badges: [],
  },
  args: {
    dismissedBanners: {},
  },
  argTypes: {
    dismissedBanners: {
      table: { disable: true },
      control: { disable: true },
    },
  },
};

type Story = StoryObj;

export const Banner: Story = {
  render: () => {
    const [args, updateArgs] = useArgs();
    const dismissedBanners = args.dismissedBanners || {};

    return schemes(
      () => html`
        <div class="d-flex flex-column gap-16 flex-wrap">
          ${bombArgs({
            type: ['success', 'error', 'warning', 'info'],
            dismissible: [true, false],
            hasButtons: [true, false],
          }).map(
            (bannerArgs, index) => {
              const bannerId = `banner-${index}`;
              const isDismissed = dismissedBanners[bannerId];

              if (isDismissed) {
                return html`
                  <button 
                    class="btn btn-secondary align-self-start" 
                    @click=${() => {
                      const newDismissedBanners = { ...dismissedBanners };
                      delete newDismissedBanners[bannerId];
                      updateArgs({ dismissedBanners: newDismissedBanners });
                    }}
                  >
                    Reset ${bannerArgs.type} Banner${bannerArgs.hasButtons ? ' with buttons' : ''}
                  </button>
                `;
              }

              return html`
                <post-banner 
                  type=${bannerArgs.type}
                  @postDismissed=${() => {
                    if (bannerArgs.dismissible) {
                      updateArgs({ 
                        dismissedBanners: { 
                          ...dismissedBanners, 
                          [bannerId]: true 
                        } 
                      });
                    }
                  }}
                >
                  ${bannerArgs.dismissible ? html`
                    <post-closebutton slot="close-button">Close</post-closebutton>
                  ` : nothing}

                  <h4 slot="heading">Heading</h4>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis temporibus
                    blanditiis expedita inventore atque. Numquam velit aut eveniet cumque non?
                  </p>
                  ${bannerArgs.hasButtons
                    ? html` <button class="btn btn-primary" slot="actions">
                          <span>Akcepti</span></button
                        ><button class="btn btn-secondary" slot="actions">
                          <span>Aborti</span>
                        </button>`
                    : ''}
                </post-banner>
              `;
            },
          )}
        </div>
      `,
      {
        // dark mode is not yet designed/implemented
        filter: scheme => scheme === 'light',
      },
    );
  },
};
