import { Injectable } from '@angular/core';

import { BehaviorSubject } from "rxjs";

@Injectable()
export class NavService {
  menuDisabled = false;

  private menuDataSubject = new BehaviorSubject<boolean>(this.menuDisabled);
  $menuDisabled = this.menuDataSubject.asObservable();

  updateMenu(status: boolean) {
    this.menuDisabled = status;
    this.menuDataSubject.next(this.menuDisabled);
  }
}
