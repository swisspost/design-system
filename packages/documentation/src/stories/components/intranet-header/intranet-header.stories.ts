import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'd59a459b-6f14-47c6-9f98-a36a3f79a6e3',
  title: 'Components/Intranet Header',
  tags: ['package:IntranetHeader'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=28233-57868&mode=design&t=HksCTWa2MMccgMl4-0',
    },
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
        "The email address of the currently logged on user, used to display the user's profile picture." +
        '<p class="alert alert-info alert-sm">By default, a fallback image is displayed.</p>' +
        '<div class="mt-3 alert alert-warning alert-sm">' +
        '<div class="alert-heading">The required input value has recently changed</div>' +
        '<p>Due to the technical conversion of the intranet backend from Sitecore to Sharepoint, the value required for the property to display a user image has changed. Previously the user ID was required, now this property expects the user-specific e-mail address.</p>' +
        '</div>',
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
    hideCurrentUserId: {
      name: 'hideCurrentUserId',
      description: 'Hides the current user id from the profile dropdown',
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
  },
};

export default meta;

export const Default = {};
