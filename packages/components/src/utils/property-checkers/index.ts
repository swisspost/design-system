import { checkArrayOf } from '@/utils/property-checkers/check-array-of';
import { checkBetween } from './check-between';
import { checkDate } from './check-date';
import { checkGreaterThan } from './check-greater-than';
import { checkOneOf } from './check-one-of';
import { checkPattern } from './check-pattern';
import { checkType } from './check-type';
import { checkUrl } from './check-url';
import { emptyOr } from './empty-or';
import { requiredAnd } from './required-and';

export const checkEmptyOrOneOf = emptyOr(checkOneOf);
export const checkEmptyOrPattern = emptyOr(checkPattern);
export const checkEmptyOrType = emptyOr(checkType);
export const checkEmptyOrUrl = emptyOr(checkUrl);
export const checkEmptyOrArrayOf = emptyOr(checkArrayOf);
export const checkEmptyOrDate = emptyOr(checkDate);
export const checkEmptyOrGreaterThan = emptyOr(checkGreaterThan);
export const checkEmptyOrBetween = emptyOr(checkBetween);

export const checkRequiredAndOneOf = requiredAnd(checkOneOf);
export const checkRequiredAndPattern = requiredAnd(checkPattern);
export const checkRequiredAndType = requiredAnd(checkType);
export const checkRequiredAndUrl = requiredAnd(checkUrl);
export const checkRequiredAndArrayOf = requiredAnd(checkArrayOf);
export const checkRequiredAndGreaterThan = requiredAnd(checkGreaterThan);
export const checkRequiredAndBetween = requiredAnd(checkBetween);

export { checkIsoDate } from './check-iso-date';
