import { definePreset } from '@primeng/themes';
import Nora from '@primeng/themes/nora';

export const Post = definePreset(Nora, {
  primitive: {
    borderRadius: {
      none: '1px',
      xs: '4px',
      sm: '4px',
      md: '4px',
      lg: '4px',
      xl: '4px',
    },
    yellow: {
      50: '#fffcf2',
      100: '#fff3c2',
      200: '#ffe991',
      300: '#ffdf61',
      400: '#ffd630',
      500: '#ffcc00',
      600: '#d9ad00',
      700: '#b38f00',
      800: '#8c7000',
      900: '#665200',
      950: '#403300',
    },
    green: {
      50: '#f4f9f4',
      100: '#cce2c9',
      200: '#a4cb9e',
      300: '#7cb573',
      400: '#549e48',
      500: '#2c871d',
      600: '#257319',
      700: '#1f5f14',
      800: '#184a10',
      900: '#12360c',
      950: '#0b2207',
    },
    red: {
      50: '#fbf3f4',
      100: '#e9c7cb',
      200: '#d89ba3',
      300: '#c76f7a',
      400: '#b64351',
      500: '#a51728',
      600: '#8c1422',
      700: '#73101c',
      800: '#5b0d16',
      900: '#420910',
      950: '#29060a',
    },
    orange: {
      50: '#fefaf2',
      100: '#fce8c2',
      200: '#fad591',
      300: '#f8c361',
      400: '#f6b030',
      500: '#f49e00',
      600: '#cf8600',
      700: '#ab6f00',
      800: '#865700',
      900: '#623f00',
      950: '#3d2800',
    },
    blue: {
      50: '#fcfefe',
      100: '#f3f9fb',
      200: '#e9f3f8',
      300: '#dfeef4',
      400: '#d6e9f1',
      500: '#cce4ee',
      600: '#adc2ca',
      700: '#8fa0a7',
      800: '#707d83',
      900: '#525b5f',
      950: '#33393c',
    },
  },
  semantic: {
    transitionDuration: '250ms',
    focusRing: {
      width: '2px',
      style: 'solid',
      color: '#1976c8',
      offset: '2px',
      shadow: 'none',
    },
    primary: {
      50: 'hsl(0, 0%, 20%)',
      20: 'hsl(0, 0%, 20%)',
      200: 'hsl(0, 0%, 20%)',
      300: 'hsl(0, 0%, 20%)',
      400: 'hsl(0, 0%, 20%)',
      500: 'hsl(0, 0%, 20%)',
      600: 'hsl(0, 0%, 20%)',
      700: 'hsl(0, 0%, 20%)',
      800: 'hsl(0, 0%, 20%)',
      900: 'hsl(0, 0%, 20%)',
      950: 'hsl(0, 0%, 20%)',
    },
    formField: {
      paddingX: '1rem',
      paddingY: '0.5rem',
      sm: {
        fontSize: '0.875rem',
        paddingX: '1rem',
        paddingY: '0.25rem',
      },
      lg: {
        fontSize: '1.125rem',
        paddingX: '1rem',
        paddingY: '0.75rem',
      },
      borderRadius: '{border.radius.none}',
      focusRing: {
        width: '{focusRing.width}',
        style: '{focusRing.style}',
        color: '{focusRing.color}',
        offset: '{focusRing.offset}',
        shadow: '{focusRing.shadow}',
      },
    },
    list: {
      padding: '0.5rem 0',
      gap: '0px',
      option: {
        padding: '0.5rem 1rem',
        borderRadius: '{border.radius.none}',
      },
      optionGroup: {
        padding: '0.5rem 1rem',
        fontWeight: '400',
      },
    },
    overlay: {
      select: {
        borderRadius: '{border.radius.none}',
        shadow: '0.5px 3px 4px 0px rgba(0, 0, 0, 0.10), 2px 4px 10px 4px rgba(0, 0, 0, 0.10)',
      },
      popover: {
        borderRadius: '{border.radius.none}',
        shadow: '0.5px 3px 4px 0px rgba(0, 0, 0, 0.10), 2px 4px 10px 4px rgba(0, 0, 0, 0.10)',
      },
      navigation: {
        shadow: '0.5px 3px 4px 0px rgba(0, 0, 0, 0.10), 2px 4px 10px 4px rgba(0, 0, 0, 0.10)',
      },
    },
    colorScheme: {
      light: {
        darkGrey: '#F4F3F1',
        lightGrey: '#FAF9F8',
        surface: {
          0: 'hsl(0, 0%, 100%)',
          50: 'hsl(0, 0%, 90%)',
          100: 'hsl(0, 0%, 90%)',
          200: 'hsl(0, 0%, 80%)',
          300: 'hsl(0, 0%, 80%)',
          400: 'hsl(0, 0%, 60%)',
          500: 'hsl(0, 0%, 60%)',
          600: 'hsl(0, 0%, 40%)',
          700: 'hsl(0, 0%, 40%)',
          800: 'hsl(0, 0%, 20%)',
          900: 'hsl(0, 0%, 20%)',
          950: 'hsl(0, 0%, 0%)',
        },
        primary: {
          color: '{surface.800}',
          contrastColor: '#ffffff',
          hoverColor: '{surface.600}',
          activeColor: '{surface.600}',
        },
        highlight: {
          background: '{yellow.500}',
          focusBackground: '{yellow.500}',
          color: '{surface.950}',
          focusColor: '{surface.950}',
        },
        formField: {
          disabledBackground: '{surface.0}',
          borderColor: '{surface.800}',
          hoverBorderColor: '{surface.950}',
          focusBorderColor: '{surface.950}',
          color: '{surface.950}',
        },
        text: {
          color: '{surface.950}',
        },
        list: {
          option: {
            focusBackground: '{surface.50}',
          },
        },
      },
    },
  },
  components: {
    button: {
      border: {
        radius: '{border.radius.sm}',
      },
      icon: {
        only: {
          width: '32px',
        },
      },
    },
    datatable: {
      header: {
        background: '{surface.100}',
        border: {
          width: '0 0 1px',
        },
        cell: {
          hover: {
            background: '{surface.100}',
          },
        },
      },
      row: {
        hover: {
          background: '{surface.100}',
        },
      },
    },
    checkbox: {
      height: '1.375rem',
      width: '1.375rem',
      border: {
        radius: '{border.radius.none}',
      },
      checked: {
        background: '{surface.0}',
        hover: {
          background: '{surface.0}',
        },
      },
      icon: {
        checked: {
          color: '{surface.950}',
          hover: {
            color: '{surface.950}',
          },
        },
      },
    },
    radiobutton: {
      height: '1.375rem',
      width: '1.375rem',
      icon: {
        size: '0.625rem',
      },
      transition: {
        duration: '0',
      },
    },
    paginator: {
      gap: '0',
      nav: {
        button: {
          color: '{surface.800}',
          background: '{surface.0}',
          border: {
            radius: '{border.radius.none}',
          },
          hover: {
            color: '{surface.0}',
            background: '{surface.600}',
          },
        },
      },
      current: {
        page: {
          report: {
            color: '{surface.950}',
          },
        },
      },
    },
  },
});
