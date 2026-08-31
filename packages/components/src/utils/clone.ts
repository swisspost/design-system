/**
 * Deep clones an element and flattens its slots into the clone.
 */
export function cloneElementWithSlots(element: HTMLElement): HTMLElement {
  const clone = element.cloneNode(true) as HTMLElement;
  const slots = clone.querySelectorAll('slot');

  element.querySelectorAll('slot').forEach((source, index) => {
    const target = slots[index];

    // Insert the assigned elements where the slot used to be, then drop the now empty slot
    source.assignedElements().forEach(element => {
      target.insertAdjacentElement('beforebegin', element.cloneNode(true) as Element);
    });

    target.remove();
  });

  return clone;
}
