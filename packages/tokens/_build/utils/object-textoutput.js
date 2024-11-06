import { CUSTOM_FORMAT_INDENT } from '../constants.js';

export default function textoutput(
  obj = {},
  baseIndent = CUSTOM_FORMAT_INDENT,
  currentIndent = '',
) {
  const indent = `${baseIndent}${currentIndent}`;

  return Object.entries(obj).reduce((acc, [key, value]) => {
    let val;

    if (value instanceof Object) {
      val = `{${textoutput(value, baseIndent, indent)}\n${indent}}`;
    } else {
      try {
        val = JSON.parse(value);
      } catch (_) {
        val = `'${value}'`;
      }
    }

    return `${acc}\n${indent}'${key}': ${val},`;
  }, '');
}
