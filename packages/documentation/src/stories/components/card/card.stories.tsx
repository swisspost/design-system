import React from 'react';
import { Meta, Story, Args } from '@storybook/react';
import docsPage from './card.docs.mdx';
import { BADGE } from '@geometricpanda/storybook-addon-badges';

export default {
  title: 'Components/Card',
  parameters: {
    docs: {
      page: docsPage,
    },
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    showImage: true,
    imagePosition: 'card-img-top',
    showHeader: false,
    customHeader: null,
    showBody: true,
    customBody: null,
    showTitle: true,
    showSubtitle: false,
    content: 'Contentus momentus vero siteos et accusam iretea et justo.',
    showLinks: false,
    showButton: true,
    showListGroup: false,
    showFooter: false,
    customFooter: null,
  },
  argTypes: {
    showImage: {
      name: 'Show Image',
      description: 'When set to `true`, component renders an image.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Card Image',
      },
    },
    imagePosition: {
      name: 'Image Position',
      description: '',
      if: {
        arg: 'showImage',
      },
      control: {
        type: 'inline-radio',
        labels: {
          'card-img-top': 'Top',
          'card-img-bottom': 'Bottom',
        },
      },
      options: ['card-img-top', 'card-img-bottom'],
      table: {
        category: 'Card Image',
      },
    },
    showHeader: {
      name: 'Show Header',
      description: 'When set to `true`, component renders a header.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Card Header',
      },
    },
    customHeader: {
      name: 'Custom Header',
      description: 'Custom content to insert as header.',
      control: {
        type: 'text',
      },
      table: {
        disable: true,
        category: 'Card Header',
      },
    },
    showBody: {
      name: 'Show Body',
      description: 'When set to `true`, component renders a body.',
      control: {
        type: 'boolean',
      },
      table: {
        disable: true,
        category: 'Card Body',
      },
    },
    customBody: {
      name: 'Custom Body',
      description: 'Custom content to insert as body.',
      control: {
        type: 'text',
      },
      table: {
        disable: true,
        category: 'Card Body',
      },
    },
    showTitle: {
      name: 'Show Title',
      description: 'When set to `true`, component renders a `.card-title`.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Card Body',
      },
    },
    showSubtitle: {
      name: 'Show Subtitle',
      description: 'When set to `true`, component renders a `.card-subtitle`.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Card Body',
      },
    },
    content: {
      name: 'Content',
      description: 'The content to insert into the body area.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Card Body',
      },
    },
    showLinks: {
      name: 'Show Links',
      description: 'When set to `true`, component renders some links in the body area.',
      if: {
        arg: 'showButton',
        truthy: false,
      },
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Card Body',
      },
    },
    showButton: {
      name: 'Show Button',
      description: 'When set to `true`, component renders a button in the body area.',
      if: {
        arg: 'showLink',
        truthy: false,
      },
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Card Body',
      },
    },
    showListGroup: {
      name: 'Show List Group',
      description: 'When set to `true`, component renders a `.list-group`.',
      control: {
        type: 'boolean',
      },
      table: {
        disable: true,
        category: 'Card Body',
      },
    },
    showFooter: {
      name: 'Show Footer',
      description: 'When set to `true`, component renders a footer.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Card Footer',
      },
    },
    customFooter: {
      name: 'Custom Footer',
      description: 'Custom content to insert as footer.',
      control: {
        type: 'text',
      },
      table: {
        disable: true,
        category: 'Card Footer',
      },
    },
  },
  decorators: [
    (Story: Story) => (
      <div onClick={e => e.preventDefault()}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const StoryDecoratorGird = (Story: Story) => (
  <div className="row">
    <div className="col-lg-4 col-rg-6 col-12">
      <Story />
    </div>
  </div>
);

const Template = (args: Args) => {
  const imageClasses = ['card-img-top', args.imagePosition].filter(c => c && c !== null).join(' ');
  const image = (
    <img className={imageClasses} src="https://picsum.photos/id/20/300/200" alt="Card image" />
  );
  const imageTop = args.showImage && args.imagePosition === 'card-img-top' ? image : null;
  const imageBottom = args.showImage && args.imagePosition === 'card-img-bottom' ? image : null;

  const header = args.showHeader
    ? args.customHeader ?? <div className="card-header">Kapo Titulum</div>
    : null;

  const title = args.showTitle ? <h5 className="card-title">Titulum</h5> : null;
  const subtitle = args.showSubtitle ? (
    <h6 className="card-subtitle mb-2 text-muted">Sub Titulum</h6>
  ) : null;
  const links = args.showLinks
    ? [
        <a key="link1" href="#" className="card-link">
          Ligilo teksto
        </a>,
        <a key="link2" href="#" className="card-link">
          Pli da ligo
        </a>,
      ]
    : null;
  const button = args.showButton ? (
    <button className="btn btn-primary btn-animated">
      <span>Butonon teksto</span>
    </button>
  ) : null;
  const body = args.showBody
    ? args.customBody ?? (
        <div className="card-body">
          {title}
          {subtitle}
          <p className="card-text">{args.content}</p>
          {links}
          {button}
        </div>
      )
    : null;

  const listGroup = args.showListGroup ? (
    <ul className="list-group">
      <li className="list-group-item">Ero</li>
      <li className="list-group-item">Dua ero</li>
      <li className="list-group-item">Alio ero</li>
    </ul>
  ) : null;

  const footer = args.showFooter
    ? args.customFooter ?? <div className="card-footer">Piedo Contentus momentus</div>
    : null;

  return (
    <div className="card">
      {imageTop}
      {header}
      {body}
      {listGroup}
      {footer}
      {imageBottom}
    </div>
  );
};

const GroupTemplate = (args: Args) => (
  <div className="card-group">
    {Template(args)}
    {Template({ ...args, content: 'Mallonga teksto' })}
    {Template(args)}
  </div>
);

const ImageOverlayTemplate = (args: Args) => {
  const title = args.showTitle ? <h5 className="card-title">Titulum</h5> : null;
  const subtitle = args.showSubtitle ? (
    <h6 className="card-subtitle mb-2 text-muted">Sub Titulum</h6>
  ) : null;
  const links = args.showLinks
    ? [
        <a key="link1" href="#" className="card-link">
          Ligilo teksto
        </a>,
        <a key="link2" href="#" className="card-link">
          Pli da ligo
        </a>,
      ]
    : null;
  const button = args.showButton ? (
    <button className="btn btn-primary btn-animated">
      <span>Butonon teksto</span>
    </button>
  ) : null;

  return (
    <div className="card">
      <img className="card-img" src="https://picsum.photos/id/20/300/200" alt="Card image" />
      <div className="card-img-overlay">
        {title}
        {subtitle}
        <p className="card-text">{args.content}</p>
        {links}
        {button}
      </div>
    </div>
  );
};

export const Default: Story = Template.bind({});
Default.decorators = [StoryDecoratorGird];

export const ListGroups: Story = Template.bind({});
ListGroups.decorators = [StoryDecoratorGird];
ListGroups.parameters = {
  controls: {
    exclude: ['Show Title', 'Show Subtitle', 'Content', 'Show Links', 'Show Button'],
  },
};
ListGroups.args = {
  showImage: false,
  showHeader: false,
  showBody: false,
  showTitle: true,
  showSubtitle: false,
  showLinks: false,
  showButton: true,
  showListGroup: true,
  showFooter: false,
};
ListGroups.argTypes = {
  showBody: {
    name: 'Show Body',
    description: 'When set to `true`, component renders a body.',
    control: {
      type: 'boolean',
    },
    table: {
      disable: false,
      category: 'Card Body',
    },
  },
};

export const CustomContent: Story = Template.bind({});
CustomContent.decorators = [StoryDecoratorGird];
CustomContent.parameters = {
  controls: {
    exclude: ['Show Title', 'Show Subtitle', 'Content', 'Show Links', 'Show Button'],
  },
};
CustomContent.args = {
  showImage: false,
  showHeader: true,
  customHeader: (
    <div className="card-header d-flex">
      <div className="pi pi-2x pi-3217"></div>
      <h3 className="d-inline font-weight-bold text-large m-0">Detaloj de la Uzanto</h3>
      <div className="ms-auto">
        <a href="#" title="Account Management">
          <span className="pi pi-1.5x pi-3020"></span>
        </a>
      </div>
    </div>
  ),
  showBody: true,
  customBody: (
    <ul className="list-group">
      <li className="d-block list-group-item">
        <div className="d-flex justify-content-between">
          <div>
            Mr
            <br />
            Pronomo Familinomo
            <br />
            Strato 1<br />
            1234 Urbo
          </div>
          <div className="align-self-center">
            <a href="#">
              <span className="pi pi-3193"></span>
            </a>
          </div>
        </div>
      </li>
      <li className="d-block list-group-item">
        <div className="d-flex justify-content-between">
          <div>
            Lingvo: <span className="fw-bold">Germana</span>
          </div>
          <div className="align-self-center">
            <a href="#">
              <span className="pi pi-3193"></span>
            </a>
          </div>
        </div>
      </li>
    </ul>
  ),
  showTitle: false,
  showSubtitle: false,
  showLinks: false,
  showButton: false,
  showFooter: true,
  customFooter: (
    <div className="card-footer card-links">
      <a href="#">Aldonu adreson</a>
      <a href="#">Konfirmu numeron</a>
    </div>
  ),
};

export const Groups: Story = GroupTemplate.bind({});
Groups.parameters = {
  controls: {
    exclude: ['Show Title', 'Show Subtitle', 'Content', 'Show Links', 'Show Button'],
  },
};
Groups.args = {
  showImage: true,
  showHeader: false,
  showBody: true,
  showTitle: true,
  showSubtitle: false,
  showLinks: false,
  showButton: false,
  showListGroup: false,
  showFooter: false,
};

export const ImageOverlay: Story = ImageOverlayTemplate.bind({});
ImageOverlay.decorators = [
  (Story: Story) => (
    <div className="row" onClick={e => e.preventDefault()}>
      <div className="col-lg-6 col-rg-8 col-12">
        <Story />
      </div>
    </div>
  ),
];
ImageOverlay.parameters = {
  controls: {
    include: [],
  },
};
ImageOverlay.args = {
  showImage: true,
  showHeader: false,
  showTitle: true,
  showSubtitle: false,
  showLinks: false,
  showButton: true,
  showFooter: false,
};
