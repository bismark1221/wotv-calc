import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class SessionService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  get(key) {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(key);
    }

    return null;
  }

  set(key, value) {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(key, value);
    }
  }
}
