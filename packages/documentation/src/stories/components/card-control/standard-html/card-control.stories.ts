import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { nothing } from 'lit';
import { html } from 'lit/static-html.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '047501dd-a185-4835-be91-09130fa3dad9',
  title: 'Components/Form Card Control',
  tags: ['package:Styles', 'status:InProgress'],
  render: renderCardControl,
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=22630-6854&mode=design&t=3lniLiZhl7q9Gqgn-4',
    },
  },
  args: {
    type: 'checkbox',
    label: 'Label',
    description: '',
    icon: 'none',
    checked: false,
    disabled: false,
    validation: 'null',
    groupValidation: false,
  },
  argTypes: {
    type: {
      name: 'Type',
      control: {
        type: 'radio',
        labels: {
          checkbox: 'Checkbox',
          radio: 'Radio',
        },
      },
      options: ['checkbox', 'radio'],
      table: {
        category: 'General',
      },
    },
    label: {
      name: 'Label',
      type: 'string',
      description: 'The main label of the input',
      table: {
        category: 'General',
      },
    },
    description: {
      name: 'Description',
      type: 'string',
      description: 'A short additional description',
      table: {
        category: 'General',
      },
    },
    icon: {
      name: 'Icon',
      control: {
        type: 'select',
      },
      options: ['none', 'component', 'letter', 'letteropen', 'parcel'],
      table: {
        category: 'General',
      },
    },
    checked: {
      name: 'Checked',
      type: 'boolean',
      description: 'When set to `true`, places the component in the checked state.',
      table: {
        category: 'States',
      },
    },
    disabled: {
      name: 'Disabled',
      description:
        'When set to `true`, disables the component\'s functionality and places it in a disabled state.<post-banner data-size="sm"><p>There are accessibility concerns with the disabled state.<br/>Please read our <a href="/?path=/docs/cb34361c-7d3f-4c21-bb9c-874c73e82578--docs">disabled elements guidelines</a>.</p></post-banner>',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'States',
      },
    },
    validation: {
      name: 'Validation',
      description:
        'Defines the validation state of the card control and controls the display of the corresponding return message.<post-banner data-size="sm"><p>Please read our <a href="/?path=/docs/1aa900d9-aa65-4ae0-b8cd-e6cca6cc3472--docs##card-control">validation guidelines here</a>.</p></post-banner> ',
      control: {
        type: 'radio',
        labels: {
          'null': 'Default',
          'is-invalid': 'Invalid',
        },
      },
      options: ['null', 'is-invalid'],
      table: {
        category: 'States',
      },
    },
    groupValidation: {
      name: 'GroupValidation',
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;

// DECORATORS

// RENDERER

let componentId = 1;

function renderCardControl(args: Args, context: StoryContext) {
  const id = `${context.name}_${args.type}_${componentId++}`;

  function customIcon(iconType: string) {
    const icon = iconType === 'svg' ? args.customIconSvg : args.customIconImg;
    return html`<span class="card-control--icon">${unsafeHTML(icon)}</span>`;
  }

  function icon(icon: string) {
    return icon && icon !== 'none'
      ? html`<post-icon class="card-control--icon" name="${icon}" aria-hidden="true"></post-icon>`
      : nothing;
  }

  function description(description: string) {
    return description
      ? html`<span class="card-control--description">${description}</span>`
      : nothing;
  }

  return html`<post-linkarea class="card-control">
    <input
      id=${id}
      type=${args.type}
      checked=${args.checked ? 'checked' : nothing}
      disabled=${args.disabled ? 'disabled' : nothing}
    />
    <label for=${id}>${args.label}</label>
    ${args.customIcon ? customIcon(args.customIcon) : icon(args.icon)}
    ${description(args.description)}
    <!-- custom content -->
  </post-linkarea>`;
}

// STORIES
type Story = StoryObj;

export const Default: Story = {};

export const CustomIcon: Story = {
  args: {
    customIcon: 'svg',
    customIconSvg:
      '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" viewBox="-31.5 0 319 319"><defs><path id="a" d="M9.872 293.324.012 30.574C-.315 21.895 6.338 14.54 15.005 14L238.494.032c8.822-.552 16.42 6.153 16.972 14.975.02.332.031.665.031.998v286.314c0 8.839-7.165 16.004-16.004 16.004-.24 0-.48-.005-.718-.016l-213.627-9.595c-8.32-.373-14.963-7.065-15.276-15.388Z"/></defs><mask id="b" fill="#fff"><use xlink:href="#a"/></mask><use xlink:href="#a" fill="#FF4785"/><path fill="#fff" d="m188.665 39.127 1.527-36.716L220.884 0l1.322 37.863a2.387 2.387 0 0 1-3.864 1.96l-11.835-9.325-14.013 10.63a2.387 2.387 0 0 1-3.829-2.001Zm-39.251 80.853c0 6.227 41.942 3.243 47.572-1.131 0-42.402-22.752-64.684-64.415-64.684-41.662 0-65.005 22.628-65.005 56.57 0 59.117 79.78 60.249 79.78 92.494 0 9.052-4.433 14.426-14.184 14.426-12.705 0-17.729-6.49-17.138-28.552 0-4.786-48.458-6.278-49.936 0-3.762 53.466 29.548 68.887 67.665 68.887 36.935 0 65.892-19.687 65.892-55.326 0-63.36-80.961-61.663-80.961-93.06 0-12.728 9.455-14.425 15.07-14.425 5.909 0 16.546 1.042 15.66 24.801Z" mask="url(#b)"/></svg>',
    customIconImg: '<img src="https://picsum.photos/id/38/100/50" alt="My Custom Icon Image"/>',
  },
  argTypes: {
    customIcon: {
      name: 'Custom Icon',
      control: {
        type: 'radio',
        labels: {
          svg: 'Vector Graphic',
          img: 'Pixel Image',
        },
      },
      options: ['svg', 'img'],
    },
  },
};

const COMPONENT_TYPES = ['radio', 'checkbox'];
const PALETTE_TYPES = ['default', 'alternate', 'accent', 'brand'];
const COLOR_SCHEMES = ['light', 'dark'];

export const Draft: Story = {
  args: {
    icon: 'component',
  },
  render: (args: Args, context: StoryContext) => {
    return html`
      <div class="row">
        <div class="col-2">
          <p class="text-right">Color Scheme</p>
          <p>Palette Type</p>
        </div>
        ${COLOR_SCHEMES.map(
          scheme =>
            html`<div class="col">
              <p class="text-center" style="text-transform: capitalize">${scheme}</p>
            </div>`,
        )}
      </div>

      ${COMPONENT_TYPES.map(
        type =>
          html`${PALETTE_TYPES.map(
            palette =>
              html`<div class="row g-0">
                <div class="col-2 align-self-center">
                  <p style="text-transform: capitalize">${palette}</p>
                </div>
                ${COLOR_SCHEMES.map(
                  scheme =>
                    html` <div class="col" data-color-scheme=${scheme}>
                      <fieldset class="m-0 palette palette-${palette} p-32">
                        ${Default.render?.({ ...args, type, label: 'Enabled, Hover' }, context)}
                        ${Default.render?.(
                          { ...args, type, label: 'Disabled', disabled: true },
                          context,
                        )}
                        ${Default.render?.(
                          { ...args, type, label: 'Checked', checked: true },
                          context,
                        )}
                        ${Default.render?.(
                          {
                            ...args,
                            type,
                            label: 'Checked, Disabled',
                            checked: true,
                            disabled: true,
                          },
                          context,
                        )}
                      </fieldset>
                    </div>`,
                )}
              </div>`,
          )}`,
      )}
    `;
  },
};

// let cardControlId = 0;
// const CONTROL_LABELS = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

// // Firefox fallback for the :has selector
// function inputHandler(e: InputEvent, updateArgs: (newArgs: Partial<Args>) => void) {
//   const target = e.target as HTMLInputElement;
//   updateArgs({ checked: target.checked });

//   // Fix input events not fired on "deselected" radio buttons
//   target
//     .closest('fieldset')
//     ?.querySelectorAll('.radio-button-card')
//     .forEach(e => e?.classList.remove('checked'));
//   target.parentElement?.classList.toggle('checked', target.checked);
// }

// export const Default = {
//   parameters: {
//     controls: {
//       exclude: ['Group Validation'],
//     },
//   },
//   render: (args: Args) => {
//     const [id] = useState(args.id ?? cardControlId++);
//     const [_, updateArgs] = useArgs();

//     // Conditional classes
//     const cardClasses = mapClasses({
//       'checked': args.checked,
//       'disabled': args.disabled,
//       'is-invalid': args.validation === 'is-invalid',
//       'checkbox-button-card': args.type === 'checkbox',
//       'radio-button-card': args.type === 'radio',
//     });
//     const validationClass = args.validation !== 'null' ? `${args.validation}` : undefined;

//     // Child components
//     const controlId = `CardControl_${id}`;
//     const description = html`<span class="fs-11">${args.description}</span>`;
//     const icon = html` <post-icon name="${args.icon}" aria-hidden="true"></post-icon> `;
//     const invalidFeedback = html`<p
//       class="invalid-feedback mt-8"
//       id="${args.validation}-id-${controlId}"
//     >
//       Invalid feedback
//     </p>`;

//     return html`
//       <div class="${cardClasses}">
//         <input
//           id="${controlId}"
//           name="${args.type}-button-card-${args.inputName ?? `control_${id}`}"
//           class="${ifDefined(validationClass)}"
//           type="${args.type}"
//           ?disabled="${args.disabled}"
//           .checked="${args.checked}"
//           checked="${args.checked || nothing}"
//           @input="${(e: InputEvent) => inputHandler(e, updateArgs)}"
//           aria-describedby="${args.validation != 'null'
//             ? `${args.validation}-id-${controlId}`
//             : nothing}"
//           aria-invalid="${args.validation != 'null' ? true : nothing}"
//         />
//         <label for="${controlId}">
//           <span>${args.label}</span>
//           ${args.description ? description : nothing}
//         </label>
//         ${args.icon !== 'none' ? icon : nothing}
//       </div>
//       ${args.validation === 'is-invalid' && !args.GroupValidation ? invalidFeedback : nothing}
//     `;
//   },
// };

// export const CustomContent: Story = {
//   render: Default.render,
// };

// function col(label: string, args: Args, useState: useStateFn) {
//   const [id] = useState(cardControlId++);

//   return html`
//     <div class="col-sm-6">
//       ${Default.render({
//         ...args,
//         id,
//         label,
//         inputName: args.type === 'radio' ? 'group' : `control-${id}`,
//         checked: false,
//         GroupValidation: true,
//         validation: args.validation,
//       })}
//     </div>
//   `;
// }

// export const Group = {
//   parameters: {
//     controls: {
//       include: ['Type', 'Validation'],
//     },
//   },
//   render: (args: Args) => {
//     const invalidFeedback = html`
//       <p id="invalid-feedback" class="d-inline-flex mt-16 invalid-feedback">Invalid choice</p>
//     `;

//     return html`
//       <fieldset class="container-fluid">
//         <legend aria-describedby="invalid-feedback">Legend</legend>
//         <div class="row g-16">${CONTROL_LABELS.map(n => col(n, args, useState))}</div>
//         ${args.validation === 'is-invalid' ? invalidFeedback : nothing}
//       </fieldset>
//     `;
//   },
// };
