import { Component } from '@angular/core';
import { NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-options-modal',
  templateUrl: './searchOptionsModal.component.html',
  styleUrls: ['./searchOptionsModal.component.css']
})
export class SearchOptionsModalComponent {

  constructor(
    private modal: NgbActiveModal
  ) {
  }

  close() {
    this.modal.dismiss();
  }
}
