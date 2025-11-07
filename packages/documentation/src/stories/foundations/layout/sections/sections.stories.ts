import type { Args, StoryObj } from '@storybook/web-components-vite';
import { MetaExtended } from '@root/types';
import { html } from 'lit';
import './sections.styles.scss';

const meta: MetaExtended = {
  id: '49b036fc-5c54-46da-b6d1-081f0c731b05',
  title: 'Foundations/Layout/Sections',
  tags: ['package:Styles', 'status:Stable'],
  parameters: {
    layout: 'fullscreen',
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/sybxin85kCZNXQjQFOTc2a/PPNL-Cargo-layout-examples?node-id=609-51503&m=dev',
    },
    docs: {
      canvas: {
        className: 'section-example-story',
      },
    },
  },
  args: {
    element: '',
    alignment: '',
    breakpoint: '',
    nestInGrid: false,
    columnsCount: 2,
    contentColumn: 'first',
  },
  argTypes: {
    element: {
      name: 'Element',
      description: 'To which element the content should be aligned to.',
      control: {
        type: 'select',
      },
      options: ['section', 'container'],
      table: {
        category: 'Alignment',
      },
    },
    alignment: {
      name: 'Alignment',
      description:
        'Alignment of the content inside the `.section` element containing the alignment class.',
      control: {
        type: 'select',
      },
      options: ['stretch', 'start', 'end', 'none'],
      table: {
        category: 'Alignment',
      },
    },
    breakpoint: {
      name: 'Breakpoint',
      description:
        'Breakpoint at which the alignment class is applied. The alignment class is applied from the specified breakpoint and up.',
      control: {
        type: 'select',
      },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      table: {
        category: 'Alignment',
      },
    },
    nestInGrid: {
      name: 'Nest in grid',
      description: 'Whether to nest the content inside our grid-system or not.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Content insertion',
      },
    },
    columnsCount: {
      name: 'Amount of columns',
      description: 'The amount of columns rendered in the grid',
      control: {
        type: 'number',
        min: 1,
        max: 6,
      },
      if: {
        arg: 'nestInGrid',
        truthy: true,
      },
      table: {
        category: 'Content insertion',
      },
    },
    contentColumn: {
      name: 'Content placement',
      description: 'Column in which the content is inserted.',
      control: {
        type: 'select',
      },
      options: ['first', 'last'],
      if: {
        arg: 'nestInGrid',
        truthy: true,
      },
      table: {
        category: 'Content insertion',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <section class="section palette palette-brand">
      <div class="container py-64">
        <h2>Title</h2>
        <p>
          This section demonstrates a foundational layout component with proper spacing and
          container styling. Sections help in organizing content into distinct visual blocks,
          improving readability and structure. The container ensures consistent horizontal padding
          and maximum width across different screen sizes.
        </p>
      </div>
    </section>
  `,
};

export const Alignment: Story = {
  render: (args: Args) => {
    const alignmentClass =
      args.element && args.alignment
        ? ['align', args.element, args.breakpoint === 'xs' ? null : args.breakpoint, args.alignment]
            .filter(Boolean)
            .join('-')
        : null;
    const contentElement = html`<img
      class=${alignmentClass}
      src="https://picsum.photos/id/20/1920/640"
      alt=""
    />`;
    let content = contentElement;

    if (args.nestInGrid) {
      const contentCols = Array.from(Array(args.columnsCount), (_, i) => i);
      const contentIndex = args.contentColumn === 'first' ? 0 : contentCols.length - 1;
      const contentText = 'Lorem ipsum dolor sit amet';

      content = html`
        <div class="row">
          ${contentCols.map(
            i => html`<div class="col">${contentIndex === i ? contentElement : contentText}</div>`,
          )}
        </div>
      `;
    }

    return html`
      <section class="section palette palette-brand">
        <div class="container">${content}</div>
      </section>
    `;
  },
};
