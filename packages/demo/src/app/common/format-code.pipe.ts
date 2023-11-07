import { Pipe, PipeTransform } from '@angular/core';
import prettier from 'prettier';
import htmlParser from 'prettier/parser-html';
import babelParser from 'prettier/parser-babel';

@Pipe({
  name: 'formatCode',
})
export class FormatCodePipe implements PipeTransform {
  transform(
    value: string,
    parser: prettier.BuiltInParserName | prettier.CustomParser = 'html',
  ): string {
    if (!value || !value.length) {
      return value;
    }
    return prettier.format(value, {
      parser,
      plugins: [htmlParser, babelParser],
      htmlWhitespaceSensitivity: 'ignore',
    });
  }
}
