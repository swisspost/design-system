import { CUSTOM_FORMAT_INDENT } from '../constants.js';

type NestedObject = {
  [key: string]: string | number | boolean | NestedObject;
};

export default function textoutput(
  obj: NestedObject = {},
  baseIndent: string = CUSTOM_FORMAT_INDENT,
  currentIndent: string = '',
): string {
  const indent = `${baseIndent}${currentIndent}`;
  const stringifyKeys = Object.keys(obj).some(key => !key.match(/^[a-zA-Z0-9]+$/));

  return Object.entries(obj).reduce((acc, [key, value]) => {
    let val;

    if (stringifyKeys) key = `'${key}'`;

    if (value instanceof Object) {
      val = `{${textoutput(value, baseIndent, indent)}\n${indent}}`;
    } else {
      try {
        val = JSON.parse(value as string);
      } catch {
        val = `'${value}'`;
      }
    }

    return `${acc}\n${indent}${key}: ${val},`;
  }, '');
}
