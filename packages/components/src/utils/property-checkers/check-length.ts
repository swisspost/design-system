export type LengthCondition =
  | number
  | {min: number}
  | {max: number}
  | {min: number, max: number};

export function checkLength<T = unknown>(array: T[], condition: LengthCondition, error: string) {
  if (typeof condition === 'number') {
    const expectedLength = condition;
    if (array.length !== expectedLength) throw new Error(error);
  } else {
    const minLength = 'min' in condition ? condition.min : 0;
    const maxLength = 'max' in condition ? condition.max : Infinity;
    if (array.length > maxLength || array.length < minLength) throw new Error(error);
  }
}
