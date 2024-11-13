import { emptyOr } from './empty-or';
import { checkOneOf } from './check-one-of';
import { checkPattern } from './check-pattern';
import { checkType } from './check-type';
import { checkUrl } from './check-url';

export const checkEmptyOrOneOf = emptyOr(checkOneOf);
export const checkEmptyOrPattern = emptyOr(checkPattern);
export const checkEmptyOrType = emptyOr(checkType);
export const checkEmptyOrUrl = emptyOr(checkUrl);

export * from './check-non-empty';
export * from './check-one-of';
export * from './check-pattern';
export * from './check-type';
export * from './check-url';
