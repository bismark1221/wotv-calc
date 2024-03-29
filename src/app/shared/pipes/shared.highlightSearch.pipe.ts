import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'highlight'})
export class SharedHighlightSearchPipe implements PipeTransform {

  transform(text, searchText) {

    if (searchText === '' || text === '') {
      return text;
    }

    if (searchText) {
      searchText = searchText.replace(/[()]/g, '');
    }

    text = text.replace(new RegExp(searchText, 'gi'), '</span><span class=\'highlightSearch\'>$&</span><span class=\'notHighlightSearch\'>');
    text = '<span class=\'notHighlightSearch\'>' + text + '</span>';

    return text;
  }
}
