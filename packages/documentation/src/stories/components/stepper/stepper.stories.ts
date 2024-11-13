import { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';
import { ifDefined } from 'lit/directives/if-defined.js';
import { useArgs } from '@storybook/preview-api';

const defaultSteps = ['Sender', 'Product', 'Other details', 'Order summary'];

const meta: MetaComponent = {
  id: '7dc546d9-e248-4d06-befe-3ad62fcd310f',
  title: 'Components/Stepper',
  tags: ['package:Angular'],
  render: renderStepper,
  parameters: {
    badges: [],
    controls: {
      exclude: ['steps'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=20952-29106&mode=design&t=38qLaYwWdirTcHdb-4',
    },
  },
  args: {
    currentStepNumber: 3,
    navigatableSteps: 'all',
    processName: 'Registration Form',
    steps: defaultSteps,
  },
  argTypes: {
    navigatableSteps: {
      name: 'Navigatable Steps',
      description: 'Defines which steps in the current process the user can navigate to.',
      control: {
        type: 'radio',
        labels: {
          all: 'All steps',
          completedOnly: 'Completed Steps only',
          none: 'None',
        },
      },
      options: ['all', 'completedOnly', 'none'],
      table: {
        category: 'General',
      },
    },
    currentStepNumber: {
      name: 'Current Step Number',
      description: 'The number of the step the user is currently at in the process.',
      control: {
        type: 'select',
      },
      options: Object.keys(defaultSteps).map(key => parseInt(key, 10) + 1),
      table: {
        category: 'General',
      },
    },
    processName: {
      name: 'Process Name',
      description:
        'A straightforward, self-explanatory name for the current process, used for assistive technologies.',
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

// RENDERER
function getStepperItem(args: Args, step: string, index: number, updateStep: (newStep: number, event: Event) => void) {
  const currentStepIndex = args.currentStepNumber - 1;
  const isCompletedStep = index < currentStepIndex;
  const isCurrentStep = index === currentStepIndex;
  const isNextStep = index > currentStepIndex;
  const isLink =
    (isCompletedStep && args.navigatableSteps !== 'none') ||
    (isNextStep && args.navigatableSteps === 'all');

  let status = 'Current';
  if (isCompletedStep) status = 'Completed';
  if (isNextStep) status = 'Next';

  const text = html`<span class="visually-hidden">${status} step:</span> ${step}`;
  const title = step !== defaultSteps[index] ? step : undefined;

  return html`
    <li aria-current=${ifDefined(isCurrentStep ? 'step' : undefined)} class="stepper-item">
      ${isLink
        ? html`
            <a class="stepper-link" href="../step-${index + 1}" title=${ifDefined(title)}
              @click=${(e: Event) => {
                e.preventDefault();
                updateStep(index + 1, e);
              }}>
              ${text}
            </a>
          `
        : html`<span class="stepper-link" title=${ifDefined(title)}>${text}</span>`}
    </li>
  `;
}


function renderStepper(args: Args) {
  const [_, updateArgs] = useArgs();

  const updateStep = (newStepNumber: number, event: Event) => {
    event.preventDefault();
    updateArgs({ currentStepNumber: newStepNumber });
  };

  const isNav = args.navigatableSteps !== 'none';

  const stepper = html`<ol
    class="stepper"
    aria-label=${ifDefined(isNav ? undefined : args.processName + ' Progress')}
  >
    ${args.steps.map((step: string, index: number) => 
      getStepperItem(args, step, index, updateStep)
    )}
  </ol>`;

  return args.navigatableSteps === 'none'
    ? stepper
    : html`<nav aria-label="${args.processName}">${stepper}</nav>`;
}

export const Default: StoryObj = {};

export const NavigationalStepper: StoryObj = {
  args: {
    navigatableSteps: 'completedOnly',
  },
};

export const InformationalStepper: StoryObj = {
  args: {
    navigatableSteps: 'none',
  },
};

export const LongLabels: StoryObj = {
  args: {
    steps: [
      'Nullam luctus mi sit amet nisl suscipit, nec tempor justo varius',
      ...defaultSteps.slice(1),
    ],
  },
};
