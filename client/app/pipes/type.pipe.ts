import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'type',
  pure: false
})
export class TypePipe implements PipeTransform {
  transform(items: any[], type: string): any {
    if (!items || !type) {
      return items;
    }
    return items.filter(item => item.type.indexOf(type) !== -1);
  }
}
