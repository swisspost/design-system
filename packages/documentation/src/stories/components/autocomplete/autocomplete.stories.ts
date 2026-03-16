import { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';

const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina',
  'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Belgium', 'Brazil',
  'Canada', 'Chile', 'China', 'Colombia', 'Croatia', 'Czech Republic',
  'Denmark', 'Ecuador', 'Egypt', 'Estonia', 'Finland', 'France',
  'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'India',
  'Indonesia', 'Ireland', 'Italy', 'Japan', 'Kenya', 'Latvia',
  'Lithuania', 'Luxembourg', 'Mexico', 'Netherlands', 'New Zealand',
  'Norway', 'Peru', 'Poland', 'Portugal', 'Romania', 'Russia',
  'Serbia', 'Singapore', 'Slovakia', 'Slovenia', 'South Korea',
  'Spain', 'Sweden', 'Switzerland', 'Thailand', 'Turkey',
  'Ukraine', 'United Kingdom', 'United States', 'Uruguay', 'Vietnam',
];

const meta: MetaComponent = {
  id: 'a3e1c7f0-9d2b-4e8a-b6f5-7c3d9a1e4b2f',
  title: 'Components/Autocomplete',
  tags: ['package:WebComponents', 'status:Experimental'],
  component: 'post-autocomplete',
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=0-1',
    },
  },
  argTypes: {
    'filter-threshold': {
      control: { type: 'number' },
      description: 'Minimum number of characters before filtering begins.',
      table: { defaultValue: { summary: '1' } },
    },
    clearable: {
      control: { type: 'boolean' },
      description: 'Whether the input shows a clear button.',
      table: { defaultValue: { summary: 'false' } },
    },
    'debounce-timeout': {
      control: { type: 'number' },
      description: 'Debounce delay in milliseconds for input filtering.',
      table: { defaultValue: { summary: '300' } },
    },
  },
  args: {
    'filter-threshold': 1,
    clearable: false,
    'debounce-timeout': 300,
  },
};

function renderOptions() {
  return COUNTRIES.map(
    country => html`<post-option value="${country}">${country}</post-option>`,
  );
}

function renderOptionsWithDisabled() {
  return COUNTRIES.map(
    (country, index) => html`<post-option value="${country}" ?disabled="${index === 2}">${country}</post-option>`,
  );
}

export default meta;

export const Default: StoryObj = {
  render: (args: Args, context: StoryContext) => {
    const listboxId = `${context.id}-listbox`;
    return html`
      <post-autocomplete
        options="${listboxId}"
        filter-threshold="${args['filter-threshold'] !== 1 ? args['filter-threshold'] : nothing}"
        ?clearable="${args.clearable}"
        debounce-timeout="${args['debounce-timeout'] !== 300 ? args['debounce-timeout'] : nothing}"
      >
        <label class="form-label" for="${context.id}-input">Country</label>
        <input
          id="${context.id}-input"
          class="form-control"
          type="text"
          placeholder="Start typing to search..."
        />
        <div class="form-text">Select your country of residence.</div>
      </post-autocomplete>

      <post-listbox id="${listboxId}">
        ${renderOptions()}
        <span slot="blank-slate">No matching countries found.</span>
      </post-listbox>
    `;
  },
};

export const Clearable: StoryObj = {
  args: {
    clearable: true,
  },
  render: (args: Args, context: StoryContext) => {
    const listboxId = `${context.id}-listbox`;
    return html`
      <post-autocomplete
        options="${listboxId}"
        clearable
      >
        <label class="form-label" for="${context.id}-input">Country</label>
        <input
          id="${context.id}-input"
          class="form-control"
          type="text"
          placeholder="Start typing to search..."
        />
      </post-autocomplete>

      <post-listbox id="${listboxId}">
        ${renderOptions()}
        <span slot="blank-slate">No matching countries found.</span>
      </post-listbox>
    `;
  },
};

export const CustomFilterThreshold: StoryObj = {
  args: {
    'filter-threshold': 3,
  },
  render: (args: Args, context: StoryContext) => {
    const listboxId = `${context.id}-listbox`;
    return html`
      <post-autocomplete
        options="${listboxId}"
        filter-threshold="3"
      >
        <label class="form-label" for="${context.id}-input">Country</label>
        <input
          id="${context.id}-input"
          class="form-control"
          type="text"
          placeholder="Type at least 3 characters..."
        />
        <div class="form-text">Filtering starts after 3 characters.</div>
      </post-autocomplete>

      <post-listbox id="${listboxId}">
        ${renderOptions()}
        <span slot="blank-slate">No matching countries found.</span>
      </post-listbox>
    `;
  },
};

export const CustomFiltering: StoryObj = {
  render: (args: Args, context: StoryContext) => {
    const listboxId = `${context.id}-listbox`;
    return html`
      <post-autocomplete
        options="${listboxId}"
        @postFilterRequest=${(e: CustomEvent) => {
          // Cancel the default filtering
          e.preventDefault();
          // Consumer-controlled filtering: only show options starting with the query
          const query = e.detail.query.toLowerCase();
          const listbox = document.getElementById(listboxId) as any;
          if (listbox) {
            const options = listbox.querySelectorAll('post-option');
            options.forEach((option: any) => {
              const text = option.textContent?.toLowerCase() ?? '';
              if (text.startsWith(query)) {
                option.removeAttribute('hidden');
              } else {
                option.setAttribute('hidden', '');
              }
            });
            // Sync listbox internal state so blank-slate and announcements work
            listbox.updateVisibility();
          }
        }}
      >
        <label class="form-label" for="${context.id}-input">Country (starts with)</label>
        <input
          id="${context.id}-input"
          class="form-control"
          type="text"
          placeholder="Filters by prefix only..."
        />
        <div class="form-text">Uses custom filtering — only matches countries starting with your input.</div>
      </post-autocomplete>

      <post-listbox id="${listboxId}">
        ${renderOptions()}
        <span slot="blank-slate">No countries start with that text.</span>
      </post-listbox>
    `;
  },
};

export const EmptyState: StoryObj = {
  render: (args: Args, context: StoryContext) => {
    const listboxId = `${context.id}-listbox`;
    return html`
      <post-autocomplete
        options="${listboxId}"
      >
        <label class="form-label" for="${context.id}-input">Fruit</label>
        <input
          id="${context.id}-input"
          class="form-control"
          type="text"
          placeholder="Try typing something that doesn't match..."
        />
      </post-autocomplete>

      <post-listbox id="${listboxId}">
        <post-option value="apple">Apple</post-option>
        <post-option value="banana">Banana</post-option>
        <post-option value="cherry">Cherry</post-option>
        <span slot="blank-slate">
          🍎 No fruits match your search. Try "apple", "banana", or "cherry".
        </span>
      </post-listbox>
    `;
  },
};

export const DisabledOptions: StoryObj = {
  render: (args: Args, context: StoryContext) => {
    const listboxId = `${context.id}-listbox`;
    return html`
      <post-autocomplete
        options="${listboxId}"
      >
        <label class="form-label" for="${context.id}-input">Country</label>
        <input
          id="${context.id}-input"
          class="form-control"
          type="text"
          placeholder="Start typing to search..."
        />
        <div class="form-text">Algeria is disabled and cannot be selected.</div>
      </post-autocomplete>

      <post-listbox id="${listboxId}">
        ${renderOptionsWithDisabled()}
        <span slot="blank-slate">No matching countries found.</span>
      </post-listbox>
    `;
  },
};
