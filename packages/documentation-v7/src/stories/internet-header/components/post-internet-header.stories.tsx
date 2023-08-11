import { Args, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { spread } from '@open-wc/lit-helpers';
import { BADGE } from '../../../../.storybook/constants';
import './internet-header.styles.scss';

const meta: Meta = {
  component: 'swisspost-internet-header',
  parameters: {
    layout: 'fullscreen',
    actions: {
      handles: ['headerLoaded', 'languageChanged'],
    },
    badges: [BADGE.STABLE],
  },
  render: renderInternetHeader,
};

export default meta;

function renderInternetHeader(args: Args) {
  const filteredArgs = filterArgs(args, arg => arg !== null && arg !== undefined);
  return html`
    <div class="page-wrapper">
      <swisspost-internet-header project="test" environment="int01" ${spread(filteredArgs)}></swisspost-internet-header>
      <main class="container mt-huge-r">
        <h1 class="mt-huge-r mb-big-r bold">CWF Internet Header</h1>
        <p class="fake-content my-big"></p>
        <p class="fake-content my-big"></p>
        <p class="fake-content my-big"></p>
        <p class="fake-content my-big"></p>
      </main>
    </div>
  `;
}

// TODO: move to utils
const filterArgs = (obj: Args, predicate: (arg: any) => boolean): Args => {
  let result: Args = {},
    key;

  for (key in obj) {
    if (obj.hasOwnProperty(key) && predicate(obj[key])) {
      // Cast boolean false to string so it's displayed in the docs code block. False values are otherwise omitted
      result[key] = obj[key] === false ? 'false' : obj[key];
      if (typeof obj[key] === 'object') {
        result[key] = JSON.stringify(obj[key]);
      }
    }
  }

  return result;
};

type Story = StoryObj;

export const Default: Story = {};
