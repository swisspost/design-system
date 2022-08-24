import './badge.scss';
import "./icons.scss";

export default {
  title: 'Components/Badge',
  argTypes: {
    label: {
        control: {
            type: 'text'
        },
    },
    size: {
        control: {
            type: 'select',
        },
        options: ['small', 'default'],
    },
    nested: {
        control: {
            type: 'boolean',
        },
    },
    nestedNumber: {
        control: {
            type: 'text',
        },
        if: {arg: 'nested'},
    },
    active: {
        control: {
            type: 'boolean',
        }
    }
  }
}


const SIZE_CLASS_MAP = {
  default: '',
  small: 'badge-sm'
};


// DefaultTemplate
const DefaultTemplate = (args) => {
  const sizeClass = SIZE_CLASS_MAP[args.size];
  const defaultBadges = `${args.label}</span>`;
  const nestedBadges = `
    <span>${args.label}</span>
    <span class="badge">${args.nestedNumber}</span>
    `
  return `<span class="badge ${sizeClass}">${args.nested ? `${nestedBadges}` : `${defaultBadges}`}`;
}

export const DefaultBadge = DefaultTemplate.bind({});
DefaultBadge.parameters = {
  controls: {
    include: ['label', 'size', 'nested', 'nestedNumber']
  }
}
DefaultBadge.args = {
  label: 'Default Badge',
  size: 'default',
  nested: false,
  nestedNumber: '10',
}

// CheckableTemplate
const CheckableTemplate = (args) => {

  //  return `
  //   <div class="badge-check">
  //     <input id= class="badge-check-input" type="checkbox" value="">
  //     <label class="badge-check-label" for=${args.label}>${args.label}</label>
  //   </div>     
  //  `  
}

export const CheckableBadge = CheckableTemplate.bind({});
CheckableBadge.parameters = {
  controls: {
    include: ['label', 'size', 'nested', 'nestedNumber', 'active']
  }
}
CheckableBadge.args = {
  label: 'Checkable Badge',
  size: 'sm',
  nested: false,
  active: true
}

// DismissibleTemplate
// TODO: Size
const DismissibleTemplate = (args) => {
  const backgroundClassesDismissible = [].concat(BACKGROUND_DEFAULT_CLASSES, BACKGROUND_CLASS_MAP[args.background] ?? [])
  return `<span class="${backgroundClassesDismissible.join(' ')}">${args.label}<i class="pi pi-2043"></i></span></span>`;
}

export const DismissibleBadge = DismissibleTemplate.bind({});
DismissibleBadge.parameters = {
  controls: {
    include: ['label', 'size', 'background']
  }
}
DismissibleBadge.args = {
  label: 'Dismissible Badge',
  size: 'sm',
  nested: false,
}

// PositionedTemplate
// TODO: Insert ChekableTemplate badge 