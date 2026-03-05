type NonUndefined<T> = T extends undefined ? never : T;

export function definedProperties(properties: Record<string, unknown>): Record<string, NonUndefined<unknown>> {
  return Object.fromEntries(
    Object.entries(properties).filter(([_, value]) => typeof value !== 'undefined')
  );
}
