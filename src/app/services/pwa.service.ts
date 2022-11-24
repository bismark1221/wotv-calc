import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { SimpleModalService } from 'ngx-simple-modal';

import { filter } from 'rxjs';

import { SharedPwaUpdateModalComponent } from '../shared/pwaUpdateModal/shared.pwaUpdateModal.component';

@Injectable()
export class PwaService {

  constructor(
    private swUpdate: SwUpdate,
    private simpleModalService: SimpleModalService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.swUpdate.unrecoverable.subscribe(event => {
        this.simpleModalService.addModal(SharedPwaUpdateModalComponent);
      });

      this.swUpdate.versionUpdates
        .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
        .subscribe(evt => {
          this.simpleModalService.addModal(SharedPwaUpdateModalComponent);
        });
    }
  }
}
