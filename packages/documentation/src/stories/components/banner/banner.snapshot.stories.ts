import { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';
import bannerMeta from './banner.stories';

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
            type: ['success', 'error', 'warning', 'info'],
            dismissible: [true, false],
            hasButtons: [true, false],
          }).map(
            args => html`
              <post-banner
                type=${args.type}
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
      {
        // dark mode is not yet designed/implemented
        filter: scheme => scheme === 'light',
      },
    );
  },
};
