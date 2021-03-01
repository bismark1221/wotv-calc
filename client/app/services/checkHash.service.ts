import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CheckHashService {
  // Replaced by post-build.js
  private currentHash = '{{POST_BUILD_ENTERS_HASH_HERE}}';

  /*
    Save Hash in local storage to know if new data are available
    - save hash
    - save data in LS
    - if hash change re-download data
  */

  constructor(private http: HttpClient) {}

  public initHashCheck(url, frequency = 1000 * 60 * 10) {
    setInterval(() => {
      this.checkHash(url);
    }, frequency);
  }

  private checkHash(url) {
    this.http.get(url + '?t=' + new Date().getTime())
      .subscribe(
        (response: any) => {
          const hash = response.hash;
          const hashChanged = this.hasHashChanged(this.currentHash, hash);

          if (hashChanged) {
            location.reload();
          }
        },
        (err) => {
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
}
