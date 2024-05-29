import { FunctionalComponent, h } from '@stencil/core';
import { tabbable } from 'tabbable';

let key = 0;

/**
 * Trap the focus inside a specific container by prepending/appending two focus trap
 * input boxes who return the focus into the container.
 *
 * @param props active: activate or deactivate the focus trap
 * @param children Child nodes
 * @returns
 */
export const FocusTrap: FunctionalComponent<{ active?: boolean }> = (props, children) => {
  // Default value for active is true
  const active = props.active ?? false;

  const handleFocusIn = (event: FocusEvent, mode: 'first' | 'last') => {
    if (children.length === 0) return;

    // Try to get a list of tabbable elements
    const containerIndex = mode === 'first' ? 0 : children.length - 1;
    const container = children[containerIndex].$elm$;
    const focusable = tabbable(container);

    if (focusable.length === 0) return;

    // We can trap the focus, cancel the event
    event.preventDefault();
    event.stopPropagation();

    // Select the appropriate element from the list
    const focusIndex = mode === 'first' ? 0 : focusable.length - 1;
    let focusElement = focusable[focusIndex];
    focusElement.focus();
  };

  key++;

  return [
    <input
      type="text"
      aria-hidden="true"
      class="visually-hidden"
      key={`focus-trap-before-${key}`}
      onFocusin={e => active && handleFocusIn(e, 'last')}
    />,
    children,
    <input
      type="text"
      aria-hidden="true"
      class="visually-hidden"
      key={`focus-trap-after-${key}`}
      onFocusin={e => active && handleFocusIn(e, 'first')}
    />,
  ];
};
