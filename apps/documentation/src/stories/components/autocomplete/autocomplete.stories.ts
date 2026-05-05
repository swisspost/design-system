import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html, TemplateResult } from 'lit';
import { MetaComponent } from '@root/types';
import { spreadArgs } from '@/utils';

const meta: MetaComponent = {
  id: '5ef3cb45-86f6-4baf-bdbf-35bd2ddf0f3d',
  title: 'Raw Components/Form Autocomplete',
  component: 'post-autocomplete',
  tags: ['package:WebComponents'],
  render: createAutocompleteRenderer(),
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6gsh0EC0itp2amxwU5m5K1/Nebula---Design-System?node-id=1709-10940&p=f&m=dev',
    },
    controls: {
      exclude: ['listbox'],
    },
  },
  args: {
    clearable: false,
    filterThreshold: 0,
    textAvailableSuggestions: '{count} suggestions available',
  },
  argTypes: {
    clearable: {
      name: 'clearable',
      description: 'Show a clear button after an option has been selected.',
      control: 'boolean',
      table: {
        category: 'Props',
      },
    },
    filterThreshold: {
      name: 'filter-threshold',
      description: 'Number of typed characters required before filtering starts.',
      control: 'number',
      table: {
        category: 'Props',
      },
    },
    textAvailableSuggestions: {
      name: 'text-available-suggestions',
      description:
        'Localized announcement template read by screen readers when the suggestion list updates. Use {count} as a placeholder for the number of available suggestions, e.g. "{count} suggestions available" or "{count} Empfehlungen verfügbar".',
      control: 'text',
      table: {
        category: 'Props',
      },
    },
  },
};

export default meta;

function getListboxOptions() {
  return html`
    <div slot="blank-slate">Nothing to see here</div>
    <post-listbox-option value="Switzerland"></post-listbox-option>
    <post-listbox-option value="Germany"></post-listbox-option>
    <post-listbox-option value="France"></post-listbox-option>
    <post-listbox-option value="Italy"></post-listbox-option>
    <post-listbox-option value="Austria"></post-listbox-option>
    <post-listbox-option value="Spain"></post-listbox-option>
    <post-listbox-option value="Portugal"></post-listbox-option>
    <post-listbox-option value="Netherlands"></post-listbox-option>
    <post-listbox-option value="Belgium"></post-listbox-option>
    <post-listbox-option value="Sweden"></post-listbox-option>
  `;
}

function getListboxOptionsWithDescription() {
  return html`
    <div slot="blank-slate">Nothing to see here</div>
    <post-listbox-option value="Switzerland">Alpine Region</post-listbox-option>
    <post-listbox-option value="Germany">Central Europe</post-listbox-option>
    <post-listbox-option value="France">Western Europe</post-listbox-option>
    <post-listbox-option value="Italy">Southern Europe</post-listbox-option>
    <post-listbox-option value="Austria">Alpine Region</post-listbox-option>
    <post-listbox-option value="Spain">Iberian Peninsula</post-listbox-option>
    <post-listbox-option value="Portugal">Iberian Peninsula</post-listbox-option>
    <post-listbox-option value="Netherlands">Benelux</post-listbox-option>
    <post-listbox-option value="Belgium">Benelux</post-listbox-option>
    <post-listbox-option value="Sweden">Scandinavia</post-listbox-option>
  `;
}

function sanitizeStoryId(context: StoryContext) {
  return (context.id ?? context.name).replace(/[^a-z0-9-]/gi, '-').toLowerCase();
}

export function createAutocompleteRenderer({ detached = false }: { detached?: boolean } = {}): (
  args: Args,
  context: StoryContext,
) => TemplateResult {
  return (args: Args, context: StoryContext) => {
    const storyId = sanitizeStoryId(context);
    const inputId = `${storyId}-input`;
    const listboxId = `${storyId}-listbox`;
    const autocompleteArgs: Record<string, unknown> = {
      clearable: args.clearable,
      filterThreshold: args.filterThreshold,
      textAvailableSuggestions: args.textAvailableSuggestions,
    };

    if (detached) {
      autocompleteArgs.listbox = listboxId;
    }

    return html`
      <post-autocomplete ${spreadArgs(autocompleteArgs)}>
        <div class="form-floating">
          <input class="form-control" type="text" id="${inputId}" placeholder="Select Country" />
          <label class="form-label" for="${inputId}">Country</label>
        </div>
        ${detached ? null : html`<post-listbox>${getListboxOptions()}</post-listbox>`}
      </post-autocomplete>

      ${detached
        ? html`<post-listbox id="${listboxId}">${getListboxOptions()}</post-listbox>`
        : null}
    `;
  };
}

type Story = StoryObj;

export const Default: Story = {};

export const Clearable: Story = {
  args: {
    clearable: true,
  },
};

export const DetachedListbox: Story = {
  render: createAutocompleteRenderer({ detached: true }),
};

export const FilterThreshold: Story = {
  args: {
    filterThreshold: 3,
    placeholder: 'Type at least three letters',
  },
};

export const OptionDescription: Story = {
  render: (args: Args, context: StoryContext) => {
    const storyId = sanitizeStoryId(context);
    const inputId = `${storyId}-input`;

    return html`
      <post-autocomplete
        ${spreadArgs({
          clearable: args.clearable,
          filterThreshold: args.filterThreshold,
          textAvailableSuggestions: args.textAvailableSuggestions,
        })}
      >
        <div class="form-floating">
          <input class="form-control" type="text" id="${inputId}" placeholder="Select Country" />
          <label class="form-label" for="${inputId}">Country</label>
        </div>
        <post-listbox>${getListboxOptionsWithDescription()}</post-listbox>
      </post-autocomplete>
    `;
  },
};
