import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { isNumber } from 'util';

@Injectable()
export class NgbDateCustomParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct {
    if (value) {
      const dateParts = value.trim().split('-');
      if (dateParts.length === 1 && isNumber(dateParts[0])) {
        return {day: parseInt(dateParts[0], 10), month: null, year: null};
      } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
        return {day: parseInt(dateParts[0], 10), month: parseInt(dateParts[1], 10), year: null};
      } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
        return {day: parseInt(dateParts[0], 10), month: parseInt(dateParts[1], 10), year: parseInt(dateParts[2], 10)};
      }
    }
    return null;
  }

  format(date: NgbDateStruct): string {
    return date ?
        `${isNumber(date.day) ? this.padNumber(date.day) : ''}/${isNumber(date.month) ? this.padNumber(date.month) : ''}/${date.year}` :
        '';
  }

  private padNumber(value: number): string {
    if (isNumber(value)) {
      return `0${value}`.slice(-2);
    } else {
      return '';
    }
  }
}
