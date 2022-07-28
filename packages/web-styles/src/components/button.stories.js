import './button.scss';
import "./icons.scss";

export default {
  title: 'Components/Button',
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'rg', 'md', 'lg'],
    },
    animated: {
      control: {
        type: 'boolean',
      },
    },
    variant: {
      control: {
        type: 'radio'
      },
      options: ['btn-primary', 'btn-secondary', 'btn-tertiary'],
    },
    iconText: {
      control: {
        type: 'boolean',
      },
    }
  }
}

const Template = (args) => {
  const buttonText = args.animated ? `<span>${args.label}</span>` : args.label;
  return `<button class="btn ${args.variant}${args.animated ? ' btn-animated' : ''} btn-${args.size}">${buttonText}</button>`;
}
const IconTemplate = (args) => {
  const buttonIcon = args.iconText ? `` : ` btn-icon`;
  return `<button class="btn ${args.variant}${buttonIcon} btn-${args.size}"><i aria-hidden="true" class="pi pi-3193"></i><span>${args.label}</span></button>`;
}


export const Default = Template.bind({});
Default.parameters = {
  controls: {
    include: ['label', 'size', 'animated', 'variant']
  }
}
Default.args = {
  label: 'Default button',
  size: 'md',
  animated: true,
  variant: 'btn-primary',
  iconText: {
    disabled: true
  }
}


export const Icon = IconTemplate.bind({});
Icon.parameters = {
  controls: {
    include: ['label', 'size', 'variant', 'iconText']
  }
}
Icon.args = {
  label: 'Some text',
  size: 'md',
  variant: 'btn-primary',
  iconText: true,
}