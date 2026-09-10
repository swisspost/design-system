import { Args, StoryContext } from '@storybook/web-components';
import { html } from 'lit';

export const VALIDATION_STATE_MAP: Record<string, undefined | boolean> = {
  'null': undefined,
  'is-valid': false,
  'is-invalid': true,
};

export function getLabelText({ label, requiredOptional }: Args) {
  if (requiredOptional === 'required') {
    label = html`${label} <span aria-hidden="true">(required)</span>`;
  } else if (requiredOptional === 'optional') {
    label = html`${label} <span aria-hidden="true">(optional)</span>`;
  }

  return label;
}

export function getValidationMessages(args: Args, context: StoryContext, withHint = true) {
  return [
    args.validation === 'is-valid'
      ? html`<p class="valid-feedback" id="${args.validation}-id-${context.id}">Great success!</p>`
      : null,
    args.validation === 'is-invalid'
      ? html`<p class="invalid-feedback" id="${args.validation}-id-${context.id}">
          An error occurred!
        </p>`
      : null,
    args.hint !== '' && withHint
      ? html`<p class="form-hint" id="form-hint-${context.id}">${args.hint}</p>`
      : null,
  ];
}
