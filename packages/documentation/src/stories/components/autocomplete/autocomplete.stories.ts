import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';

const COUNTRY_OPTIONS = [
  { value: 'ch', label: 'Switzerland' },
  { value: 'de', label: 'Germany' },
  { value: 'at', label: 'Austria' },
  { value: 'fr', label: 'France' },
  { value: 'it', label: 'Italy' },
  { value: 'li', label: 'Liechtenstein' },
  { value: 'nl', label: 'Netherlands' },
  { value: 'be', label: 'Belgium' },
  { value: 'lu', label: 'Luxembourg' },
  { value: 'es', label: 'Spain' },
  { value: 'pt', label: 'Portugal' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'se', label: 'Sweden' },
  { value: 'no', label: 'Norway' },
  { value: 'dk', label: 'Denmark' },
  { value: 'fi', label: 'Finland' },
];

const meta: MetaComponent = {
  id: '7129-autocomplete',
  title: 'Components/Autocomplete',
  tags: ['package:WebComponents', 'status:Experimental'],
  component: 'post-autocomplete',
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=7129-autocomplete',
    },
  },
  args: {
    label: 'Country',
    placeholder: 'Start typing...',
    filterThreshold: 0,
    clearable: false,
    options: COUNTRY_OPTIONS,
    hint: '',
    disabled: false,
  },
  argTypes: {
    label: {
      name: 'Label',
      description: 'The label for the autocomplete input.',
      control: { type: 'text' },
      table: { category: 'General' },
    },
    placeholder: {
      name: 'Placeholder',
      description: 'Placeholder text for the input.',
      control: { type: 'text' },
      table: { category: 'General' },
    },
    filterThreshold: {
      name: 'Filter Threshold',
      description: 'Number of characters required before filtering starts.',
      control: { type: 'number', min: 0, max: 10 },
      table: { category: 'Behavior' },
    },
    clearable: {
      name: 'Clearable',
      description: 'Shows a clear button to reset the selection.',
      control: { type: 'boolean' },
      table: { category: 'Behavior' },
    },
    options: {
      name: 'Options',
      description: 'Array of options to display.',
      control: { type: 'object' },
      table: { disable: true },
    },
    hint: {
      name: 'Helper Text',
      description: 'Helper text displayed below the input.',
      control: { type: 'text' },
      table: { category: 'General' },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables the autocomplete.',
      control: { type: 'boolean' },
      table: { category: 'States' },
    },
  },
  render: renderAutocomplete,
};

function renderAutocomplete(args: Args, context: StoryContext) {
  const inputId = `autocomplete-input-${context.id}`;
  const listboxId = `autocomplete-listbox-${context.id}`;

  return html`
    <post-autocomplete
      filter-threshold="${args.filterThreshold !== 0 ? args.filterThreshold : nothing}"
      ?clearable="${args.clearable}"
    >
      <label for="${inputId}" class="form-label">${args.label}</label>
      <input
        type="text"
        id="${inputId}"
        class="form-control"
        placeholder="${args.placeholder || nothing}"
        ?disabled="${args.disabled}"
        autocomplete="off"
      />
      ${args.hint ? html`<div class="form-hint">${args.hint}</div>` : nothing}
      <post-listbox id="${listboxId}">
        ${(args.options as typeof COUNTRY_OPTIONS).map(
          option => html`
            <post-option value="${option.value}">${option.label}</post-option>
          `,
        )}
      </post-listbox>
    </post-autocomplete>
  `;
}

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const WithFilterThreshold: Story = {
  args: {
    filterThreshold: 2,
    placeholder: 'Type at least 2 characters...',
  },
};

export const Clearable: Story = {
  args: {
    clearable: true,
  },
};

export const WithHelperText: Story = {
  args: {
    hint: 'Select the country where the package should be delivered.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const ManyOptions: Story = {
  args: {
    label: 'City',
    placeholder: 'Search for a city...',
    filterThreshold: 1,
    options: [
      { value: 'zurich', label: 'Zurich' },
      { value: 'geneva', label: 'Geneva' },
      { value: 'basel', label: 'Basel' },
      { value: 'bern', label: 'Bern' },
      { value: 'lausanne', label: 'Lausanne' },
      { value: 'winterthur', label: 'Winterthur' },
      { value: 'lucerne', label: 'Lucerne' },
      { value: 'stgallen', label: 'St. Gallen' },
      { value: 'lugano', label: 'Lugano' },
      { value: 'biel', label: 'Biel/Bienne' },
      { value: 'thun', label: 'Thun' },
      { value: 'koniz', label: 'Köniz' },
      { value: 'lachaux', label: 'La Chaux-de-Fonds' },
      { value: 'fribourg', label: 'Fribourg' },
      { value: 'schaffhausen', label: 'Schaffhausen' },
      { value: 'chur', label: 'Chur' },
      { value: 'neuchatel', label: 'Neuchâtel' },
      { value: 'vernier', label: 'Vernier' },
      { value: 'uster', label: 'Uster' },
      { value: 'sion', label: 'Sion' },
      { value: 'lancy', label: 'Lancy' },
      { value: 'emmen', label: 'Emmen' },
      { value: 'yverdon', label: 'Yverdon-les-Bains' },
      { value: 'zug', label: 'Zug' },
      { value: 'kriens', label: 'Kriens' },
    ],
  },
};
