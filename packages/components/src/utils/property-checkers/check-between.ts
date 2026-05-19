import { checkType } from './check-type';

export type BetweenOptions = {
  includeMin?: boolean;
  includeMax?: boolean;
};

export function checkBetween<T extends { host: HTMLElement }>(
  component: T,
  prop: keyof T,
  minimum: number,
  maximum: number,
  options: BetweenOptions = {},
) {
  const componentName = component.host.localName;
  const value = component[prop];

  checkType(component, prop, 'number');

  if (typeof value !== 'number') {
    return;
  }

  const includeMin = options.includeMin ?? true;
  const includeMax = options.includeMax ?? true;

  const lowerBoundValid = includeMin ? value >= minimum : value > minimum;
  const upperBoundValid = includeMax ? value <= maximum : value < maximum;

  let expectation: string;

  if (includeMin) {
    expectation = includeMax
      ? `between and including \`${minimum}\` and \`${maximum}\``
      : `greater than or equal to \`${minimum}\` and less than \`${maximum}\``;
  } else {
    expectation = includeMax
      ? `greater than \`${minimum}\` and less than or equal to \`${maximum}\``
      : `greater than \`${minimum}\` and less than \`${maximum}\``;
  }

  const message = `The prop \`${String(
    prop,
  )}\` of the \`${componentName}\` component must be ${expectation}.`;

  if (!lowerBoundValid || !upperBoundValid) {
    console.error(message);
  }
}
