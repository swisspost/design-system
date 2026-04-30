/**
 * To add a new component, append an entry to COMPONENTS:
 *
 * - id: the Storybook story UUID (from the iframe URL: e.g. /iframe.html?id=<UUID>--default)
 * - stories: story variants to extract, e.g. ['default'] or ['default', 'with-icon']
 * - tags: component tag(s) to capture. Use a plain string for simple cases,
 *         or { tag, options: { title?, noTitle? } } when the key needs a custom title or no title at all (case of subcomponents).
 */
type TagEntry = string | { tag: string; options?: { title?: string; noTitle?: boolean } };

const COMPONENTS: Array<{ id: string; stories: string[]; tags: TagEntry[] }> = [
  {
    id: '4d1b4185-e04d-494a-ab38-2b56c1778b0b',
    stories: ['default', 'logos', 'multiple-open-panels', 'default-collapsed-panels', 'nested'],
    tags: ['post-accordion'],
  },
  {
    id: '5ef3cb45-86f6-4baf-bdbf-35bd2ddf0f3d',
    stories: ['default', 'clearable', 'detached-listbox', 'filter-threshold', 'option-description'],
    tags: ['post-autocomplete'],
  },
  {
    id: '09aac03d-220e-4885-8fb8-1cfa01add188',
    stories: ['default', 'anchor-wrapped', 'button-wrapped'],
    tags: ['post-avatar'],
  },
  {
    id: '1a1b4cab-d0a8-4b01-bd85-b70e18668cb5',
    stories: ['default'],
    tags: [{ tag: 'post-back-to-top', options: { noTitle: true } }],
  },
  {
    id: '105e67d8-31e9-4d0b-87ff-685aba31fd4c',
    stories: ['default', 'contents', 'dismissible'],
    tags: ['post-banner'],
  },
  {
    id: 'b7db7391-f893-4b1e-a125-b30c6f0b028b',
    stories: ['default', 'concatenated'],
    tags: ['post-breadcrumbs'],
  },
  {
    id: 'de313349-0c0b-4baf-adc6-cb8c2e36fc1a',
    stories: ['default', 'automatic-positioning'],
    tags: ['post-closebutton'],
  },
  {
    id: '6a91848c-16ec-4a23-bc45-51c797b5b2c3',
    stories: ['default', 'initially-collapsed'],
    tags: [
      { tag: 'post-collapsible-trigger', options: { title: 'Collapsible' } },
      { tag: 'post-collapsible', options: { noTitle: true } },
    ],
  },
  {
    id: 'eb77cd02-48b2-42e1-a3e4-cd8a973d431e',
    stories: ['default', 'inline', 'inline-range', 'range', 'disabled-dates'],
    tags: ['post-date-picker'],
  },
  { id: 'd97528b3-a9ef-4201-bf28-9caf6e8997dc', stories: ['default'], tags: ['post-footer'] },
  {
    id: '27a2e64d-55ba-492d-ab79-5f7c5e818498',
    stories: [
      'default',
      'active-navigation-item',
      'portal',
      'jobs',
      'microsite',
      'one-pager',
      'one-pager-h-1',
      'logged-in',
      'logged-out',
    ],
    tags: ['post-header'],
  },
  {
    id: '0dcfe3c0-bfc0-4107-b43b-7e9d825b805f',
    stories: ['default', 'ui', 'color', 'size', 'flip', 'scale', 'rotate', 'animate'],
    tags: ['post-icon'],
  },
  { id: '1d52b794-768b-464e-90eb-4fd15774aa90', stories: ['default'], tags: ['post-linkarea'] },
  {
    id: '8ca2bd70-56e6-4da9-b1fd-4e55388dca88',
    stories: ['default', 'right', 'icon-trigger', 'mixed-content', 'with-icons'],
    tags: [
      { tag: 'post-menu-trigger', options: { title: 'Menu' } },
      { tag: 'post-menu', options: { noTitle: true } },
    ],
  },
  {
    id: 'd5f43fa8-42ba-4cb9-98c7-9386d4c939bb',
    stories: ['default', 'floating-label', 'small'],
    tags: ['post-number-input'],
  },
  {
    id: 'd6f8b5c7-4e2a-4f3a-9d3a-1a2b3c4d5e6f',
    stories: ['default', 'many-pages', 'page-out-of-range'],
    tags: ['post-pagination'],
  },
  {
    id: '9a636763-de2d-4f72-bc81-98daf10871f7',
    stories: ['default', 'wrapped', 'info-icon'],
    tags: [
      { tag: 'post-popover-trigger', options: { title: 'Popover' } },
      { tag: 'post-popover', options: { noTitle: true } },
    ],
  },
  {
    id: '956e063b-b40c-4fe4-bc27-53b8c4ab1e81',
    stories: ['default', 'readonly'],
    tags: ['post-rating'],
  },
  {
    id: '7dc546d9-e248-4d06-befe-3ad62fcd310f',
    stories: ['default', 'selected'],
    tags: ['post-stepper'],
  },
  {
    id: 'bb1291ca-4dbb-450c-a15f-596836d9f39e',
    stories: [
      'default',
      'panels-variant',
      'active-tab',
      'full-width',
      'navigation-full-width',
      'navigation-variant',
      'active-navigation-item',
    ],
    tags: ['post-tabs'],
  },
  {
    id: '1a6f47c2-5e8a-45a0-b1c3-9f7e2b834c24',
    stories: ['default', 'initially-toggled', 'content-visibility'],
    tags: ['post-togglebutton'],
  },
  {
    id: 'cd684d90-e7a7-41a9-8923-b1b72ad9b384',
    stories: ['default', 'non-focusable', 'multiple'],
    tags: [
      { tag: 'post-tooltip-trigger', options: { title: 'Tooltip' } },
      { tag: 'post-tooltip', options: { noTitle: true } },
    ],
  },
];

describe('Extract markup', () => {
  COMPONENTS.forEach(({ id, stories, tags }) => {
    const name = typeof tags[0] === 'string' ? tags[0] : tags[0].tag;

    stories.forEach(story => {
      it(`should extract markup for ${name} (${story})`, () => {
        cy.visit(`/iframe.html?id=${id}--${story}`);

        tags.forEach(entry => {
          const tag = typeof entry === 'string' ? entry : entry.tag;
          const options = typeof entry === 'string' ? undefined : entry.options;

          cy.get(tag)
            .invoke('prop', 'outerHTML')
            .then(html => cy.writeMarkup(tag, html, options, story));
        });
      });
    });
  });
});
