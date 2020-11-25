import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'roundDown'})
export class RoundDownPipe implements PipeTransform {

  transform(value: number): number {
    return Math.floor(value);
  }
}
