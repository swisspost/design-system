/**
 * Yields the bounding rectangle of the element matched by `selector`.
 */
export function getBoundingRect(selector: string) {
  return cy
    .get(selector)
    .its(0)
    .then(element => element.getBoundingClientRect());
}
