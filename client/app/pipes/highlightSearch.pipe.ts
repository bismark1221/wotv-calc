import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'highlight'})
export class HighlightSearchPipe implements PipeTransform {

  transform(text, searchText) {

    if (searchText == "" || text == "") {
      return text
    }

    text = text.replace(new RegExp(searchText, 'gi'), "#1$&#2")

    text = text.replace(new RegExp("(.*)(\#1)", 'gi'), "<span class='notHighlightSearch'>$1</span><span class='highlightSearch'>")

    text = text.replace(new RegExp("(\#2)(.*)", 'gi'), "</span><span class='notHighlightSearch'>$2</span>")

    return text
  }
}