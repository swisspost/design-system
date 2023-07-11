import { Pipe, PipeTransform } from '@angular/core';
import babelParser from 'prettier/parser-babel';
import htmlParser from 'prettier/parser-html';
import prettier from 'prettier/standalone';
import { Observable, from, of } from 'rxjs';

@Pipe({
  name: 'formatCode'
})
export class FormatCodePipe implements PipeTransform {

  transform(value: string): Observable<string> {
    if (!value || !value.length) { return of(value); }
    return from(prettier.format(value, { parser: 'html', plugins: [htmlParser as any, babelParser as any], htmlWhitespaceSensitivity: 'ignore' }));
  }

}
