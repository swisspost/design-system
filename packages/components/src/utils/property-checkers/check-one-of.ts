/*
 * Copyright 2023 by Swiss Post, Information Technology
 */

export function checkOneOf<T>(value: T, possibleValues: T[], errorMessage: string) {
  if (!possibleValues.includes(value)) throw new Error(errorMessage);
}
