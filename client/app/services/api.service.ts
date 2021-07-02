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

  public async loadData(type, id = null, forcedVersion = null) {
    const version = forcedVersion === 'JP' || this.navService.getVersion() === 'JP' ? 'jp' : 'gl';

    return this.http.get('/api/' + version + '/' + type + (id ? '/' + id : ''))
      .map(response => {
        return response;
      })
      .catch(error => {
        return of(null);
      })
      .toPromise();
  }
}
