import './badge.scss';

export default {
  title: 'Components/Badge',
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
    size: {
      control: {
        type: 'radio',
      },
      options: ['default', 'small'],
    },
    nested: {
      control: {
        type: 'boolean',
      },
    },
    nestedNumber: {
      control: {
        type: 'number',
      },
      if: { arg: 'nested' },
    },
    active: {
      control: {
        type: 'boolean',
      },
    },
  },
};

const SIZE_CLASS_MAP = {
  default: '',
  small: 'badge-sm',
};

// DefaultTemplate
const DefaultTemplate = (args) => {
  const sizeClass = SIZE_CLASS_MAP[args.size];
  const defaultBadges = `${args.label}</span>`;
  const nestedBadges = `
    <span>${args.label}</span>
    <span class="badge">${args.nestedNumber}</span>
    `;
  return `<span class="badge ${sizeClass}">${args.nested ? `${nestedBadges}` : `${defaultBadges}`}`;
};

export const DefaultBadge = DefaultTemplate.bind({});
DefaultBadge.parameters = {
  controls: {
    include: ['label', 'size', 'nested', 'nestedNumber'],
  },
};
DefaultBadge.args = {
  label: 'Default Badge',
  size: 'default',
  nested: false,
  nestedNumber: '10',
};

// CheckableTemplate
const CheckableTemplate = (args) => {
  const sizeClass = SIZE_CLASS_MAP[args.size];
  const checked = args.active ? `checked` : ``;
  const nestedLabel = args.nested ? `<span>${args.label}</span>` : `${args.label}`;
  const nestedNumbers = args.nested ? `<span class="badge">${args.nestedNumber}</span>` : ``;

  return `
  <div class="badge-check">
    <input id="CheckableBadge" class="badge-check-input" type="checkbox" value=""${checked}>
    <label class="badge-check-label ${sizeClass}" for="CheckableBadge">
      ${nestedLabel}
      ${nestedNumbers}
    </label>
  </div>
  `;
};

export const CheckableBadge = CheckableTemplate.bind({});
CheckableBadge.parameters = {
  controls: {
    include: ['label', 'size', 'nested', 'nestedNumber', 'active'],
  },
};
CheckableBadge.args = {
  label: 'Checkable Badge',
  size: 'default',
  nested: false,
  nestedNumber: 10,
  active: true,
};

// DismissibleTemplate
const DismissibleTemplate = (args) => {
  const sizeClass = SIZE_CLASS_MAP[args.size];
  const nestedLabel = args.nested ? `<span>${args.label}</span>` : `${args.label}`;
  const nestedNumbers = args.nested ? `<span class="badge">${args.nestedNumber}</span>` : ``;

  return `
    <span class="badge ${sizeClass}">
      ${nestedLabel}
      ${nestedNumbers}
      <button type="button" class="btn-close" aria-label="dismiss"></button>
    </span>
  `;
};

export const DismissibleBadge = DismissibleTemplate.bind({});
DismissibleBadge.parameters = {
  controls: {
    include: ['label', 'size', 'nested', 'nestedNumber'],
  },
};
DismissibleBadge.args = {
  label: 'Dismissible Badge',
  size: 'default',
  nested: false,
  nestedNumber: 10,
};
