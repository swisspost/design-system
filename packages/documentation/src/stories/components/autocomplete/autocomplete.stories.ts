import type { Args, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';

const CANTON_OPTIONS = html`
  <post-listbox-option value="AG">Aargau</post-listbox-option>
  <post-listbox-option value="AR">Appenzell Ausserrhoden</post-listbox-option>
  <post-listbox-option value="AI">Appenzell Innerrhoden</post-listbox-option>
  <post-listbox-option value="BL">Basel-Landschaft</post-listbox-option>
  <post-listbox-option value="BS">Basel-Stadt</post-listbox-option>
  <post-listbox-option value="BE">Bern</post-listbox-option>
  <post-listbox-option value="FR">Fribourg</post-listbox-option>
  <post-listbox-option value="GE">Genève</post-listbox-option>
  <post-listbox-option value="GL">Glarus</post-listbox-option>
  <post-listbox-option value="GR">Graubünden</post-listbox-option>
  <post-listbox-option value="JU">Jura</post-listbox-option>
  <post-listbox-option value="LU">Luzern</post-listbox-option>
  <post-listbox-option value="NE">Neuchâtel</post-listbox-option>
  <post-listbox-option value="NW">Nidwalden</post-listbox-option>
  <post-listbox-option value="OW">Obwalden</post-listbox-option>
  <post-listbox-option value="SG">St. Gallen</post-listbox-option>
  <post-listbox-option value="SH">Schaffhausen</post-listbox-option>
  <post-listbox-option value="SZ">Schwyz</post-listbox-option>
  <post-listbox-option value="SO">Solothurn</post-listbox-option>
  <post-listbox-option value="TG">Thurgau</post-listbox-option>
  <post-listbox-option value="TI">Ticino</post-listbox-option>
  <post-listbox-option value="UR">Uri</post-listbox-option>
  <post-listbox-option value="VS">Valais</post-listbox-option>
  <post-listbox-option value="VD">Vaud</post-listbox-option>
  <post-listbox-option value="ZG">Zug</post-listbox-option>
  <post-listbox-option value="ZH">Zürich</post-listbox-option>
`;

const meta: MetaComponent = {
  id: 'a3f2c8e1-7b4d-4f9a-b6e5-1d8c3a2f7e90',
  title: 'Components/Autocomplete',
  tags: ['package:WebComponents', 'status:Experimental'],
  component: 'post-autocomplete',
  parameters: {
    badges: [],
  },
  render: render,
  args: {
    label: 'Canton',
    hint: '',
    filterThreshold: 0,
    clearable: false,
  },
  argTypes: {
    label: {
      name: 'Label',
      description: 'The label for the input field.',
      control: { type: 'text' },
      table: { category: 'General' },
    },
    hint: {
      name: 'Hint',
      description: 'An optional hint text displayed below the input.',
      control: { type: 'text' },
      table: { category: 'General' },
    },
    filterThreshold: {
      name: 'filter-threshold',
      description: 'Number of characters to type before filter events are fired.',
      control: { type: 'number' },
      table: { category: 'General' },
    },
    clearable: {
      name: 'clearable',
      description: 'Show or hide a clear button in the input.',
      control: { type: 'boolean' },
      table: { category: 'General' },
    },
  },
};

function render(args: Args) {
  return html`
    <post-autocomplete
      filter-threshold="${args.filterThreshold ?? nothing}"
      ?clearable="${args.clearable}"
    >
      <div class="form-floating">
        <input type="text" class="form-control" placeholder=" " />
        <label>${args.label}</label>
        ${args.hint ? html`<p class="form-hint">${args.hint}</p>` : nothing}
      </div>

      <post-listbox>
        ${CANTON_OPTIONS}
      </post-listbox>
    </post-autocomplete>
  `;
}

export default meta;

export const Default: StoryObj = {};

export const WithHint: StoryObj = {
  args: {
    hint: 'Start typing to search for a canton.',
  },
};

export const WithFilterThreshold: StoryObj = {
  args: {
    label: 'Canton',
    hint: 'Type at least 2 characters to see suggestions.',
    filterThreshold: 2,
  },
};

export const Clearable: StoryObj = {
  args: {
    label: 'Canton',
    clearable: true,
  },
};

export const DetachedListbox: StoryObj = {
  render: (args: Args) => html`
    <post-autocomplete
      options="detached-cantons"
      filter-threshold="${args.filterThreshold ?? nothing}"
      ?clearable="${args.clearable}"
    >
      <div class="form-floating">
        <input type="text" class="form-control" placeholder=" " />
        <label>${args.label}</label>
        ${args.hint ? html`<p class="form-hint">${args.hint}</p>` : nothing}
      </div>
    </post-autocomplete>

    <post-listbox id="detached-cantons">
      ${CANTON_OPTIONS}
    </post-listbox>
  `,
  args: {
    label: 'Canton',
    hint: 'The listbox is placed outside the autocomplete element.',
  },
};

export const CustomFiltering: StoryObj = {
  render: () => html`
    <post-autocomplete filter-threshold="1" id="custom-filter-autocomplete">
      <div class="form-floating">
        <input type="text" class="form-control" placeholder=" " />
        <label>Canton (custom filter)</label>
        <p class="form-hint">Filters using "starts with" instead of "contains".</p>
      </div>

      <post-listbox id="custom-filter-listbox">
        ${CANTON_OPTIONS}
      </post-listbox>
    </post-autocomplete>

    <script type="module">
      const autocomplete = document.getElementById('custom-filter-autocomplete');
      autocomplete.addEventListener('postFilterRequest', (event) => {
        event.preventDefault();
        const query = event.detail.toLowerCase();
        const listbox = document.getElementById('custom-filter-listbox');
        const options = listbox.querySelectorAll('post-listbox-option');
        options.forEach(option => {
          const text = option.textContent.trim().toLowerCase();
          option.setHidden(!text.startsWith(query));
        });
      });
    </script>
  `,
};
