import { Meta } from '@storybook/web-components';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta = {
  id: 'Components/Intranet Header',
  title: 'Components/Intranet Header',
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  argTypes: {
    additionalInfo: {
      name: 'additionalInfo',
      description:
        'Additional user information, displayed as an item in the user dropdown.' +
        '<p class="alert alert-info alert-sm">By default, the item is not rendered.</p>',
      control: 'text',
      table: {
        defaultValue: {
          summary: '',
        },
        type: {
          summary: 'string',
        },
      },
    },
    currentUserId: {
      name: 'currentUserId',
      description:
        "The ID of the currently logged-in user, used to display the user's profile picture." +
        '<p class="alert alert-info alert-sm">By default, a fallback image is displayed.</p>',
      control: 'text',
      table: {
        defaultValue: {
          summary: '',
        },
        type: {
          summary: 'string',
        },
      },
    },
    displayName: {
      name: 'displayName',
      description:
        'The name of the currently logged-in user, displayed as an item in the user dropdown.' +
        '<p class="alert alert-info alert-sm">By default, the item is not rendered.</p>',
      control: 'text',
      table: {
        defaultValue: {
          summary: '',
        },
        type: {
          summary: 'string',
        },
      },
    },
    hasNavbar: {
      name: 'hasNavbar',
      description: 'If `true`, the navigation bar is rendered otherwise it is not.',
      control: 'boolean',
      table: {
        defaultValue: {
          summary: 'true',
        },
        type: {
          summary: 'boolean',
        },
      },
    },
    languages: {
      name: 'languages',
      description:
        'A comma-separated string that defines the languages available in the language selector of the user dropdown.' +
        '<p class="alert alert-info alert-sm">The possible languages are: `de`, `fr`, `it` and `en`.</p>',
      control: 'text',
      table: {
        defaultValue: {
          summary: 'de, fr, it, en',
        },
        type: {
          summary: 'string',
        },
      },
    },
    logoUrl: {
      name: 'logoUrl',
      description: 'The URL to redirect to when the user clicks on the Post logo.',
      control: 'text',
      table: {
        defaultValue: {
          summary: '',
        },
        type: {
          summary: 'string',
        },
      },
    },
    optionDropdownContent: {
      name: 'optionDropdownContent',
      description:
        'An Angular template that can be used to define custom items in the user dropdown.' +
        '<p class="alert alert-info alert-sm">By default, the item is not rendered.</p>',
      table: {
        defaultValue: {
          summary: 'null',
        },
        type: {
          summary: 'TemplateRef<any>',
        },
      },
    },
    optionHeaderContent: {
      name: 'optionHeaderContent',
      description:
        'An Angular template that can be used to define custom content in the header to the left of the user' +
        ' dropdown.<p class="alert alert-info alert-sm">By default, the item is not rendered.</p>',
      table: {
        defaultValue: {
          summary: 'null',
        },
        type: {
          summary: 'TemplateRef<any>',
        },
      },
    },
    searchUrl: {
      name: 'searchUrl',
      description:
        'The URL to send search data to when the search form is submitted.' +
        '<p class="alert alert-info alert-sm">This prop is required when `showIntranetSearch` is set to `true`.</p>',
      control: 'text',
      table: {
        defaultValue: {
          summary: '',
        },
        type: {
          summary: 'string',
        },
      },
    },
    showIntranetSearch: {
      name: 'showIntranetSearch',
      description: 'If `true`, the search bar is rendered otherwise it is not.',
      control: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: {
          summary: 'boolean',
        },
      },
    },
    siteTitle: {
      name: 'siteTitle',
      description: 'The application name, displayed in the header to the right of the Post logo.',
      control: 'text',
      table: {
        defaultValue: {
          summary: '',
        },
        type: {
          summary: 'string',
        },
      },
    },
  },
};

export default meta;

export const Default = {};
