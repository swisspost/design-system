export function cloneElementWithSlots(element: HTMLElement): HTMLElement {
  const clone = element.cloneNode(true) as HTMLElement;
  const slots = clone.querySelectorAll('slot');

  element.querySelectorAll('slot').forEach((origin, index) => {
    const target = slots[index];

    origin.assignedElements().forEach(element => {
      target.insertAdjacentElement('beforebegin', element.cloneNode(true) as Element);
    });

    target.remove();
  });

  return clone;
}
