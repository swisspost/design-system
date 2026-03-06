import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class SwissPostDateParserFormatter extends NgbDateParserFormatter {
  private static formatValue(value: string): NgbDateStruct {
    const dateParts = value.trim().split('.');
    if (dateParts.length === 1 && isNumber(dateParts[0])) {
      return { year: null, month: null, day: toInteger(dateParts[0]) };
    } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
      return { year: null, month: toInteger(dateParts[0]), day: toInteger(dateParts[1]) };
    } else if (
      dateParts.length === 3 &&
      isNumber(dateParts[0]) &&
      isNumber(dateParts[1]) &&
      isNumber(dateParts[2])
    ) {
      return {
        year: toInteger(dateParts[2]),
        month: toInteger(dateParts[1]),
        day: toInteger(dateParts[0]),
      };
    }
    return null;
  }

  parse(value: string): NgbDateStruct {
    if (value) {
      return SwissPostDateParserFormatter.formatValue(value);
    }
    return null;
  }

  format(date: NgbDateStruct): string {
    if (date) {
      const day = isNumber(date.day) ? padNumber(date.day) : '';
      const month = isNumber(date.month) ? padNumber(date.month) : '';
      return `${day}.${month}.${date.year}`;
    }
    return '';
  }
}

function toInteger(value: unknown): number {
  return parseInt(`${value}`, 10);
}
