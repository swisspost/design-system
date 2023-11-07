import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'replaceHyphen' })
export class ReplaceHyphenPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace('-', ' ');
  }
}
@Pipe({ name: 'removeSpaces' })
export class RemoveSpacesPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(' ', '');
  }
}
