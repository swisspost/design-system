import { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';
import meta from './selection-card.stories';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

const PALETTE_TEST_COMPONENT_TYPES = ['radio', 'checkbox'];
const PALETTE_TEST_PALETTE_TYPES = ['default', 'alternate', 'accent', 'brand'];
const PALETTE_TEST_ARGS = {
  description: 'Description',
  icon: 'component',
};

const bombedArgs = bombArgs({
  customIcon: [null, 'svg', 'img'],
  icon: ['none', 'component'],
  customContent: [null, '<ul class="list-bullet"><li>List item 1</li><li>List item 2</li></ul>'],
  description: [null, 'Description with long running text, that wraps to a new line'],
  label: ['Label', 'Label with long running text'],
  customIconImg: ['<img src="https://picsum.photos/id/433/100/80" alt="My Custom Icon Image"/>'],
}).filter(args => !(args.icon === 'component' && args.customIcon !== null));

export const SelectionCard: StoryObj = {
  args: {
    // this prevents the components to update their checked argument when clicking on one of them,
    // which allows us to test the checked state of each component instance in isolation
    onChange: () => {},
  },
  render: (_args: Args, context: StoryContext) => {
    return html`
      <nav>
        <p>Scroll To links</p>
        <ul class="list-inline fs-10">
          ${PALETTE_TEST_COMPONENT_TYPES.map(
            type =>
              html`<li>
                  <a href="#${type}_light" @click=${(e: MouseEvent) => scrollToClickHandler(e)}
                    >${type}</a
                  >
                </li>
                ${PALETTE_TEST_PALETTE_TYPES.map(
                  palette =>
                    html`<li>
                      <a
                        href="#${type}_${palette}_light"
                        @click=${(e: MouseEvent) => scrollToClickHandler(e)}
                        >${type}@${palette}</a
                      >
                    </li>`,
                )}`,
          )}
        </ul>
      </nav>
      <hr class="my-32" />
      <div class="row row-cols-2 g-0">
        ${schemes(
          scheme => html`
            ${PALETTE_TEST_COMPONENT_TYPES.map(
              type =>
                html`<div class="px-8">
                  <p id="${type}_${scheme}" class="mt-32 fw-bold">Type: ${type}</p>
                  ${bombedArgs.map(
                    args =>
                      html`<div class="mx-0 my-8">
                        ${meta.render?.({ ...args, type }, context)}
                      </div>`,
                  )}

                  <hr class="mt-32">

                  ${PALETTE_TEST_PALETTE_TYPES.map(
                    palette =>
                      html`<div class="palette palette-${palette} p-32">
                        <fieldset id="${type}_${palette}_${scheme}" class="mx-0">
                          <legend style="text-transform: capitalize">Palette: ${palette}</legend>
                          ${renderComponent(type)}
                        </fieldset>
                      </div>`,
                  )}
                  </div>
                </div>`,
            )}
          `,
        )}
      </div>
    `;

    function renderComponent(type: string) {
      const baseArgs = { ..._args, ...PALETTE_TEST_ARGS, type };

      return html`
        ${meta.render?.({ ...baseArgs, label: 'Enabled' }, context)}
        ${meta.render?.({ ...baseArgs, label: 'Disabled', disabled: true }, context)}
        ${meta.render?.({ ...baseArgs, label: 'Checked', checked: true }, context)}
        ${meta.render?.(
          { ...baseArgs, label: 'Checked, Disabled', checked: true, disabled: true },
          context,
        )}
        ${meta.render?.({ ...baseArgs, label: 'Valid', validation: 'is-valid' }, context)}
        ${meta.render?.({ ...baseArgs, label: 'Invalid', validation: 'is-invalid' }, context)}
        ${meta.render?.(
          { ...baseArgs, label: 'Invalid, Checked', validation: 'is-invalid', checked: true },
          context,
        )}
      `;
    }
  },
};

function scrollToClickHandler(e: MouseEvent) {
  e.preventDefault();

  const id = ((e.target as HTMLAnchorElement).getAttribute('href') ?? '').replace('#', '');
  document.getElementById(id)?.scrollIntoView();
}
