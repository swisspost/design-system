import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const swissPostPreset = definePreset(Aura, {
  semantic: {
    focusRing: {
      width: 'var(--post-focus-outline-width)',
      style: 'var(--post-focus-border-style)',
      color: 'var(--post-focus-outline-color)',
      offset: 'var(--post-focus-outline-offset)',
    },
  },
  components: {
    datatable: {
      header: {
        background: 'var(--post-scheme-color-palette-bg-2)',
        borderColor: 'var(--post-scheme-color-interactive-primary-enabled-stroke4)',
        color: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
      },
      columnTitle: {
        fontWeight: '700',
      },
      columnFooter: {
        fontWeight: '700',
      },
      headerCell: {
        background: 'var(--post-scheme-color-palette-bg-2)',
        hoverBackground: 'var(--post-scheme-color-palette-bg-2)',
        selectedBackground: 'var(--post-scheme-color-palette-bg-2)',
        borderColor: 'var(--post-scheme-color-interactive-primary-enabled-stroke4)',
        color: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
        hoverColor: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
        selectedColor: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
        focusRing: {
          color: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
          width: '2',
        },
      },
      row: {
        background: 'var(--post-scheme-color-palette-bg-1)',
        hoverBackground: 'var(--post-scheme-color-palette-bg-2)',
        selectedBackground: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
        color: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
        hoverColor: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
        selectedColor: 'var(--post-scheme-color-palette-bg-1)',
        focusRing: {
          color: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
          width: '2',
        },
      },
      bodyCell: {
        borderColor: 'var(--post-scheme-color-interactive-primary-enabled-stroke4)',
        selectedBorderColor: 'var(--post-scheme-color-interactive-primary-enabled-stroke4)',
      },
      footerCell: {
        background: 'var(--post-scheme-color-palette-bg-1)',
        borderColor: 'var(--post-scheme-color-interactive-primary-enabled-stroke4)',
        color: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
      },
      footer: {
        background: 'var(--post-scheme-color-palette-bg-2)',
        borderColor: 'var(--post-scheme-color-interactive-primary-enabled-stroke4)',
        color: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
      },
      dropPoint: {
        color: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
      },
      resizeIndicator: {
        color: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
      },
      sortIcon: {
        color: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
        hoverColor: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
      },
      rowToggleButton: {
        hoverBackground: 'var(--post-scheme-color-palette-bg-2)',
        selectedHoverBackground: 'var(--post-scheme-color-palette-bg-2)',
        color: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
        hoverColor: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
        selectedHoverColor: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
        focusRing: {
          color: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
          width: '2',
        },
      },
      paginatorTop: {
        borderColor: 'var(--post-scheme-color-interactive-primary-enabled-stroke4)',
      },
      paginatorBottom: {
        borderColor: 'var(--post-scheme-color-interactive-primary-enabled-stroke4)',
      },
    },
    paginator: {
      root: {
        borderRadius: 'var(--post-device-border-radius-2)',
        background: 'var(--post-scheme-color-palette-bg-1)',
        color: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
      },
      navButton: {
        selectedBackground: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
        color: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
        selectedColor: 'var(--post-scheme-color-interactive-primary-selected-fg3)',
      },
    },
  },
  // Overrides that are not doable with the components tokens
  css: () => `
    .p-datatable .p-datatable-tbody > tr > td,
    .p-datatable .p-datatable-thead > tr > th {
      font-size: var(--post-device-font-size-9);
    }

    .p-datatable.p-datatable-striped tbody.p-datatable-tbody > tr:nth-child(even) {
      background-color: var(--post-scheme-color-palette-bg-2);
    }

    .p-datatable.p-datatable-striped tbody.p-datatable-tbody > tr:nth-child(odd) {
      background-color: var(--post-scheme-color-palette-bg-1);
    }

    .p-datatable {
      border: 1px solid var(--post-scheme-color-interactive-primary-enabled-stroke4);
      border-radius: var(--post-device-border-radius-2);
    }

    .p-datatable .p-datatable-thead > tr:first-child > th:first-child {
      border-start-start-radius: var(--post-device-border-radius-2);
    }

    .p-datatable .p-datatable-thead > tr:first-child > th:last-child {
      border-start-end-radius: var(--post-device-border-radius-2);
    }

    .p-datatable:not(:has(p-paginator)) .p-datatable-tbody:last-child > tr:last-child > td {
      border-color: transparent;
    }

    .p-datatable:not(:has(p-paginator)) .p-datatable-tbody:last-child > tr:last-child > td:first-child {
      border-end-start-radius: var(--post-device-border-radius-2);
    }

    .p-datatable:not(:has(p-paginator)) .p-datatable-tbody:last-child > tr:last-child > td:last-child {
      border-end-end-radius: var(--post-device-border-radius-2);
    }
  `,
});
