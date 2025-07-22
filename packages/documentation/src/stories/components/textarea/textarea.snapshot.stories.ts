import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './textarea.stories';
import { html } from 'lit';
import { COMBINATIONS, getCombinations } from '@/utils/inputComponentsGetCombinations';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

const SCHEME = ['light', 'dark'];

type Story = StoryObj;

export const Textarea: Story = {
  render: (_args: Args, context: StoryContext) => {
    const combinations = [
      ...COMBINATIONS,
      {
        title: 'Small rows',
        label: `Label`,
        rows: 3,
      },
      {
        title: 'Large rows',
        label: `Label`,
        rows: 8,
      },
      {
        title: 'Text inside the textarea',
        label: `Label`,
        textInside:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
      },
      {
        title: 'Not resizable',
        label: `Label`,
        resize: 'resize: none',
      },
    ];

    // Special combinations for disabled overflow text with floating label
    const disabledOverflowTextCombinations = [
      {
        title: 'Disabled with overflow text',
        label: `Floating Label`,
        floatingLabel: true,
        disabled: true,
        textInside:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
        rows: 3,
      },
    ];

    return html`
      <h1 class="ps-48">Textarea</h1>
      ${SCHEME.map(
        scheme => html`
          <div data-color-scheme="${scheme}" class="palette-default px-48">
            <h2 class="h3 pt-32">Standard Combinations - ${scheme} theme</h2>
            <h3 class="h4">Floating Label</h3>
            <div class="row">
              ${getCombinations('floatingLabel', [true], combinations).map((args: Args) => {
                context.id = crypto.randomUUID();
                return html` <div class="col-md-6 mb-16">
                  <h4 class="h6">${args.title}</h4>
                  <div class="mb-4">${meta.render?.({ ...context.args, ...args }, context)}</div>
                </div>`;
              })}
            </div>

            <h3 class="h4">Standard Label</h3>
            <div class="row">
              ${getCombinations('floatingLabel', [false], combinations).map((args: Args) => {
                context.id = crypto.randomUUID();
                return html` <div class="col-md-6 mb-16">
                  <h4 class="h6">${args.title}</h4>
                  <div class="mb-4">${meta.render?.({ ...context.args, ...args }, context)}</div>
                </div>`;
              })}
            </div>

            <h2 class="h3">Disabled with Overflow Text - ${scheme} Theme</h2>
            <div class="row">
              ${disabledOverflowTextCombinations.map((args: Args) => {
                context.id = crypto.randomUUID();
                return html` <div class="col-md-6 mb-16">
                  <h3 class="h6">${args.title}</h3>
                  <div class="mb-4">${meta.render?.({ ...context.args, ...args }, context)}</div>
                </div>`;
              })}
            </div>
          </div>
        `,
      )}
    `;
  },
};
