import { Pipe, PipeTransform } from '@angular/core';
import babelParser from 'prettier/plugins/babel';
import htmlParser from 'prettier/plugins/html';
import prettier from 'prettier/standalone';
import { Observable, from, of } from 'rxjs';

@Pipe({
  name: 'formatCode'
})
export class FormatCodePipe implements PipeTransform {

  transform(value: string): Observable<string> {
    if (!value || !value.length) { return of(value); }
    return from(prettier.format(value, { parser: 'html', plugins: [htmlParser, babelParser], htmlWhitespaceSensitivity: 'ignore'}));
  }

}
