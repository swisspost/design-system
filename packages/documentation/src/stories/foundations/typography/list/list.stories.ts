import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: 'e76192bb-b2eb-487a-b9c1-ef938bccdfc4',
  title: 'Foundations/Typography/Lists',
  parameters: {
    badges: [],
  },
};

export default meta;

type Story = StoryObj;

export const UnorderedList: Story = {
  render: () => html`
    <ul class="list-bullet">
      <li>This is an unordered list.</li>
      <li>It appears in its default style.</li>
      <li>Therefore it is rendered with a bullet point in front of each list item.</li>
      <li>
        Nested list:
        <ul class="list-bullet">
          <li>This is a nested list</li>
          <li>It is further indented, depending on the depth of nesting.</li>
        </ul>
      </li>
      <li>This item belongs to the parent list.</li>
    </ul>
  `,
};

export const InlineList: Story = {
  render: () => html`
    <ul class="list-inline">
      <li>This is an inline list item.</li>
      <li>And another one.</li>
      <li>And one more.</li>
    </ul>
  `,
};

export const UnstyledList: Story = {
  render: () => html`
    <ul class="list-unstyled">
      <li>This is an unstyled list.</li>
      <li>It appears completely unstyled.</li>
      <li>Structurally, it's still a list.</li>
      <li>
        Nested list:
        <ul class="list-bullet">
          <li>They are unaffected by the style of its parent.</li>
          <li>So they will still show a bullet.</li>
          <li>And have an appropriate left indent.</li>
        </ul>
      </li>
      <li>This item belongs to the parent list.</li>
    </ul>
  `,
};

export const OrderedList: Story = {
  render: () => html`
    <ol>
      <li>This is an ordered list.</li>
      <li>It appears in its default style.</li>
      <li>
        Therefore it should be rendered with sequential numbers at the beginning of each list item.
      </li>
      <li>
        Nested list:
        <ol>
          <li>This is a nested list</li>
          <li>It is further indented, depending on the depth of nesting.</li>
          <li>Nested lists numbers are independent form the numbers of their parents.</li>
        </ol>
      </li>
      <li>This item belongs to the parent list.</li>
      <li>This item belongs to the parent list.</li>
      <li>This item belongs to the parent list.</li>
      <li>This item belongs to the parent list.</li>
      <li>This item belongs to the parent list.</li>
      <li>This item belongs to the parent list.</li>
      <li>This item belongs to the parent list.</li>
      <li>This item belongs to the parent list.</li>
    </ol>
  `,
};

export const DescriptionList: Story = {
  render: () => html`
    <dl>
      <dt>This is a description list.</dt>
      <dd>It appears in its default style.</dd>
      <dt>Group title</dt>
      <dd>A description list is perfect for defining terms.</dd>
      <dt>Term</dt>
      <dd>Definition for the term.</dd>
    </dl>
  `,
};

export const DescriptionListUsingGrid: Story = {
  render: () => html`
    <dl class="row">
      <dt class="col-sm-3">Term</dt>
      <dd class="col-sm-9">Definition for the term.</dd>
      <dt class="col-sm-3">Another term</dt>
      <dd class="col-sm-9">
        <p>This definition is long.</p>
        <p>You can use extra markup whenever you need.</p>
      </dd>
      <dt class="col-sm-3 text-truncate">
        Long term that overflows its parent column and is therefore truncated
      </dt>
      <dd class="col-sm-9">This can be useful when space is tight. Adds an ellipsis at the end.</dd>
      <dt class="col-sm-3">Nesting</dt>
      <dd class="col-sm-9">
        <dl class="row">
          <dt class="col-sm-4">Nested definition list</dt>
          <dd class="col-sm-8">
            I heard you like definition lists. Let me put a definition list inside your definition
            list.
          </dd>
        </dl>
      </dd>
    </dl>
  `,
};
