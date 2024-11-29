import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import meta from './position.stories';
import { bombArgs } from '@/utils';
import './position.styles.scss';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Position: Story = {
  render: () => {
    return schemes(
      () => html`
        <div class="position-example">
          <h1>Position</h1>
          <h2>Position methods</h2>
          <div class="py-16">
            ${(meta.argTypes?.position?.options ?? []).map((position: string) => {
              return html`
                <p>Position ${position}</p>
                <div class="snapshot-outer-container">
                  <div class="snapshot-container bg-gray m-0 position-relative">
                    <div class="bg-dark"></div>
                    <div class="bg-yellow position-${position} top-0 start-50">I'm ${position}</div>
                    <div class="bg-dark"></div>
                    <div class="bg-dark"></div>
                    <div class="bg-dark"></div>
                  </div>
                </div>
              `;
            })}
            <h3>Position arrangement</h3>
            ${bombArgs({
              x: ['start-0', 'start-50', 'start-100', 'end-0', 'end-50', 'end-100'],
              y: ['top-0', 'top-50', 'top-100', 'bottom-0', 'bottom-50', 'bottom-100'],
            }).map(
              args =>
                html`
                  <p class="mt-12">
                    ${(args.x as string).split('-')[0]}: ${(args.x as string).split('-')[1]}% /
                    ${(args.y as string).split('-')[0]}: ${(args.y as string).split('-')[1]}% /
                    yellow: translate-middle / blue: no translate-middle
                  </p>
                  <div class="snapshot-arrange-container">
                    <div class="bg-yellow ${args.x} ${args.y} translate-middle"></div>
                    <div class="bg-info ${args.x} ${args.y}"></div>
                  </div>
                `,
            )}
          </div>
        </div>
      `,
    );
  },
};
