import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { bombArgs } from '@/utils';

import meta from './collapsible.stories';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj<HTMLPostCollapsibleElement>;

export const Collapsible: Story = {
  render: (_args: Args, context: StoryContext<HTMLPostCollapsibleElement>) => {
    return schemes(
      scheme => html`
        <div class="d-flex flex-column gap-16">
          <div class="row">
            ${bombArgs({
              collapsed: [false, true],
            }).map(
              (args: Args, i: number) => html`
                <div class="col-6 p-16 d-flex flex-column gap-16">
                  <p class="m-0">collapsed: ${args.collapsed}</p>
                  ${meta.render?.(
                    { ...context.args, ...args },
                    { ...context, id: `${context.id}-${scheme}-${i}` },
                  )}
                </div>
              `,
            )}
          </div>
          <section>
            <p class="m-0 mb-16">Findable collapsible</p>
            <post-collapsible-trigger for="snapshot-findable-collapsible-${scheme}">
              <button class="btn btn-secondary mb-16">Toggle findable content</button>
            </post-collapsible-trigger>
            <post-collapsible id="snapshot-findable-collapsible-${scheme}" collapsed findable>
              <p id="snapshot-findable-content-${scheme}" class="border rounded-4 p-24">
                Findable collapsible content
              </p>
            </post-collapsible>
          </section>
          <section>
            <p class="m-0 mb-16">Nested collapsibles</p>
            <post-collapsible-trigger for="snapshot-outer-collapsible-${scheme}">
              <button class="btn btn-secondary mb-16">Toggle outer collapsible</button>
            </post-collapsible-trigger>
            <post-collapsible id="snapshot-outer-collapsible-${scheme}">
              <div class="d-flex flex-column gap-16">
                <p class="border rounded-4 p-24">Outer collapsible content</p>
                <post-collapsible-trigger for="snapshot-inner-collapsible-${scheme}">
                  <button class="btn btn-secondary mb-16">Toggle nested collapsible</button>
                </post-collapsible-trigger>
                <post-collapsible id="snapshot-inner-collapsible-${scheme}" collapsed>
                  <p class="border rounded-4 p-24">Nested collapsible content</p>
                </post-collapsible>
              </div>
            </post-collapsible>
          </section>
        </div>
      `,
    );
  },
};
