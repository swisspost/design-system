import { CUSTOM_FORMAT_INDENT } from '../constants.js';

export default function textoutput(
  obj = {},
  baseIndent = CUSTOM_FORMAT_INDENT,
  currentIndent = '',
) {
  const indent = `${baseIndent}${currentIndent}`;
  const stringifyKeys = Object.keys(obj).some(key => !key.match(/^[a-zA-Z0-9]+$/));

  return Object.entries(obj).reduce((acc, [key, value]) => {
    let val;

    if (stringifyKeys) key = `'${key}'`;

    if (value instanceof Object) {
      val = `{${textoutput(value, baseIndent, indent)}\n${indent}}`;
    } else {
      try {
        val = JSON.parse(value);
      } catch (_) {
        val = `'${value}'`;
      }
    }

    return `${acc}\n${indent}${key}: ${val},`;
  }, '');
}
