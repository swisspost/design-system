import { Args, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '7dc546d9-e248-4d06-befe-3ad62fcd310f',
  title: 'Components/Stepper',
  tags: ['package:WebComponents', 'status:Stable'],
  render: renderStepper,
  parameters: {
    badges: [],
    controls: {
      exclude: ['steps'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=21-176&p=f&t=SlP83fyysFMbjBGJ-0',
    },
  },
  args: {
    currentStepNumber: 2,
    completedLabel: 'Completed step',
    nextLabel: 'Next step',
    currentLabel: 'Current step',
    stepLabel: 'Step',
    stepsAmount: 5,
  },
  argTypes: {
    currentStepNumber: {
      name: 'Current step number',
      description:
        'The step on which the user is currently at in the process. Note that a negative step index means the process has not started yet.',
      control: {
        type: 'select',
        labels: {
          '-1': 'Not started',
          0: 'Step 1',
          1: 'Step 2',
          2: 'Step 3',
          3: 'Step 4',
          4: 'Step 5',
          5: 'Step 6',
          6: 'Step 7',
          7: 'Step 8',
          8: 'Step 9',
          9: 'Step 10',
          10: 'Completed',
        },
      },
      options: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      table: {
        category: 'General',
      },
    },
    stepsAmount: {
      name: 'Steps amount',
      description: 'The amount of steps in the stepper.',
      control: {
        type: 'select',
      },
      options: [3, 4, 5, 6, 7, 8, 9, 10],
      table: {
        category: 'General',
      },
    },
    completedLabel: {
      name: 'Completed label',
      description: 'The visually hidden "Completed step" label, used for accessibility.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
    currentLabel: {
      name: 'Current label',
      description: 'The visually hidden "Current step" label, used for accessibility.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
    stepLabel: {
      name: 'Step label',
      description:
        "The step label is visible only on mobile for the current step, it is added alongside the current step's index to show the user which step they're on.",
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

function renderStepper(args: Args) {
  return html`
    <post-stepper
      completed-label="${args.completedLabel}"
      current-label="${args.currentLabel}"
      step-label="${args.stepLabel}"
      current-index="${args.currentStepNumber}"
    >
      ${Array.from({ length: args.stepsAmount }).map(
        (a, i) => html` <post-stepper-item> Step ${i + 1} label</post-stepper-item> `,
      )}
    </post-stepper>
  `;
}

export const Default: StoryObj = {};
