import { Pipe, PipeTransform } from '@angular/core';
import prettier from 'prettier';
import babelParser from 'prettier/parser-babel';
import htmlParser from 'prettier/parser-html';

@Pipe({
  name: 'formatCode'
})
export class FormatCodePipe implements PipeTransform {

  transform(value: string, parser: prettier.BuiltInParserName | prettier.CustomParser = 'html'): Promise<string> {
    if (!value || !value.length) { return Promise.resolve(value); }
    return prettier.format(value, { parser, plugins: [htmlParser as any, babelParser as any], htmlWhitespaceSensitivity: 'ignore' });
  }

}
