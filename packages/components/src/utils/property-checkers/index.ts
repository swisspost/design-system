import { requiredAnd } from './required-and';
import { checkOneOf } from './check-one-of';
import { checkPattern } from './check-pattern';
import { checkType } from './check-type';
import { checkUrl } from './check-url';
import { emptyOr } from './empty-or';
import { checkArrayOf } from '@/utils/property-checkers/check-array-of';

export const checkEmptyOrOneOf = emptyOr(checkOneOf);
export const checkEmptyOrPattern = emptyOr(checkPattern);
export const checkEmptyOrType = emptyOr(checkType);
export const checkEmptyOrUrl = emptyOr(checkUrl);
export const checkEmptyOrArrayOf = emptyOr(checkArrayOf);

export const checkRequiredAndOneOf = requiredAnd(checkOneOf);
export const checkRequiredAndPattern = requiredAnd(checkPattern);
export const checkRequiredAndType = requiredAnd(checkType);
export const checkRequiredAndUrl = requiredAnd(checkUrl);
export const checkRequiredAndArrayOf = requiredAnd(checkArrayOf);
