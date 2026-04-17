export function removeEmptyAttrs(serialized: string, originalNodeText: string): string {
  console.log('console log', originalNodeText, serialized);

  if (originalNodeText.includes('=""')) return serialized;

  return serialized.replaceAll('=""', '');
}
