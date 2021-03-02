import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';

import { DataService } from './data.service';

@Injectable()
export class CheckHashService {
  // Replaced by post-build.js
  private currentHash = '{{POST_BUILD_ENTERS_HASH_HERE}}';

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient,
    private dataService: DataService
  ) {}

  public initHashCheck(url, frequency = 1000 * 60 * 10) {
    this.checkHash(url);

    setInterval(() => {
      this.checkHash(url);
    }, frequency);
  }

  private checkHash(url) {
    this.http.get(url + '?t=' + new Date().getTime())
      .subscribe(
        (response: any) => {
          const hash = response.hash;

          this.checkLastDownloadVersion(hash);

          if (this.hasHashChanged(this.currentHash, hash)) {
            location.reload();
          }
        },
        (err) => {
          this.checkLastDownloadVersion('error_to_get_version');
          console.error(err, 'Could not get version');
        }
      );
  }

  private hasHashChanged(currentHash, newHash) {
    if (!newHash) {
      return false;
    }

    return currentHash !== newHash;
  }

  private checkLastDownloadVersion(currentHash) {
    const savedVersion = this.localStorageService.get('dataVersion') ? this.localStorageService.get('dataVersion').toString() : null;

    if (!savedVersion || currentHash !== savedVersion) {
      this.dataService.removeAll();
      this.localStorageService.set('dataVersion', currentHash);
    }
  }
}
