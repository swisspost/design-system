export function getElementHeight(el: HTMLElement): number;
export function getElementHeight(el: HTMLElement, classWhenShown: string): number;
export function getElementHeight(el: HTMLElement, classesWhenShown: string[]): number;
export function getElementHeight(el: HTMLElement, classesWhenShown: string | string[] = []): number {
  if (!Array.isArray(classesWhenShown)) classesWhenShown = [classesWhenShown];

  const classesToAdd = classesWhenShown.filter(klass => !el.classList.contains(klass));
  if (classesToAdd.length) el.classList.add(...classesToAdd);

  const scrollHeight = el.scrollHeight;

  if (classesToAdd.length) el.classList.remove(...classesToAdd);

  return scrollHeight;
}
