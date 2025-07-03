import { StoryObj } from '@storybook/web-components';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: '76ade552-2c03-4d6d-9dce-28daa560f7d2',
  title:
    'Accessibility Practices/Foundational Structure And Semantics/Reference Relationships/Crossing The Shadow Dom/*Reference Table*',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const referencingData = [
  {
    attribute: 'For',
    cases: [
      {
        case: 'Light DOM/Slotted Content -> Shadow DOM',
        worksAcrossShadow: '❌',
        workaround1: '✔️',
        workaround2: '✔️',
        docPage:
          '/?path=/docs/76ade552-2c03-4d6d-9dce-28daa340f7d3--docs#ii-referencing-from-outside-a-shadow-dom-into-that-shadow-dom-',
      },
      {
        case: 'Shadow DOM -> Light DOM/Slotted Content',
        worksAcrossShadow: '❌',
        workaround1: '❌',
        workaround2: '✔️',
        docPage:
          '/?path=/docs/76ade552-2c03-4d6d-9dce-28daa340f7d3--docs#iii-referencing-from-inside-a-shadow-dom-out-to-the-light-dom-',
      },
      {
        case: 'Shadow DOM -> Other Shadow DOM',
        worksAcrossShadow: '❌',
        workaround1: '❌',
        workaround2: '✔️',
        docPage:
          '/?path=/docs/76ade552-2c03-4d6d-9dce-28daa340f7d3--docs#ivreferencing-from-a-shadow-dom-out-to-another-shadow-dom-',
      },
    ],
  },
  {
    attribute: 'Aria-Labelledby',
    cases: [
      {
        case: 'Light DOM/Slotted Content -> Shadow DOM',
        worksAcrossShadow: '❌',
        workaround1: '✔️',
        workaround2: '✔️',
        docPage:
          '/?path=/docs/76ade552-2c03-4d6d-9dce-28daa340f7d5--docs#ii-referencing-from-outside-a-shadow-dom-into-that-shadow-dom-',
      },
      {
        case: 'Shadow DOM -> Light DOM/Slotted Content',
        worksAcrossShadow: '❌',
        workaround1: '❌',
        workaround2: '✔️',
        docPage:
          '/?path=/docs/76ade552-2c03-4d6d-9dce-28daa340f7d5--docs#iii-referencing-from-inside-a-shadow-dom-out-to-the-light-dom-',
      },
      {
        case: 'Shadow DOM -> Other Shadow DOM',
        worksAcrossShadow: '❌',
        workaround1: '❌',
        workaround2: '✔️',
        docPage:
          '/?path=/docs/76ade552-2c03-4d6d-9dce-28daa340f7d5--docs#iv-referencing-from-one-shadow-dom-to-another-shadow-dom',
      },
    ],
  },
  {
    attribute: 'Aria-Describedby',
    cases: [
      {
        case: 'Light DOM/Slotted Content -> Shadow DOM',
        worksAcrossShadow: '❌',
        workaround1: '✔️',
        workaround2: '❓',
        docPage:
          '/?path=/docs/76ade552-2c03-4d6d-9dce-28daa340f3g6--docs#ii-referencing-from-outside-a-shadow-dom-into-that-shadow-dom-',
      },
      {
        case: 'Shadow DOM -> Light DOM/Slotted Content',
        worksAcrossShadow: '❌',
        workaround1: '',
        workaround2: '',
        docPage:
          '/?path=/docs/76ade552-2c03-4d6d-9dce-28daa340f3g6--docs#ii-referencing-from-outside-a-shadow-dom-into-that-shadow-dom-',
      },
      {
        case: 'Shadow DOM -> Other Shadow DOM',
        worksAcrossShadow: '❌',
        workaround1: '',
        workaround2: '',
        docPage:
          '/?path=/docs/76ade552-2c03-4d6d-9dce-28daa340f3g6--docs#ii-referencing-from-outside-a-shadow-dom-into-that-shadow-dom-',
      },
    ],
  },
  {
    attribute: 'Aria-Controls',
    cases: [
      {
        case: 'Light DOM/Slotted Content -> Shadow DOM',
        worksAcrossShadow: '',
        workaround1: '',
        workaround2: '',
        docPage: '',
      },
      {
        case: 'Shadow DOM -> Light DOM/Slotted Content',
        worksAcrossShadow: '',
        workaround1: '',
        workaround2: '',
        docPage: '',
      },
      {
        case: 'Shadow DOM -> Other Shadow DOM',
        worksAcrossShadow: '',
        workaround1: '',
        workaround2: '',
        docPage: '',
      },
    ],
  },
  {
    attribute: 'List Role',
    cases: [
      {
        case: 'Light DOM/Slotted Content -> Shadow DOM',
        worksAcrossShadow: '❓',
        workaround1: '',
        workaround2: '',
        docPage:
          '/?path=/docs/76ade552-2c03-4d6d-9dce-28daa346f456--docs#ii-parent-in-the-light-dom---children-into-that-shadow-dom',
      },
      {
        case: 'Shadow DOM -> Light DOM/Slotted Content',
        worksAcrossShadow: '✔️',
        workaround1: '',
        workaround2: '',
        docPage:
          '/?path=/docs/76ade552-2c03-4d6d-9dce-28daa346f456--docs#iii-parent-in-the-shadow-dom---children-out-to-the-light-dom-%EF%B8%8F',
      },
      {
        case: 'Shadow DOM -> Other Shadow DOM',
        worksAcrossShadow: '✔️',
        workaround1: '',
        workaround2: '',
        docPage:
          '/?path=/docs/76ade552-2c03-4d6d-9dce-28daa346f456--docs#iii-parent-in-the-shadow-dom---children-out-to-the-light-dom-%EF%B8%8F',
      },
    ],
  },
];
