import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { NavService } from './nav.service';

@Injectable()
export class ApiService {
  constructor(
    private navService: NavService,
    private http: HttpClient
  ) {}

  public async get(type, param = null, extraQuery = [], forcedVersion = null) {
    const version = forcedVersion ? forcedVersion : this.navService.getVersion() === 'JP' ? 'jp' : 'gl';

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
      .pipe(
        map(response => {
          return response;
        })
      )
      .pipe(
        catchError(error => {
          console.error(error);
          return of(null);
        })
      )
      .toPromise();
  }

  public async post(type, data, forcedVersion = null) {
    const version = forcedVersion ? forcedVersion : this.navService.getVersion() === 'JP' ? 'jp' : 'gl';
    const uri = '/api/' + version + '/' + type;

    return this.http.post(
      uri,
      data
    )
    .pipe(
      map(response => {
        return response;
      })
    )
    .pipe(
      catchError(error => {
        console.error(error);
        return of(null);
      })
    )
    .toPromise();
  }

  public async delete(type, data) {
    const version = this.navService.getVersion() === 'JP' ? 'jp' : 'gl';
    const uri = '/api/' + version + '/' + type;

    return this.http.delete(
      uri,
      {
        body: data
      }
    )
    .pipe(
      map(response => {
        return response;
      })
    )
    .pipe(
      catchError(error => {
        console.error(error);
        return of(null);
      })
    )
    .toPromise();
  }
}
