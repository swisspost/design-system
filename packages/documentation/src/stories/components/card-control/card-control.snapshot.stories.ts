import { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';
import meta from './card-control.stories';

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
  customIconSvg: [
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" viewBox="-31.5 0 319 319"><defs><path id="a" d="M9.872 293.324.012 30.574C-.315 21.895 6.338 14.54 15.005 14L238.494.032c8.822-.552 16.42 6.153 16.972 14.975.02.332.031.665.031.998v286.314c0 8.839-7.165 16.004-16.004 16.004-.24 0-.48-.005-.718-.016l-213.627-9.595c-8.32-.373-14.963-7.065-15.276-15.388Z"/></defs><mask id="b" fill="#fff"><use xlink:href="#a"/></mask><use xlink:href="#a" fill="#FF4785"/><path fill="#fff" d="m188.665 39.127 1.527-36.716L220.884 0l1.322 37.863a2.387 2.387 0 0 1-3.864 1.96l-11.835-9.325-14.013 10.63a2.387 2.387 0 0 1-3.829-2.001Zm-39.251 80.853c0 6.227 41.942 3.243 47.572-1.131 0-42.402-22.752-64.684-64.415-64.684-41.662 0-65.005 22.628-65.005 56.57 0 59.117 79.78 60.249 79.78 92.494 0 9.052-4.433 14.426-14.184 14.426-12.705 0-17.729-6.49-17.138-28.552 0-4.786-48.458-6.278-49.936 0-3.762 53.466 29.548 68.887 67.665 68.887 36.935 0 65.892-19.687 65.892-55.326 0-63.36-80.961-61.663-80.961-93.06 0-12.728 9.455-14.425 15.07-14.425 5.909 0 16.546 1.042 15.66 24.801Z" mask="url(#b)"/></svg>',
  ],
  customIconImg: ['<img src="https://picsum.photos/id/433/100/80" alt="My Custom Icon Image"/>'],
}).filter(args => !(args.icon === 'component' && args.customIcon !== null));

export const CardControl: StoryObj = {
  render: (_args: Args, context: StoryContext) => {
    return html`
      <div class="row row-cols-2 g-0">
        ${schemes(
          () => html`
            ${PALETTE_TEST_COMPONENT_TYPES.map(
              type =>
                html`<div class="px-8">
                  <p>Type: ${type}</p>
                  ${bombedArgs.map(
                    args =>
                      html`<fieldset class="mx-0">
                        ${meta.render?.({ ...args, type }, context)}
                      </fieldset>`,
                  )}

                  <hr class="mt-32">

                  ${PALETTE_TEST_PALETTE_TYPES.map(
                    palette =>
                      html`<div class="palette palette-${palette} p-32">
                        <fieldset class="mx-0">
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
        ${meta.render?.({ ...baseArgs, label: 'Invalid', validation: 'is-invalid' }, context)}
        ${meta.render?.(
          { ...baseArgs, label: 'Invalid, Checked', validation: 'is-invalid', checked: true },
          context,
        )}
        ${meta.render?.(
          {
            ...baseArgs,
            label: 'Invalid, Checked, Disabled',
            validation: 'is-invalid',
            checked: true,
            disabled: true,
          },
          context,
        )}
      `;
    }
  },
};
