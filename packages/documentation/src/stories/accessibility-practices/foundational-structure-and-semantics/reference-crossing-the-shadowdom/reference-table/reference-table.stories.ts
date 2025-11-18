import { StoryObj } from '@storybook/web-components-vite';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: '76ade552-2c03-4d6d-9dce-28daa560f755',
  title:
    'Accessibility Practices/Foundational Structure And Semantics/Reference Crossing The Shadowdom/🔀Cross-Shadow DOM: Attibute Referencing Table',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const referencingData = [
  {
    attribute: 'For',
    cases: [
      {
        case: 'Light DOM/Slot ➔ ShadowDOM',
        worksAcrossShadow: '❌',
        workaround: '✔️ Elements API - ariaLabelledByElements',
        docPage:
          '/?path=/docs/76ade552-2c03-4d6d-9dce-28daa340f7d3--docs#ii-referencing-from-outside-a-shadow-dom-into-that-shadow-dom-',
      },
      {
        case: 'ShadowDOM ➔ Light DOM/Slot',
        worksAcrossShadow: '❌',
        workaround: '⬇️ Set the "id" on the component host',
        docPage:
          '/?path=/docs/76ade552-2c03-4d6d-9dce-28daa3401234--docs#iii-referencing-from-inside-a-shadow-dom-out-to-the-light-dom',
      },
      {
        case: 'ShadowDOM ➔ Other ShadowDOM',
        worksAcrossShadow: '❌',
        workaround:
          'Combine above solutions: ✔️ Elements API - ariaLabelledByElements ⬇️ Set the "id" on the component host',
        docPage:
          '/?path=/docs/76ade552-2c03-4d6d-9dce-28daa3401234--docs#iv-referencing-from-one-shadow-dom-to-another-shadow-dom',
      },
    ],
  },
  {
    attribute: 'Aria-Labelledby',
    cases: [
      {
        case: 'ShadowDOM ➔ Light DOM/Slot',
        worksAcrossShadow: '❌',
        workaround: '✔️ Elements API - ariaLabelledByElements',
        docPage:
          '/?path=/docs/76ade552-2c03-4d6d-9dce-28daa3405678--docs#ii-referencing-from-outside-a-shadow-dom-into-that-shadow-dom',
      },
      {
        case: 'Light DOM/Slot ➔ ShadowDOM',
        worksAcrossShadow: '❌',
        workaround: '⬇️ Set the "id" on the component host',
        docPage:
          '/?path=/docs/76ade552-2c03-4d6d-9dce-28daa3405678--docs#iii-referencing-from-inside-a-shadow-dom-out-to-the-light-dom',
      },
      {
        case: 'ShadowDOM ➔ Other ShadowDOM',
        worksAcrossShadow: '❌',
        workaround:
          'Combine above solutions: ✔️ Elements API - ariaLabelledByElements ⬇️ Set the "id" on the component host',
        docPage:
          '/?path=/docs/76ade552-2c03-4d6d-9dce-28daa3405678--docs#iv-referencing-from-one-shadow-dom-to-another-shadow-dom',
      },
    ],
  },
  {
    attribute: 'Aria-Describedby',
    cases: [
      {
        case: 'ShadowDOM ➔ Light DOM/Slot',
        worksAcrossShadow: '❌',
        workaround: '✔️ Elements API - ariaDescribedByElements',
        docPage:
          '/?path=/docs/76ade552-2c03-4d6d-9dce-28daa3405910--docs#ii-referencing-from-outside-a-shadow-dom-into-that-shadow-dom',
      },
      {
        case: 'Light DOM/Slot ➔ ShadowDOM',
        worksAcrossShadow: '❌',
        workaround: '⬇️ Set the "id" on the component host',
        docPage:
          '/?path=/docs/76ade552-2c03-4d6d-9dce-28daa3405910--docs#ii-referencing-from-outside-a-shadow-dom-into-that-shadow-dom',
      },
      {
        case: 'ShadowDOM ➔ Other ShadowDOM',
        worksAcrossShadow: '❌',
        workaround:
          'Combine above solutions: ✔️ Elements API - ariaDescribedByElements ⬇️ Set the "id" on the component host',
        docPage:
          '/?path=/docs/76ade552-2c03-4d6d-9dce-28daa3405910--docs#iv-referencing-from-one-shadow-dom-to-another-shadow-dom',
      },
    ],
  },
  {
    attribute: 'Aria-Role: List ',
    cases: [
      {
        case: 'All cases',
        worksAcrossShadow:
          '✔️ The relationship is not affected by the ShadowDOM. It will always be valid if the structure is accessible and the "list" element contains its "listitems".',
        workaround: '',
        docPage: '/?path=/docs/76ade552-2c03-4d6d-9dce-28daa3405112--docs',
      },
    ],
  },
];
