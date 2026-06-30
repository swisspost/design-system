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
    select: {
      root: {
        background: 'var(--post-scheme-color-interactive-input-enabled-bg)',
        disabledBackground: 'var(--post-scheme-color-interactive-input-disabled-bg)',
        filledBackground: 'var(--post-scheme-color-interactive-input-enabled-bg)',
        filledHoverBackground: 'var(--post-scheme-color-interactive-input-hover-bg)',
        filledFocusBackground: 'var(--post-scheme-color-interactive-input-enabled-bg)',
        borderColor: 'var(--post-scheme-color-interactive-input-enabled-border)',
        focusBorderColor: 'var(--post-scheme-color-interactive-input-enabled-border)',
        hoverBorderColor: 'var(--post-scheme-color-interactive-input-hover-border)',
        color: 'var(--post-scheme-color-interactive-input-enabled-fg)',
        disabledColor: 'var(--post-scheme-color-interactive-input-disabled-fg)',
        borderRadius: 'var(--post-core-dimension-2)',
      },
      dropdown: {
        width: 'var(--post-device-sizing-notification-5)',
        color: 'var(--post-scheme-color-interactive-input-enabled-fg)',
      },
      option: {
        color: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
        focusColor: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
        focusBackground: 'var(--post-scheme-color-palette-bg-2)',
        selectedBackground: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
        selectedFocusBackground: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
        selectedColor: 'var(--post-scheme-color-palette-bg-1)',
        selectedFocusColor: 'var(--post-scheme-color-palette-bg-1)',
      },
    },
    button: {
      root: {
        borderRadius: 'var(--post-device-border-radius-round)',
        label: {
          fontWeight: '700',
        },
      },
    },
    inputtext: {
      root: {
        background: 'var(--post-scheme-color-interactive-input-enabled-bg)',
        disabledBackground: 'var(--post-scheme-color-interactive-input-disabled-bg)',
        filledBackground: 'var(--post-scheme-color-interactive-input-enabled-bg)',
        filledHoverBackground: 'var(--post-scheme-color-interactive-input-hover-bg)',
        filledFocusBackground: 'var(--post-scheme-color-interactive-input-enabled-bg)',
        borderColor: 'var(--post-scheme-color-interactive-input-enabled-border)',
        focusBorderColor: 'var(--post-scheme-color-interactive-input-enabled-border)',
        hoverBorderColor: 'var(--post-scheme-color-interactive-input-hover-border)',
        color: 'var(--post-scheme-color-interactive-input-enabled-fg)',
        disabledColor: 'var(--post-scheme-color-interactive-input-disabled-fg)',
        borderRadius: 'var(--post-core-dimension-2)',
      },
    },
    checkbox: {
      root: {
        borderRadius: 'var(--post-core-dimension-2)',
        borderColor: 'var(--post-scheme-color-interactive-primary-enabled-stroke)',
        focusBorderColor: 'var(--post-scheme-color-interactive-primary-enabled-stroke)',
        hoverBorderColor: 'var(--post-scheme-color-interactive-primary-enabled-stroke)',
        checkedBorderColor: 'var(--post-scheme-color-interactive-primary-enabled-stroke)',
        checkedHoverBorderColor: 'var(--post-scheme-color-interactive-primary-enabled-stroke)',
        background: 'transparent',
        checkedBackground: 'transparent',
        checkedHoverBackground: 'transparent',
        disabledBackground: 'transparent',
        filledBackground: 'transparent',
        checkedDisabledBorderColor: 'var(--post-scheme-color-interactive-primary-disabled-fg4)',
        width: 'var(--post-device-sizing-interactive-icon-size4)',
        height: 'var(--post-device-sizing-interactive-icon-size4)',
      },
      icon: {
        color: 'var(--post-scheme-color-interactive-primary-enabled-stroke)',
        checkedColor: 'var(--post-scheme-color-interactive-primary-enabled-stroke)',
        checkedHoverColor: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
        disabledColor: 'var(--post-scheme-color-interactive-primary-disabled-fg4)',
      },
    },
    radiobutton: {
      root: {
        width: 'var(--post-device-sizing-interactive-icon-size4)',
        height: 'var(--post-device-sizing-interactive-icon-size4)',
        borderColor: 'var(--post-scheme-color-interactive-primary-enabled-stroke)',
        focusBorderColor: 'var(--post-scheme-color-interactive-primary-enabled-stroke)',
        hoverBorderColor: 'var(--post-scheme-color-interactive-primary-enabled-stroke)',
        checkedBorderColor: 'var(--post-scheme-color-interactive-primary-enabled-stroke)',
        checkedHoverBorderColor: 'var(--post-scheme-color-interactive-primary-enabled-stroke)',
        checkedDisabledBorderColor: 'var(--post-scheme-color-interactive-primary-disabled-fg4)',
        background: 'transparent',
        checkedBackground: 'transparent',
        checkedHoverBackground: 'transparent',
        disabledBackground: 'transparent',
        filledBackground: 'transparent',
      },
      icon: {
        size: 'var(--post-device-sizing-icon-8)',
        checkedColor: 'var(--post-scheme-color-interactive-primary-enabled-stroke)',
        checkedHoverColor: 'var(--post-scheme-color-interactive-primary-enabled-fg1)',
        disabledColor: 'var(--post-scheme-color-interactive-primary-disabled-fg4)',
      },
    },
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
          width: 'var(--post-focus-outline-width)',
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
          width: 'var(--post-focus-outline-width)',
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
          width: 'var(--post-focus-outline-width)',
        },
      },
      filter: {},
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
      currentPageReport: {
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
    .p-datatable .p-datatable-thead > tr > th,
    .p-paginator-current {
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

    .p-datatable .p-datatable-header {
      border-start-start-radius: var(--post-device-border-radius-2);
      border-start-end-radius: var(--post-device-border-radius-2);
    }

    .p-datatable:not(:has(.p-datatable-header)) .p-datatable-thead > tr:first-child > th:first-child {
      border-start-start-radius: var(--post-device-border-radius-2);
    }

    .p-datatable:not(:has(.p-datatable-header)) .p-datatable-thead > tr:first-child > th:last-child {
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

    p-button .p-button,
    p-button .p-button:not(:disabled):hover,
    p-select.p-select,
    input.p-inputtext,
    p-checkbox .p-checkbox-box,
    p-radiobutton .p-radiobutton-box {
      border-width: var(--post-device-border-width-default);
    }

    p-button .p-button {
      border-color: var(--post-scheme-color-interactive-button-primary-enabled-stroke);
      background-color: var(--post-scheme-color-interactive-button-primary-enabled-bg);
      color: var(--post-scheme-color-interactive-button-primary-enabled-fg);
    }

    p-button .p-button:not(:disabled):hover {
      border-color: var(--post-scheme-color-interactive-button-primary-hover-stroke);
      background-color: var(--post-scheme-color-interactive-button-primary-hover-bg);
      color: var(--post-scheme-color-interactive-button-primary-hover-fg);
    }

    p-button .p-button-text.p-button-secondary,
    p-button .p-button-text.p-button-info {
      border-color: var(--post-scheme-color-interactive-button-tertiary-enabled-stroke);
      background-color: var(--post-scheme-color-interactive-button-tertiary-enabled-bg);
      color: var(--post-scheme-color-interactive-button-tertiary-enabled-fg);
    }

    p-button .p-button-text.p-button-secondary:not(:disabled):hover,
    p-button .p-button-text.p-button-info:not(:disabled):hover {
      border-color: var(--post-scheme-color-interactive-button-tertiary-hover-stroke);
      background-color: var(--post-scheme-color-interactive-button-tertiary-hover-bg);
      color: var(--post-scheme-color-interactive-button-tertiary-hover-fg);
    }

    p-button .p-button-outlined {
      border-color: var(--post-scheme-color-interactive-button-secondary-enabled-stroke);
      background-color: var(--post-scheme-color-interactive-button-secondary-enabled-bg);
      color: var(--post-scheme-color-interactive-button-secondary-enabled-fg);
    }

    p-button .p-button-outlined:not(:disabled):hover {
      border-color: var(--post-scheme-color-interactive-button-secondary-hover-stroke);
      background-color: var(--post-scheme-color-interactive-button-secondary-hover-bg);
      color: var(--post-scheme-color-interactive-button-secondary-hover-fg);
    }
  `,
});
