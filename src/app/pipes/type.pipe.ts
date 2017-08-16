import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'type'})
export class TypePipe implements PipeTransform {
  transform(items: any[], type: string): any {
    if (!items || !type) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter(item => item.type.indexOf(type) !== -1);
  }
}
