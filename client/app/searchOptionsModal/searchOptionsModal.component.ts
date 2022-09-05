import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

@Component({
  selector: 'app-search-options-modal',
  templateUrl: './searchOptionsModal.component.html',
  styleUrls: ['./searchOptionsModal.component.css']
})
export class SearchOptionsModalComponent extends SimpleModalComponent<null, null> {

  constructor(
  ) {
    super();
  }
}
