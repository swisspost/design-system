import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html, unsafeStatic } from 'lit/static-html.js';
import { nothing } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'b4800d9e-4837-4476-a327-bb4586eb7e97',
  title: 'Components/Card Product',
  tags: ['package:HTML'],
  decorators: [paddedContainer, clickBlocker],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=21512-19101&mode=design&t=3lniLiZhl7q9Gqgn-4',
    },
  },
  args: {
    title: 'Product',
    level: 'h3',
    text: 'This is a short description of the product.',
  },
  argTypes: {
    title: {
      name: 'Title',
      description: 'Defines the text in the heading tag.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
    level: {
      name: 'Heading Level',
      description:
        'Defines the hierarchical level of the product card title within the heading structure.',
      control: {
        type: 'select',
      },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      table: {
        category: 'General',
      },
    },
    text: {
      name: 'Text',
      description: 'Defines the text displayed under the heading tag.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
  },
};

export default meta;

// DECORATORS
function clickBlocker(story: StoryFn, context: StoryContext) {
  return html`
    <div @click=${(e: Event) => e.preventDefault()}>${story(context.args, context)}</div>
  `;
}

function paddedContainer(story: StoryFn, context: StoryContext) {
  return html` <div class="p-8">${story(context.args, context)}</div> `;
}

function gridContainer(story: StoryFn, context: StoryContext) {
  return html`
    <div class="row row-cols-md-2 row-cols-xl-3 border-gutters">
      <div class="col-12">${story(context.args, context)}</div>
    </div>
  `;
}

// RENDERER
function getTitle(args: Args) {
  if (!args.title) return nothing;

  const headingTag = unsafeStatic(args.level);
  const headingClass = `mb-16${args.level === 'h3' ? '' : ' h3'}`;
  return html`<${headingTag} class="${headingClass}">${args.title}</${headingTag}>`;
}

function getText(args: Args) {
  if (!args.text) return nothing;

  return html` <p class="lead">${args.text}</p> `;
}
function renderProductCard(args: Args) {
  return html`
    <a href="#" class="card product-card${args.cardClasses}">
      <div class="card-body product-navigation">
        ${getTitle(args)} ${getText(args)}
        <span class="link-icon">
          <post-icon name="3020" aria-hidden="true"></post-icon>
          <span>Learn more</span>
        </span>
      </div>
    </a>
  `;
}

// STORIES
type Story = StoryObj;

export const Default: Story = {
  render: renderProductCard,
  decorators: [gridContainer],
};

export const Groupped: Story = {
  render: (args: Args) => html`
    <div class="row row-cols-md-2 row-cols-xl-3 border-gutters">
      <div class="col-12">
        ${renderProductCard({ ...args, title: `${args.title} 1`, text: 'Very short description.' })}
      </div>
      <div class="col-12">${renderProductCard({ ...args, title: `${args.title} 2` })}</div>
      <div class="col-12">
        ${renderProductCard({ ...args, title: `${args.title} 3`, text: '' })}
      </div>
      <div class="col-12">${renderProductCard({ ...args, title: `${args.title} 4` })}</div>
      <div class="col-12">
        ${renderProductCard({
          ...args,
          title: `${args.title} 5`,
          text: 'This is a longer description of the product to show how the cards are composed.',
        })}
      </div>
    </div>
  `,
  args: {
    cardClasses: ' h-full',
  },
};

export const Multipart: Story = {
  render: () => html`
    <div class="row row-cols-md-2 border-gutters">
      <div class="col-12">
        <div class="card product-card">
          <div class="card-body" data-sync-height-with="product-header">
            <div class="product-navigation">
              <div>
                <h3>Affordable</h3>
                <h4 class="mb-16">Sample Product</h4>
                <p class="lead">
                  With SAMPLE PRODUCT, your letters arrive at their destination cost-effectively and
                  reliably.
                </p>
              </div>
              <div>
                <a href="#" class="link-icon">
                  <post-icon name="3020" aria-hidden="true"></post-icon>
                  <span>Learn more</span>
                </a>
              </div>
            </div>
          </div>

          <div class="card-body palette palette-alternate" data-sync-height-with="product-body-1">
            <h5 class="h6">Sample Product</h5>
            <p>140 x 90 mm bis B5 (250 x 176 mm)</p>
            <dl class="mt-16">
              <dt>bis 500 g</dt>
              <dd class="h3">1.20</dd>

              <dt>bis 50 g</dt>
              <dd class="h3">2.20</dd>
            </dl>
          </div>

          <div class="card-body" data-sync-height-with="product-body-2">
            <h5 class="h6">Sample Product</h5>
            <p>140 x 90 mm bis B5 (250 x 176 mm)</p>
            <dl class="mt-16 align-items-stretch">
              <div class="horizontal-list-item justify-content-between d-flex flex-column">
                <dt>
                  so zwischen ca. 5g
                  <br />
                  bis ungefähr etwa 500 g
                </dt>
                <dd class="h3">1.20</dd>
              </div>
              <div class="horizontal-list-item justify-content-between d-flex flex-column">
                <dt>bis 50 g</dt>
                <dd class="h3">2.20</dd>
              </div>
              <div class="horizontal-list-item justify-content-between d-flex flex-column">
                <dt>bis 100 g</dt>
                <dd class="h3">2.90</dd>
              </div>
              <div class="horizontal-list-item justify-content-between d-flex flex-column">
                <dt>bis 100 g</dt>
                <dd class="h3">2.90</dd>
              </div>
              <div class="horizontal-list-item justify-content-between d-flex flex-column">
                <dt>bis 100 g</dt>
                <dd class="h3">2.90</dd>
              </div>
              <div class="horizontal-list-item justify-content-between d-flex flex-column">
                <dt>bis 100 g</dt>
                <dd class="h3">2.90</dd>
              </div>
            </dl>
          </div>

          <div class="card-body palette palette-alternate" data-sync-height-with="product-body-3">
            <h5 class="h6">Sample Product</h5>
            <p>140 x 90 mm bis B5 (250 x 176 mm)</p>
            <dl class="mt-16">
              <dt>bis 500 g</dt>
              <dd class="h3">1.20</dd>

              <dt>bis 50 g</dt>
              <dd class="h3">2.20</dd>

              <dt>bis 100 g</dt>
              <dd class="h3">2.90</dd>
            </dl>
          </div>

          <div class="card-body palette palette-alternate">
            <button class="btn btn-secondary w-full mb-12">
              <span>Order Sample Product</span>
            </button>

            <button class="btn btn-primary w-full">
              <span>Print Sample Product</span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-12">
        <div class="card product-card">
          <div class="card-body" data-sync-height-with="product-header">
            <div class="product-navigation">
              <div>
                <h3>Faster</h3>
                <h4 class="mb-16">Sample Product</h4>
                <p class="lead">
                  This is a sample description with more detailed information about the product
                  features and benefits. It demonstrates the layout and structure of the product
                  card component.
                </p>
              </div>
              <div>
                <a href="#" class="link-icon">
                  <post-icon name="3020" aria-hidden="true"></post-icon>
                  <span>Learn more</span>
                </a>
              </div>
            </div>
          </div>

          <div class="card-body palette palette-alternate" data-sync-height-with="product-body-1">
            <h5 class="h6">Sample Product</h5>
            <p>140 x 90 mm bis B5 (250 x 176 mm)</p>
            <dl class="mt-16">
              <dt>bis 500 g</dt>
              <dd class="h3">1.20</dd>

              <dt>bis 50 g</dt>
              <dd class="h3">2.20</dd>

              <dt>bis 100 g</dt>
              <dd class="h3">2.90</dd>
            </dl>
          </div>

          <div class="card-body" data-sync-height-with="product-body-2">
            <h5 class="h6">Sample Product</h5>
            <p>140 x 90 mm bis B5 (250 x 176 mm)</p>
            <dl class="mt-16 align-items-stretch">
              <div class="horizontal-list-item justify-content-between d-flex flex-column">
                <dt>
                  so zwischen ca. 5g
                  <br />
                  bis ungefähr etwa 500 g
                </dt>
                <dd class="h3">1.20</dd>
              </div>
              <div class="horizontal-list-item justify-content-between d-flex flex-column">
                <dt>bis 50 g</dt>
                <dd class="h3">2.20</dd>
              </div>
              <div class="horizontal-list-item justify-content-between d-flex flex-column">
                <dt>bis 100 g</dt>
                <dd class="h3">2.90</dd>
              </div>
            </dl>
          </div>

          <div class="card-body palette palette-alternate" data-sync-height-with="product-body-3">
            <h5 class="h6">Sample Product</h5>
            <p>140 x 90 mm bis B5 (250 x 176 mm)</p>
            <dl class="mt-16">
              <dt>bis 500 g</dt>
              <dd class="h3">1.20</dd>

              <dt>bis 50 g</dt>
              <dd class="h3">2.20</dd>

              <dt>bis 100 g</dt>
              <dd class="h3">2.90</dd>
            </dl>
          </div>

          <div class="card-body palette palette-alternate">
            <button class="btn btn-secondary w-full mb-12">
              <span>Order Sample Product</span>
            </button>

            <button class="btn btn-primary w-full">
              <span>Print Sample Product</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  decorators: [
    (story: StoryFn, context: StoryContext) => {
      return html`
        ${story(context.args, context)}
        <script id="toto">
          let timer;

          function syncHeights() {
            const nodes = document.querySelectorAll('[data-sync-height-with]');

            const heightByGroup = new Map();
            nodes.forEach(node => {
              const group = node.getAttribute('data-sync-height-with');
              const groupHeight = heightByGroup.get(group);

              node.style.height = 'auto';
              const nodeHeight = node.offsetHeight;

              if (!groupHeight || nodeHeight > groupHeight) {
                heightByGroup.set(group, nodeHeight);
              }
            });

            heightByGroup.forEach((height, group) => {
              const groupNodes = document.querySelectorAll(
                '[data-sync-height-with="' + group + '"]',
              );

              groupNodes.forEach(node => {
                node.style.height = height + 'px';
              });
            });
          }

          window.addEventListener('resize', () => {
            console.log('resize');
            if (timer) clearTimeout(timer);

            timer = setTimeout(() => {
              syncHeights();
              console.log('syncHeights');
            }, 300);
          });

          syncHeights();
        </script>
      `;
    },
  ],
};
