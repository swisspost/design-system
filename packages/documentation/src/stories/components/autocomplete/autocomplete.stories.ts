import { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';

const SAMPLE_COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia',
  'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados',
  'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina',
  'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia',
  'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia',
  'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti',
  'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Estonia', 'Ethiopia',
  'Finland', 'France', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Guatemala', 'Haiti',
  'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland',
  'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait',
  'Latvia', 'Lebanon', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malaysia',
  'Malta', 'Mexico', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Nepal', 'Netherlands',
  'New Zealand', 'Nicaragua', 'Nigeria', 'North Macedonia', 'Norway', 'Oman', 'Pakistan',
  'Panama', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania',
  'Russia', 'Saudi Arabia', 'Serbia', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa',
  'South Korea', 'Spain', 'Sri Lanka', 'Sweden', 'Switzerland', 'Taiwan', 'Thailand',
  'Tunisia', 'Turkey', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States',
  'Uruguay', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
];

const meta: MetaComponent = {
  id: 'f8e3a1b2-4c5d-6e7f-8a9b-0c1d2e3f4a5b',
  title: 'Components/Autocomplete',
  tags: ['package:WebComponents', 'status:Experimental'],
  component: 'post-autocomplete',
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=17916-30978&m=dev',
    },
  },
  render: renderAutocomplete,
  args: {
    label: 'Search countries',
    placeholder: 'Type to search...',
    minChars: 1,
    autoHighlight: true,
    placement: 'bottom-start',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Accessible label for the autocomplete',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    minChars: {
      control: { type: 'number', min: 0, max: 5 },
      description: 'Minimum characters before showing suggestions',
    },
    autoHighlight: {
      control: 'boolean',
      description: 'Automatically highlight the first matching option',
    },
    placement: {
      control: 'select',
      options: ['bottom-start', 'bottom', 'bottom-end', 'top-start', 'top', 'top-end'],
      description: 'Dropdown placement relative to the input',
    },
  },
};

function renderAutocomplete(args: Args, context: StoryContext) {
  return html`
    <div style="min-height: 400px; padding-top: 50px;">
      <label for="country-input" class="form-label">Country</label>
      <post-autocomplete
        label="${args.label || nothing}"
        min-chars="${args.minChars}"
        ?auto-highlight="${args.autoHighlight}"
        placement="${args.placement || nothing}"
      >
        <input
          id="country-input"
          type="text"
          class="form-control"
          placeholder="${args.placeholder || nothing}"
          autocomplete="off"
        />
        <div slot="options">
          ${SAMPLE_COUNTRIES.map(
            country => html`
              <post-option value="${country}">${country}</post-option>
            `
          )}
        </div>
      </post-autocomplete>
    </div>
  `;
}

export default meta;

export const Default: StoryObj = {};

export const WithMinChars: StoryObj = {
  args: {
    minChars: 3,
    placeholder: 'Type at least 3 characters...',
  },
};

export const NoAutoHighlight: StoryObj = {
  args: {
    autoHighlight: false,
  },
};

export const WithFormGroup: StoryObj = {
  render: (args: Args) => html`
    <div style="min-height: 400px; padding-top: 50px;">
      <div class="form-floating">
        <post-autocomplete
          label="${args.label || nothing}"
          min-chars="${args.minChars}"
          ?auto-highlight="${args.autoHighlight}"
        >
          <input
            id="country-floating"
            type="text"
            class="form-control"
            placeholder="${args.placeholder || nothing}"
            autocomplete="off"
          />
          <div slot="options">
            ${SAMPLE_COUNTRIES.slice(0, 20).map(
              country => html`
                <post-option value="${country}">${country}</post-option>
              `
            )}
          </div>
        </post-autocomplete>
        <label for="country-floating">Select a country</label>
      </div>
    </div>
  `,
};

export const WithIcons: StoryObj = {
  render: (args: Args) => html`
    <div style="min-height: 400px; padding-top: 50px;">
      <label for="city-input" class="form-label">City</label>
      <post-autocomplete label="Search cities" min-chars="1">
        <input
          id="city-input"
          type="text"
          class="form-control"
          placeholder="Search for a city..."
          autocomplete="off"
        />
        <div slot="options">
          <post-option value="zurich">
            <post-icon aria-hidden="true" name="location"></post-icon>
            Zürich
          </post-option>
          <post-option value="bern">
            <post-icon aria-hidden="true" name="location"></post-icon>
            Bern
          </post-option>
          <post-option value="geneva">
            <post-icon aria-hidden="true" name="location"></post-icon>
            Geneva
          </post-option>
          <post-option value="basel">
            <post-icon aria-hidden="true" name="location"></post-icon>
            Basel
          </post-option>
          <post-option value="lausanne">
            <post-icon aria-hidden="true" name="location"></post-icon>
            Lausanne
          </post-option>
        </div>
      </post-autocomplete>
    </div>
  `,
};

export const WithDisabledOptions: StoryObj = {
  render: (args: Args) => html`
    <div style="min-height: 400px; padding-top: 50px;">
      <label for="product-input" class="form-label">Product</label>
      <post-autocomplete label="Search products" min-chars="0">
        <input
          id="product-input"
          type="text"
          class="form-control"
          placeholder="Search for a product..."
          autocomplete="off"
        />
        <div slot="options">
          <post-option value="laptop">Laptop</post-option>
          <post-option value="phone" disabled>Phone (Out of stock)</post-option>
          <post-option value="tablet">Tablet</post-option>
          <post-option value="monitor" disabled>Monitor (Coming soon)</post-option>
          <post-option value="keyboard">Keyboard</post-option>
        </div>
      </post-autocomplete>
    </div>
  `,
};
