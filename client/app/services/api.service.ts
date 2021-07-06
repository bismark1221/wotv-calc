import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';

import { NavService } from './nav.service';

@Injectable()
export class ApiService {
  constructor(
    private navService: NavService,
    private http: HttpClient
  ) {}

  public async loadData(type, param = null, extraQuery = [], forcedVersion = null) {
    const version = forcedVersion === 'JP' || this.navService.getVersion() === 'JP' ? 'jp' : 'gl';

    let uri = '/api/' + version + '/' + type + (param ? '/' + param : '');

    if (extraQuery.length > 0) {
      uri += '?';

      extraQuery.forEach((query, queryIndex) => {
        if (queryIndex > 0) {
          uri += '&';
        }

        uri += query.name + '=' + query.value;
      });
    }

    return this.http.get(uri)
      .map(response => {
        return response;
      })
      .catch(error => {
        return of(null);
      })
      .toPromise();
  }
}
