import { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';
import { spreadArgs } from '@/utils';

const COUNTRY_OPTIONS = [
  { value: 'ch', label: 'Switzerland' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'it', label: 'Italy' },
  { value: 'at', label: 'Austria' },
  { value: 'li', label: 'Liechtenstein' },
  { value: 'be', label: 'Belgium' },
  { value: 'nl', label: 'Netherlands' },
  { value: 'lu', label: 'Luxembourg' },
  { value: 'es', label: 'Spain' },
];

const meta: MetaComponent = {
  id: 'f8e2a1b3-4c5d-6e7f-8a9b-0c1d2e3f4a5b',
  title: 'Components/Autocomplete',
  component: 'post-autocomplete',
  tags: ['package:WebComponents', 'status:Experimental'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=178-10960',
    },
  },
  args: {
    label: 'Select a country',
    placeholder: 'Type to search...',
    filterThreshold: 0,
    clearable: false,
    disabled: false,
    required: false,
    noResultsText: 'No results found',
  },
  argTypes: {
    label: {
      name: 'Label',
      description: 'The label text for the autocomplete field.',
      control: { type: 'text' },
      table: { category: 'General' },
    },
    placeholder: {
      name: 'Placeholder',
      description: 'Placeholder text shown in the input when empty.',
      control: { type: 'text' },
      table: { category: 'General' },
    },
    filterThreshold: {
      name: 'Filter Threshold',
      description:
        'Minimum number of characters required before filtering begins. Set to 0 to show all options on focus.',
      control: { type: 'number', min: 0, max: 10 },
      table: { category: 'Behavior' },
    },
    clearable: {
      name: 'Clearable',
      description: 'Whether to show a clear button when the input has a value.',
      control: { type: 'boolean' },
      table: { category: 'Behavior' },
    },
    disabled: {
      name: 'Disabled',
      description: 'Whether the autocomplete is disabled.',
      control: { type: 'boolean' },
      table: { category: 'States' },
    },
    required: {
      name: 'Required',
      description: 'Whether the autocomplete is required in a form.',
      control: { type: 'boolean' },
      table: { category: 'States' },
    },
    noResultsText: {
      name: 'No Results Text',
      description: 'Message shown when no options match the filter.',
      control: { type: 'text' },
      table: { category: 'Content' },
    },
  },
};

export default meta;

type Story = StoryObj;

function renderAutocomplete(args: Args, context: StoryContext, options = COUNTRY_OPTIONS) {
  const autocompleteId = `autocomplete-${context.id}`;
  const inputId = `input-${context.id}`;
  const listboxId = `listbox-${context.id}`;

  return html`
    <post-autocomplete
      id="${autocompleteId}"
      filter-threshold="${args.filterThreshold}"
      ?clearable="${args.clearable}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      no-results-text="${args.noResultsText}"
    >
      <label for="${inputId}" class="form-label">${args.label}</label>
      <input
        id="${inputId}"
        class="form-control"
        type="text"
        placeholder="${args.placeholder || nothing}"
        ?disabled="${args.disabled}"
      />
      <post-listbox id="${listboxId}">
        ${options.map(
          option => html`
            <post-option value="${option.value}">${option.label}</post-option>
          `,
        )}
      </post-listbox>
    </post-autocomplete>
  `;
}

export const Default: Story = {
  render: (args: Args, context: StoryContext) => renderAutocomplete(args, context),
};

export const WithFilterThreshold: Story = {
  args: {
    filterThreshold: 2,
    label: 'Country (type 2+ characters)',
    placeholder: 'Start typing to search...',
  },
  render: (args: Args, context: StoryContext) => renderAutocomplete(args, context),
};

export const Clearable: Story = {
  args: {
    clearable: true,
    label: 'Country (clearable)',
  },
  render: (args: Args, context: StoryContext) => renderAutocomplete(args, context),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Country (disabled)',
  },
  render: (args: Args, context: StoryContext) => renderAutocomplete(args, context),
};

export const Required: Story = {
  args: {
    required: true,
    label: 'Country (required)',
  },
  render: (args: Args, context: StoryContext) => html`
    <form
      @submit="${(e: Event) => {
        e.preventDefault();
        alert('Form submitted!');
      }}"
    >
      ${renderAutocomplete(args, context)}
      <button type="submit" class="btn btn-primary mt-3">Submit</button>
    </form>
  `,
};

export const WithDisabledOptions: Story = {
  args: {
    label: 'Country (some options disabled)',
  },
  render: (args: Args, context: StoryContext) => {
    const autocompleteId = `autocomplete-${context.id}`;
    const inputId = `input-${context.id}`;
    const listboxId = `listbox-${context.id}`;

    return html`
      <post-autocomplete
        id="${autocompleteId}"
        filter-threshold="${args.filterThreshold}"
        ?clearable="${args.clearable}"
        ?disabled="${args.disabled}"
        no-results-text="${args.noResultsText}"
      >
        <label for="${inputId}" class="form-label">${args.label}</label>
        <input
          id="${inputId}"
          class="form-control"
          type="text"
          placeholder="${args.placeholder || nothing}"
        />
        <post-listbox id="${listboxId}">
          <post-option value="ch">Switzerland</post-option>
          <post-option value="de" disabled>Germany (unavailable)</post-option>
          <post-option value="fr">France</post-option>
          <post-option value="it" disabled>Italy (unavailable)</post-option>
          <post-option value="at">Austria</post-option>
        </post-listbox>
      </post-autocomplete>
    `;
  },
};

export const CustomFiltering: Story = {
  args: {
    label: 'Country (custom async filter)',
    placeholder: 'Type to search countries...',
    filterThreshold: 1,
  },
  render: (args: Args, context: StoryContext) => {
    const autocompleteId = `autocomplete-${context.id}`;
    const inputId = `input-${context.id}`;
    const listboxId = `listbox-${context.id}`;

    return html`
      <post-autocomplete
        id="${autocompleteId}"
        filter-threshold="${args.filterThreshold}"
        ?clearable="${args.clearable}"
        no-results-text="${args.noResultsText}"
        @postFilterRequest="${(e: CustomEvent) => {
          e.preventDefault(); // Prevent default filtering
          const query = e.detail.query.toLowerCase();

          // Simulate async filtering
          setTimeout(() => {
            const listbox = document.querySelector(`#${listboxId}`) as HTMLPostListboxElement;
            if (listbox) {
              // Custom filtering logic - filter by value OR label
              const options = listbox.querySelectorAll('post-option');
              options.forEach((option: HTMLPostOptionElement) => {
                const value = option.getAttribute('value')?.toLowerCase() || '';
                const label = option.textContent?.toLowerCase() || '';
                const matches = value.includes(query) || label.includes(query);
                option.hidden = !matches;
              });
            }
          }, 100);
        }}"
      >
        <label for="${inputId}" class="form-label">${args.label}</label>
        <input
          id="${inputId}"
          class="form-control"
          type="text"
          placeholder="${args.placeholder || nothing}"
        />
        <post-listbox id="${listboxId}">
          ${COUNTRY_OPTIONS.map(
            option => html`
              <post-option value="${option.value}">${option.label}</post-option>
            `,
          )}
        </post-listbox>
      </post-autocomplete>
      <p class="mt-3 text-muted">
        <small>This example shows custom filtering that matches both value and label.</small>
      </p>
    `;
  },
};

export const InFloatingLabel: Story = {
  args: {
    label: 'Country',
    placeholder: ' ', // Required for floating label to work
  },
  render: (args: Args, context: StoryContext) => {
    const autocompleteId = `autocomplete-${context.id}`;
    const inputId = `input-${context.id}`;
    const listboxId = `listbox-${context.id}`;

    return html`
      <div class="form-floating">
        <post-autocomplete
          id="${autocompleteId}"
          filter-threshold="${args.filterThreshold}"
          ?clearable="${args.clearable}"
          ?disabled="${args.disabled}"
          no-results-text="${args.noResultsText}"
        >
          <input
            id="${inputId}"
            class="form-control"
            type="text"
            placeholder="${args.placeholder}"
          />
          <label for="${inputId}">${args.label}</label>
          <post-listbox id="${listboxId}">
            ${COUNTRY_OPTIONS.map(
              option => html`
                <post-option value="${option.value}">${option.label}</post-option>
              `,
            )}
          </post-listbox>
        </post-autocomplete>
      </div>
    `;
  },
};

export const WithHintText: Story = {
  args: {
    label: 'Country',
    placeholder: 'Search for a country...',
  },
  render: (args: Args, context: StoryContext) => {
    const autocompleteId = `autocomplete-${context.id}`;
    const inputId = `input-${context.id}`;
    const listboxId = `listbox-${context.id}`;
    const hintId = `hint-${context.id}`;

    return html`
      <post-autocomplete
        id="${autocompleteId}"
        filter-threshold="${args.filterThreshold}"
        ?clearable="${args.clearable}"
        no-results-text="${args.noResultsText}"
      >
        <label for="${inputId}" class="form-label">${args.label}</label>
        <input
          id="${inputId}"
          class="form-control"
          type="text"
          placeholder="${args.placeholder || nothing}"
          aria-describedby="${hintId}"
        />
        <post-listbox id="${listboxId}">
          ${COUNTRY_OPTIONS.map(
            option => html`
              <post-option value="${option.value}">${option.label}</post-option>
            `,
          )}
        </post-listbox>
      </post-autocomplete>
      <div id="${hintId}" class="form-text">Select your country of residence.</div>
    `;
  },
};

export const MultipleAutocompletes: Story = {
  args: {
    placeholder: 'Type to search...',
  },
  render: (args: Args, context: StoryContext) => html`
    <div class="row g-3">
      <div class="col-md-6">
        <post-autocomplete
          id="from-country"
          filter-threshold="${args.filterThreshold}"
          ?clearable="${args.clearable}"
          no-results-text="${args.noResultsText}"
        >
          <label for="from-input" class="form-label">From Country</label>
          <input
            id="from-input"
            class="form-control"
            type="text"
            placeholder="${args.placeholder || nothing}"
          />
          <post-listbox id="from-listbox">
            ${COUNTRY_OPTIONS.map(
              option => html`
                <post-option value="${option.value}">${option.label}</post-option>
              `,
            )}
          </post-listbox>
        </post-autocomplete>
      </div>
      <div class="col-md-6">
        <post-autocomplete
          id="to-country"
          filter-threshold="${args.filterThreshold}"
          ?clearable="${args.clearable}"
          no-results-text="${args.noResultsText}"
        >
          <label for="to-input" class="form-label">To Country</label>
          <input
            id="to-input"
            class="form-control"
            type="text"
            placeholder="${args.placeholder || nothing}"
          />
          <post-listbox id="to-listbox">
            ${COUNTRY_OPTIONS.map(
              option => html`
                <post-option value="${option.value}">${option.label}</post-option>
              `,
            )}
          </post-listbox>
        </post-autocomplete>
      </div>
    </div>
  `,
};
