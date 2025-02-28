export function getAttributeObserver(
  attribute: string,
  handler: (element: HTMLElement, mutation?: MutationRecord) => void,
) {
  /**
   * Handle attribute changes and childList changes from the observer
   * @param {MutationRecord[]} mutationList
   */
  function observerHandler(mutationList: MutationRecord[]) {
    mutationList.forEach(mutation => {
      if (mutation.type === 'attributes' && mutation.attributeName === attribute) {
        handler(mutation.target as HTMLElement);
      }

      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (
            node.nodeType === Node.ELEMENT_NODE &&
            (node as HTMLElement).hasAttribute(attribute)
          ) {
            handler(node as HTMLElement);
          }
        });
      }
    });
  }

  // Initialize a mutation observer for patching accessibility features
  return new MutationObserver(observerHandler);
}
