export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export function formatPropValueList (values: string[], allowAllValues: boolean = false) {
  let valueList = values;
  
  if (!allowAllValues) valueList = valueList.filter(v => typeof v === 'string' && v !== '');

  return valueList
    .map(v => `<code>${v}</code>`)
    .join(', ')
    .replace(/,(?=[^,]*$)/, ' or')
}