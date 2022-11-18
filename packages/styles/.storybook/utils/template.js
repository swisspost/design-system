export function processAttributes (attribute) {
  return [].concat(attribute)
    .reduce((values, value) => values.concat(typeof value === 'object' ? Object.entries(value).filter(([_key, value]) => value === true).map(([key, _value]) => key) : value), [])
    .join(' ');
}

export function processContent (sourceString, args) {
  return [].concat(sourceString.match(/{{[^}}]+}}/g))
    .reduce((distString, match) => distString.replace(match, eval(match)), sourceString) ?? sourceString;
}