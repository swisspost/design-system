export function definedProperties(properties: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(properties).filter(([_, value]) => typeof value !== 'undefined')
  );
}
