import { emptyOr } from './empty-or';
import { checkOneOf } from './check-one-of';
import { checkType } from './check-type';

export const checkEmptyOrOneOf = emptyOr(checkOneOf);
export const checkEmptyOrType = emptyOr(checkType);

export * from './check-non-empty';
export * from './check-one-of';
export * from './check-type';
