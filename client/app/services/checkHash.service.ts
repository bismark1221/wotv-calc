import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';

import { of } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { catchError, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class CheckHashService {
  // Replaced by post-build.js
  private currentHash = '{{POST_BUILD_ENTERS_HASH_HERE}}';
  private launchedRequest = null;

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) {}

  public async initHashCheck(url, frequency = 1000 * 60 * 10) {
    return await this.checkHash(url);

    setInterval(async () => {
      await this.checkHash(url);
    }, frequency);
  }

  public getLaunchedRequest() {
    if (this.launchedRequest === null) {
      return of(null).toPromise();
    } else {
      return this.launchedRequest;
    }
  }

  private checkHash(url) {
    if (this.launchedRequest === null) {
      this.launchedRequest = this.http.get(url + '?t=' + new Date().getTime())
        .map(response => {
          // @ts-ignore
          const hash = response.hash;

          this.checkLastDownloadVersion(hash);

          if (this.hasHashChanged(this.currentHash, hash)) {
            location.reload();
          }

          return true;
        })
        .catch((err, caught) => {
          this.checkLastDownloadVersion('error_to_get_version_' + new Date().getDate() + '_' + (new Date().getMonth() + 1));
          console.error(err, 'Could not get version');
          return of(false);
        })
        .toPromise();
    }

    return this.launchedRequest;
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
      this.removeAllData();
      this.localStorageService.set('dataVersion', currentHash);
    }
  }

  private getLocalStorage(version, type) {
    return version + '_data_' + type;
  }

  private removeAllData() {
    const versions = ['jp', 'gl'];
    const dataTypes = [
      'cards',
      'equipements',
      'espers',
      'guildTitles',
      'index',
      'items',
      'jobs',
      'masterRanks',
      'playerTitles',
      'quests',
      'raids',
      'units'
    ];

    versions.forEach(version => {
      dataTypes.forEach(dataType => {
        this.localStorageService.remove(this.getLocalStorage(version, dataType));
      });
    });
  }
}
