import { Args, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '7dc546d9-e248-4d06-befe-3ad62fcd310f',
  title: 'Components/Stepper',
  tags: ['package:WebComponents', 'status:InProgress'],
  component: 'post-stepper',
  render,
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
    currentIndex: 2,
    completedLabel: 'Completed step',
    currentLabel: 'Current step',
    activeStepLabel: 'Step #index:',
    stepsAmount: 5,
  },
  argTypes: {
    currentIndex: {
      name: 'current-index',
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
  },
};
export default meta;

function render(args: Args) {
  return html`
    <post-stepper
      completed-label="${args.completedLabel}"
      current-label="${args.currentLabel}"
      active-step-label="${args.activeStepLabel}"
      current-index="${args.currentIndex}"
    >
      ${Array.from({ length: args.stepsAmount }).map(
        (a, i) => html` <post-stepper-item> Step ${i + 1} label</post-stepper-item> `,
      )}
    </post-stepper>
  `;
}

export const Default: StoryObj = {};
