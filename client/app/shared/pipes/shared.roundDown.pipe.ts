import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'roundDown'})
export class SharedRoundDownPipe implements PipeTransform {

  transform(value: number): number {
    return Math.floor(value);
  }
}
