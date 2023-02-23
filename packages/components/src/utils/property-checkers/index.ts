/*
 * Copyright 2023 by Swiss Post, Information Technology
 */

import { emptyOr } from './empty-or';
import { checkOneOf } from './check-one-of';
import { checkType } from './check-type';

export const checkEmptyOrOneOf = emptyOr(checkOneOf);
export const checkEmptyOrType = emptyOr(checkType);

export * from './check-one-of';
export * from './check-type';
