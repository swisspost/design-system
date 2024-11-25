import type { StoryObj, Args, StoryContext } from '@storybook/web-components';
import meta, {
  Checkbox,
  Input,
  RadioButton,
  RadioButtonGroup,
  Select,
  Switch,
  TextArea,
} from './validation.stories';
import { html, nothing } from 'lit';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

const components = [Checkbox, Input, RadioButton, RadioButtonGroup, Select, Switch, TextArea];

export const Validation: Story = {
  render: (_args: Args, context: StoryContext) => {
    return html`
      ${['light', 'dark'].map(scheme => {
        return html`
          <div
            data-color-scheme="${scheme}"
            class="bg-${scheme === 'light' ? 'white' : 'dark'} snapshot"
          >
            ${components.map(Component => {
              return html`
                <div>
                  ${['is-valid', 'is-invalid'].map(validation => {
                    const render = Component.render || (() => nothing);
                    const args = {
                      ...context.args,
                      validationValidation: validation,
                      scheme: scheme,
                      componentName: Object.keys(Component.args!)[0],
                    };
                    return html`${render(args, context)}`;
                  })}
                </div>
              `;
            })}
          </div>
        `;
      })}
    `;
  },
};
