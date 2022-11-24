import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

@Component({
  selector: 'app-shared-pwaUpdateModal',
  templateUrl: './shared.pwaUpdateModal.component.html',
  styleUrls: ['./shared.pwaUpdateModal.component.css']
})
export class SharedPwaUpdateModalComponent extends SimpleModalComponent<null, null> {
  firstClickOutside = false;

  constructor() {
    super();
  }

  closeClickOuside() {
    if (!this.firstClickOutside) {
      this.firstClickOutside = true;
    } else {
      this.close();
    }
  }

  updateApp() {
    document.location.reload();
  }
}
