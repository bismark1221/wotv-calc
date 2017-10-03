import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'absolute'})
export class AbsolutePipe implements PipeTransform {
  transform(value:any) {
    if (!value) {
      return 0;
    }

    return Math.abs(value);
  }
}
