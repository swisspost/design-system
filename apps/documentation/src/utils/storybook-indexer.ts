export function getTitleFromPath(path: string) {
  return path.split('/').at(-1);
}

export function getDocsPath(id: string) {
  const idWithoutSuffix = id.split('--')[0];
  return `/?path=/docs/${idWithoutSuffix}--docs`;
}
