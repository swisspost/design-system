import './button.scss';

export default {
  title: 'Components/Button',
}

const Template = (args) => `<button class="btn btn-primary">${args.label}</button>`;
const AnimatedTemplate = (args) => `<button class="btn btn-primary btn-animated"><span>${args.label}</span></button>`;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary button'
}

export const PrimaryAnimated = AnimatedTemplate.bind({});
PrimaryAnimated.args = {
  label: 'Primary button animated'
}
