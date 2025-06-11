import { Args } from '@storybook/web-components';

export function getLabelText({ label, requiredOptional }: Args) {
  if (requiredOptional === 'required') {
    label = `${label} (required)`;
  } else if (requiredOptional === 'optional') {
    label = `${label} (optional)`;
  }

  return label;
}
