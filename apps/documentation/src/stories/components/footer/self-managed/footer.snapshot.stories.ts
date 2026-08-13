import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';
import { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import meta from './footer.stories';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj<HTMLPostFooterElement>;

export const Footer: Story = {
  render: (_args: Args, context: StoryContext<HTMLPostFooterElement>) => {
    return schemes(
      () => html`
        ${bombArgs({
          prefooter: [true, false],
          meta: [true, false],
          copyright: [true, false],
          businesssectors: [true, false],
          socialmedia: [true, false],
          app: [true, false],
          linkColumns: [4, 3, 2, 1, 0],
        })
          .filter(args => {
            const { linkColumns, ...booleanArgs } = args;
            return (
              Object.values(booleanArgs).every(value => !!value) ||
              [4, 0].includes(linkColumns as number)
            );
          })
          .filter(args => {
            const { linkColumns, socialmedia, app, ...otherBooleanArgs } = args;
            return Object.values(otherBooleanArgs).every(value => !!value) || (socialmedia && app);
          })
          .map(
            (args: Args) =>
              html`<div class="my-48">${meta.render?.({ ...meta.args, ...args }, context)}</div>`,
          )}
      `,
      {
        // dark mode is not yet implemented correctly
        filter: scheme => scheme === 'light',
      },
    );
  },
};
