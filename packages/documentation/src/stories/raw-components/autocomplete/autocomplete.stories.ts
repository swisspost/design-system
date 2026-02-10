import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  id: '83bde258-8752-4622-8124-aaec6d37b28e',
  title: 'Raw Components/Autocomplete',
  tags: ['package:WebComponents', 'status:Experimental', 'devOnly'],
  component: 'post-autocomplete-dropdown',
  render,
};

export default meta;

function render() {
  return html`
    <post-autocomplete-trigger for="filter-as-trigger-dd">
      <post-autocomplete-filter class="form-floating">
        <input type="text" id="filter-as-trigger" class="form-control" />
        <label for="filter-as-trigger" class="form-label">Autocomplete</label>
      </post-autocomplete-filter>
    </post-autocomplete-trigger>

    <post-autocomplete-dropdown id="filter-as-trigger-dd">
      <ul class="list-unstyled">
        <li>Option A</li>
        <li>Option B</li>
        <li>Option C</li>
        <li>Option D</li>
        <li>Option E</li>
      </ul>
    </post-autocomplete-dropdown>

    <hr />

    <post-autocomplete-trigger for="button-as-trigger-dd">
      <button class="btn btn-secondary">
        Autocomplete
        <post-icon aria-hidden="true" name="chevrondown"></post-icon>
      </button>
    </post-autocomplete-trigger>

    <post-autocomplete-dropdown id="button-as-trigger-dd">
      <post-autocomplete-filter slot="filter" class="position-relative">
        <input class="form-control" type="search" aria-label="autocomplete" />
        <span aria-hidden="true" class="position-absolute end-0 top-50 translate-middle-y p-12">
          <post-icon name="search"></post-icon>
        </span>
      </post-autocomplete-filter>
      <ul class="list-unstyled">
        <li>Option A</li>
        <li>Option B</li>
        <li>Option C</li>
        <li>Option D</li>
        <li>Option E</li>
      </ul>
    </post-autocomplete-dropdown>
  `;
}

// STORIES
type Story = StoryObj;

export const Default: Story = {};
