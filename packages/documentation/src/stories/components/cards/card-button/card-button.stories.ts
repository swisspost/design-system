import { Meta, StoryObj, Args } from '@storybook/web-components';
import { html } from 'lit';
import { useArgs } from '@storybook/preview-api';
import scss from './card-button.module.scss';

const meta: Meta = {
  title: 'Components/Cards/Card-Button',
  parameters: {
    badges: [],
  },
  args: {
    focus: 'Focus',
    title: 'Pick@Home',
    icon: 1014,
    favourite: false,
  },
  argTypes: {
    focus: {
      name: 'Focus',
      description: 'The Title of the overarching topic.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
    title: {
      name: 'Title',
      description: 'The Title displayed on the Button',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
    icon: {
      name: 'Icon',
      description: 'The icon that is displayed in the card.',
      control: {
        type: 'number',
      },
      table: {
        category: 'General',
      },
    },
    favourite: {
      name: 'Favourite',
      description: 'Defines whether this card was selected as favourite',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    background: {
      name: 'Backround',
      description: 'You can use the Background classes to color the cards',
      control: {
        type: 'select',
      },
      options: Object.keys(scss),
      table: {
        category: 'General',
      },
    },
  },
};
export default meta;
function cardButtonRender(args: Args, count: number = 42) {
  const [_, updateArgs] = useArgs();
  return html`
    <div class="card card-button ${args.background}" id="${`card-button${count}`}">
      <button
        class="post-card-favourit"
        @click="${() => (count === 42 ? updateArgs({ favourite: !args.favourite }) : '')}"
      >
        ${args.favourite
          ? html`<post-icon class="pi" style="color: #fc0;" name="2574" />`
          : html`<post-icon class="pi" name="2062" />`}
      </button>
      <a href="#" class="card-body d-flex align-items-center">
        <post-icon name=${args.icon}></post-icon>
        <div>
          <p class="mb-1">${args.focus}</p>
          <h5 class="font-weight-bold mb-0">${args.title}</h5>
        </div>
      </a>
      <div></div>
    </div>
  `;
}

type Story = StoryObj;

export const Default: Story = {
  render: (args: Args) => cardButtonRender(args),
};

export const Multiple: Story = {
  render: (args: Args) => {
    let count = 0;
    return html`
      <div class="row card-buttons">
        ${multipleArgs.map(col =>
          col.map(margs => {
            count += 1;
            return html` <div class="col-4">
              ${cardButtonRender({ ...args, ...margs }, count)}
            </div>`;
          }),
        )}
      </div>
    `;
  },
};

const multipleArgs = [
  [
    {
      focus: 'Schwerpunkt',
      title: 'Post zurückbehalten',
      background: 'bg-nightblue',
    },
    {
      focus: 'Schwerpunkt',
      title: 'Briefmarken',
      favourite: true,
      background: 'bg-nightblue',
    },
    {
      focus: 'Schwerpunkt',
      tittle: 'Meine Sendungen',
      background: 'bg-nightblue',
    },
  ],
  [
    {
      focus: 'Schwerpunkt',
      title: 'Pick@home',
      favourite: 'true',
      background: 'bg-nightblue',
    },
    {
      title: 'E-Finance: Demoversion',
      background: 'bg-nightblue',
    },
    {
      title: 'Adressänderung mit Nachsendung',
    },
  ],
  [
    {
      title: 'Filiale mit Partner',
    },
    {
      title: 'Frankieren',
    },
  ],
];
