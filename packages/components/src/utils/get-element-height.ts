/*
 * Copyright 2022 by Swiss Post, Information Technology
 */

export function getElementHeight(el: HTMLElement): string;
export function getElementHeight(el: HTMLElement, classWhenShown: string): string;
export function getElementHeight(el: HTMLElement, classesWhenShown: string[]): string;
export function getElementHeight(el: HTMLElement, classesWhenShown: any = []): string {
  if (!Array.isArray(classesWhenShown)) classesWhenShown = [classesWhenShown];

  const classesToAdd = classesWhenShown.filter(klass => !el.classList.contains(klass));
  if (classesToAdd.length) el.classList.add(...classesToAdd);

  const scrollHeight = el.scrollHeight;

  if (classesToAdd.length) el.classList.remove(...classesToAdd);

  return `${scrollHeight}px`;
}
