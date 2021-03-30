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

  private versions = ['jp', 'gl'];
  private dataTypes = [
    'cards',
    'equipments',
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

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) {}

  public async initHashCheck(frequency = 1000 * 60 * 10) {
    return await this.checkHash();

    setInterval(async () => {
      await this.checkHash();
    }, frequency);
  }

  public getLaunchedRequest() {
    if (this.launchedRequest === null) {
      return of(null).toPromise();
    } else {
      return this.launchedRequest;
    }
  }

  private checkHash() {
    if (this.launchedRequest === null) {
      this.launchedRequest = this.http.get('/assets/version.json?t=' + new Date().getTime())
        .map(async response => {
          await this.checkLastDownloadVersion(response);

          if (this.hasHashChanged(this.currentHash, response)) {
            location.reload();
          }

          return true;
        })
        .catch(async (err, caught) => {
          await this.checkLastDownloadVersion();
          console.error(err, 'Could not get version');
          return of(false);
        })
        .toPromise();
    }

    return this.launchedRequest;
  }

  private hasHashChanged(currentHash, response) {
    if (!response.hash) {
      return false;
    }

    return currentHash !== response.hash;
  }

  private async checkLastDownloadVersion(response = null) {
    const savedVersion = this.localStorageService.get('dataVersion') ? this.localStorageService.get('dataVersion') : null;

    for (const version of this.versions) {
      for (const dataType of this.dataTypes) {
        if (!savedVersion
          || !savedVersion[version]
          || !savedVersion[version][dataType]
          || savedVersion[version][dataType] !== response[version][dataType]
        ) {
          try {
            const cache = await caches.open('wotv-calc');
            await cache.delete(this.getLocalStorage(version, dataType));
          } catch (error) {
            // Nothing to do...
          }
        }
      }
    }

    this.localStorageService.set('dataVersion', response);
  }

  private getLocalStorage(version, type) {
    return '/' + version + '_data_' + type;
  }
}
