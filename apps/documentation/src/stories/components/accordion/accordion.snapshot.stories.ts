import type { StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta from './accordion.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj<HTMLPostAccordionElement & HTMLPostCollapsibleElementEventMap>;

export const Accordion: Story = {
  render: (
    _args: HTMLPostAccordionElement,
    context: StoryContext<HTMLPostAccordionElement & HTMLPostCollapsibleElementEventMap>,
  ) => {
    return schemes(
      scheme => html`
        <div class="d-flex flex-column gap-16">
          <section>
            <p class="m-0 mb-16">Default accordion</p>
            ${meta.render?.({ ...context.args }, context)}
          </section>
          <section>
            <p class="m-0 mb-16">Findable accordion</p>
            <post-accordion heading-level="3" findable>
              <post-accordion-item collapsed>
                <span slot="header">Findable panel 1</span>
                <p id="snapshot-findable-accordion-${scheme}-1">Findable content 1</p>
              </post-accordion-item>
              <post-accordion-item collapsed>
                <span slot="header">Findable panel 2</span>
                <p id="snapshot-findable-accordion-${scheme}-2">Findable content 2</p>
              </post-accordion-item>
            </post-accordion>
          </section>
          <section>
            <p class="m-0 mb-16">Nested accordions</p>
            <post-accordion heading-level="3">
              <post-accordion-item>
                <span slot="header">Outer panel</span>
                <p>Outer accordion content</p>
                <post-accordion heading-level="4">
                  <post-accordion-item>
                    <span slot="header">Nested panel</span>
                    <p>Nested accordion content</p>
                  </post-accordion-item>
                </post-accordion>
              </post-accordion-item>
            </post-accordion>
          </section>
        </div>
      `,
    );
  },
};
