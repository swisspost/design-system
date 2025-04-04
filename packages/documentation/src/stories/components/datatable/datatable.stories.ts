import type { StoryObj } from '@storybook/web-components';
import { html, LitElement, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MetaComponent } from '@root/types';
import {
  AllCommunityModule,
  GridApi,
  GridOptions,
  ModuleRegistry,
  createGrid,
} from 'ag-grid-community';
import { RatingRenderer } from './ratingRenderer';

const meta: MetaComponent = {
  id: 'bfcc716a-3f25-41a0-b277-ad9f9f4d3693',
  title: 'Components/Datatable (AG Grid)',
  tags: ['package:HTML'],
  render: renderDatatable,
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=25567-49992&mode=design&t=PR2ZnqAacaK7UiXP-4',
    },
  },
  args: {},
  argTypes: {},
};

export default meta;

type Story = StoryObj;

class CustomButtonComponent {
  eGui!: HTMLDivElement;
  eButton!: HTMLButtonElement;
  eventListener!: () => void;

  init() {
    this.eGui = document.createElement('div');
    this.eButton = document.createElement('button');
    this.eButton.className = 'btn btn-sm btn-primary';
    this.eButton.textContent = 'Click me';
    this.eventListener = () => alert('It has been clicked');
    this.eButton.addEventListener('click', this.eventListener);
    this.eGui.appendChild(this.eButton);
  }

  getGui() {
    return this.eGui;
  }

  refresh() {
    return true;
  }

  destroy() {
    if (this.eButton) {
      this.eButton.removeEventListener('click', this.eventListener);
    }
  }
}
// Custom LitElement component to ensure proper lifecycle handling
@customElement('datatable-component')
class DatatableComponent extends LitElement {
  private gridApi?: GridApi;

  static styles = css`
    #myGrid {
      height: 500px;
      width: 100%;
    }

    .ag-cell {
      line-height: unset;
    }
  `;

  constructor() {
    super();
    ModuleRegistry.registerModules([AllCommunityModule]);
  }

  firstUpdated() {
    const gridDiv = this.querySelector<HTMLElement>('#myGrid');

    if (gridDiv) {
      const gridOptions: GridOptions = {
        rowSelection: {
          mode: 'multiRow',
        },
        autoSizeStrategy: {
          type: 'fitGridWidth',
          defaultMinWidth: 100,
          columnLimits: [
            {
              colId: 'rating',
              minWidth: 200,
            },
            {
              colId: 'type',
              minWidth: 200,
            },
          ],
        },
        rowData: [
          { component: 'Button', type: ['HTML Component'], rating: 2, done: true },
          { component: 'Badge', type: ['HTML Component'], rating: 4, done: false },
          {
            component: 'Banner',
            type: ['HTML Component', 'Web Component'],
            rating: 5,
            done: false,
          },
        ],
        pinnedBottomRowData: [
          {
            component: 'Pinned bottom row',
            type: ['HTML Component', 'Web Component'],
            rating: 5,
            done: false,
          },
        ],
        columnDefs: [
          { field: 'component', editable: true, pinned: 'left' },
          { field: 'type', filter: true },
          { field: 'rating', cellRenderer: RatingRenderer },
          { field: 'Done', filter: true },
          {
            colId: 'actions',
            headerName: 'Actions',
            cellRenderer: CustomButtonComponent,
          },
        ],
        defaultColDef: {
          flex: 1,
        },
      };

      this.gridApi = createGrid(gridDiv, gridOptions);
    }
  }

  elementChildren: Array<Element> = [];

  createRenderRoot() {
    return this;
  }

  getDeleteButton() {}

  render() {
    return html` <div id="myGrid" style="height: 500px;"></div>`;
  }
}

function renderDatatable() {
  return html` <datatable-component></datatable-component> `;
}

export const Default: Story = {};
