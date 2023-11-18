import { Component } from '@angular/core';
import { NgxModalComponent } from 'ngx-modalview';

@Component({
  selector: 'app-shared-pwaUpdateModal',
  templateUrl: './shared.pwaUpdateModal.component.html',
  styleUrls: ['./shared.pwaUpdateModal.component.css']
})
export class SharedPwaUpdateModalComponent extends NgxModalComponent<null, null> {
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
