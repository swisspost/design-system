import type { StoryObj } from '@storybook/web-components';
import meta from './card.stories';
import { html } from 'lit';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const CardWebComponent: Story = {
  render: () => {
    // Define basic content template variants
    const cardVariants = [
      // Layout related combinations
      ...bombArgs({
        imgSrc: ['https://picsum.photos/id/20/300/200', null],
        imgPosition: ['top', 'bottom'],
        showHeader: [false, true],
        showBody: [false, true],
        showFooter: [false, true],
        interactiveContent: ['button', 'links'],
      }),
    ]
      // Has to show anything
      .filter(args => args.showHeader || args.showBody || args.showFooter || args.showImage)
      // No single footer
      .filter(args => !(args.showFooter && !args.showBody && !args.showHeader))
      // No single header
      .filter(args => !(args.showHeader && !args.showBody && !args.showFooter))
      // No header and footer without content in between
      .filter(args => !(args.showHeader && args.showFooter && args.showBody === false))
      // Ignore header position if showHeader is false
      .filter(args => !(!args.imgSrc && args.imgPosition === 'bottom'))
      // Ignore header position if only img is shown
      .filter(
        args =>
          !(
            args.showImage &&
            !args.showBody &&
            !args.showHeader &&
            !args.showFooter &&
            args.imagePosition === 'bottom'
          ),
      )
      // Map default template variants
      .map(args => {
        const cardBody = html`
          <h5 class="card-title">Title</h5>
          <h6 class="card-subtitle mb-8 text-muted">Subtitle</h6>
          <p class="card-text">This is my text</p>
          ${args.interactiveContent === 'button'
            ? html`<button class="btn btn-tertiary px-0">
                Button label <post-icon name="arrowright"></post-icon>
              </button>`
            : ''}
          ${args.interactiveContent === 'links'
            ? html`<a class="card-link" href="#">Link one</a
                ><a class="card-link" href="#">Link two</a>`
            : ''}
        `;
        return html`
          <div class="col-4 pb-16">
            <post-card img-src="${args.imgSrc}" img-position="${args.imgPosition}">
              ${args.showHeader ? html`<div slot="header">Card header</div>` : ''}
              ${args.showBody ? cardBody : ''}
              ${args.showFooter ? html`<div slot="footer">Card footer</div>` : ''}
            </post-card>
          </div>
        `;
      });

    const cardProductVariants = [
      // Layout related combinations
      ...bombArgs({
        interactiveContent: ['button', 'link'],
        size: ['small', 'medium', 'large'],
      }),
    ]
      // Map default template variants
      .map(
        args => html`
          <div class="col-4 pb-16">
            <post-card variant="card-product">
              <post-card-section palette="default">
                <div class="product-navigation">
                  <div>
                    <h3>Affordable</h3>
                    <h4 class="mb-16">Sample Product</h4>
                    <p class="lead">
                      With SAMPLE PRODUCT, your letters arrive at their destination cost-effectively
                      and reliably.
                    </p>
                  </div>
                  <div>
                    ${args.interactiveContent === 'link'
                      ? html` <a href="#" class="link-icon">
                          <post-icon name="3020" aria-hidden="true"></post-icon>
                          <span>Learn more</span>
                        </a>`
                      : ''}
                  </div>
                </div>
              </post-card-section>
              ${args.size === 'medium' || args.size === 'large'
                ? html`
                    <post-card-section palette="alternate">
                      <h5 class="h6">Sample Product</h5>
                      <p>140 x 90 mm bis B5 (250 x 176 mm)</p>
                      <dl class="mt-16">
                        <dt>bis 500 g</dt>
                        <dd class="h3">1.20</dd>

                        <dt>bis 50 g</dt>
                        <dd class="h3">2.20</dd>
                      </dl>
                    </post-card-section>
                  `
                : ''}
              ${args.size === 'large'
                ? html`
                    <post-card-section>
                      <button class="btn btn-secondary w-full mb-12">
                        <span>Order Sample Product</span>
                      </button>

                      <button class="btn btn-primary w-full">
                        <span>Print Sample Product</span>
                      </button>
                    </post-card-section>
                  `
                : ''}
            </post-card>
          </div>
        `,
      );

    const cardTeaserVariants = [
      // Layout related combinations
      ...bombArgs({
        interactiveContent: ['button', 'link'],
      }),
    ]
      // Map default template variants
      .map(
        args => html`
          <div class="col-4 pb-16">
            <post-card variant="card-teaser" img-src="https://picsum.photos/id/20/300/200">
              <h3 class="mb-16">Product</h3>
              <p class="lead">This is the product summary.</p>

              ${args.interactiveContent === 'button'
                ? html`<button class="btn btn-tertiary px-0">
                    Button label <post-icon name="arrowright"></post-icon>
                  </button>`
                : ''}
              ${args.interactiveContent === 'link'
                ? html`<a class="card-link" href="#">Link one</a>`
                : ''}
            </post-card>
          </div>
        `,
      );

    const palettes = ['palette-alternate', 'palette-default'];

    return html`
      <h1>Card web component POC</h1>
      <h2>Card product</h2>
      <div class="container">
        <div class="row">${cardProductVariants}</div>
      </div>
      <h2>Card</h2>
      ${palettes.map(
        palette => html`
          <div class="${palette}">
            <div class="container">
              <div class="row">${cardVariants}</div>
            </div>
          </div>
        `,
      )}
      <h2>Card teaser</h2>
      ${palettes.map(
        palette => html`
          <div class="${palette}">
            <div class="container">
              <div class="row">${cardTeaserVariants}</div>
            </div>
          </div>
        `,
      )}
    `;
  },
};
