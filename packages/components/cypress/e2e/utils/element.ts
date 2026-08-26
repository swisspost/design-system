export function getBoundingRect(selector: string) {
  return cy
    .get(selector)
    .its(0)
    .then(element => element.getBoundingClientRect());
}
