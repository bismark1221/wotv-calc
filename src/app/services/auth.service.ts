import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { User } from '../entities/user';
import { NavService } from './nav.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user = null;
  load = 0;
  initialLoad = false;

  versions = ['gl', 'jp'];
  types = ['teams', 'units', 'espers', 'cards', 'equipments', 'guild', 'masterRank', 'materia'];

  private userDataSubject = new BehaviorSubject(this.user);
  $user = this.userDataSubject.asObservable();

  private loadDataSubject = new BehaviorSubject(this.load);
  $load = this.loadDataSubject.asObservable();

  constructor(
    private fireauth: AngularFireAuth,
    private navService: NavService,
    private apiService: ApiService
  ) {
    this.fireauth.authState.subscribe(user => {
      this.updateUser(user);
    });
  }

  private async updateUser(user, newLogin = false) {
    let result = null;

    if (user && (this.user === null || this.user === undefined)) {
      this.user = new User(user.displayName, user.email, user.uid);
      this.initialLoad = true;
      result = await this.loadUserData(newLogin);
      this.initialLoad = false;
    } else if (user === null && (this.user !== null || this.user === undefined)) {
      this.user = null;
    }


    this.userDataSubject.next(this.user);
    return result;
  }

  private async loadUserData(newLogin = false) {
    const apiResult = await this.loadSavedData();

    if (this.initialLoad) {
      const result = {
        syncPossible: true
      };

      for (const version of this.versions) {
        for (const type of this.types) {
          if (apiResult[version][type].length > 0) {
            result.syncPossible = false;
          }
        }
      }

      if (result.syncPossible) {
        let localDataFound = false;

        for (const version of this.versions) {
          for (const type of this.types) {
            const savedData = localStorage.getItem('wotv-calc.' + (version === 'jp' ? 'jp_' : '') + type);
            if (savedData && Object.keys(JSON.parse(savedData)).length > 0) {
              localDataFound = true;
            }
          }
        }

        if (!localDataFound) {
          result.syncPossible = false;
        }
      }

      if (!newLogin || !result.syncPossible) {
        for (const version of this.versions) {
          for (const type of this.types) {
            let data = {};
            for (const item of apiResult[version][type]) {
              if (type === 'guild' || type === 'masterRank') {
                data = item;
              } else if (type === 'teams') {
                data[item.name] = item;
              } else {
                if (!data[item.dataId]) {
                  data[item.dataId] = [];
                }
                data[item.dataId].push(item);
              }
            }

            localStorage.setItem('wotv-calc.' + (version === 'jp' ? 'jp_' : '') + type, JSON.stringify(data));
          }
        }

        this.load++;
        this.loadDataSubject.next(this.load);
      }

      return result;
    }
  }

  private async getApiUser(apiCall, type, version, extra = null) {
    switch (apiCall) {
      case 'get':
        extra.push({name: 'type', value: type});
        return JSON.parse(JSON.stringify(await this.apiService.get('userData', null, extra, version)));
      break;
      case 'post':
        return JSON.parse(JSON.stringify(await this.apiService.post('userData', {type: type, data: extra}, version)));
      break;
      default:
      break;
    }

    return null;
  }

  private async loadSavedData() {
    const result = {};

    for (const version of this.versions) {
      result[version] = {};
      for (const type of this.types) {
        result[version][type] = await this.getApiUser('get', type, version, [{name: 'user', value: this.user.uid}]);
      }
    }

    return result;
  }

  private emptyLocalStorage() {
    for (const version of this.versions) {
      for (const type of this.types) {
        localStorage.removeItem('wotv-calc.' + (version === 'jp' ? 'jp_' : '') + type);
      }
    }

    this.load++;
    this.loadDataSubject.next(this.load);
  }

  login(provider) {
    let authProvider = null;

    switch (provider) {
      case 'google':
        authProvider = new firebase.auth.GoogleAuthProvider();
        break;
      case 'facebook':
        authProvider = new firebase.auth.FacebookAuthProvider();
        break;
      case 'twitter':
        authProvider = new firebase.auth.TwitterAuthProvider();
        break;
      default:
        console.log('Not manage auth provider : ' + provider);
        break;
    }

    return this.fireauth.signInWithPopup(authProvider).then(result => {
      const token = result.credential;

      return this.updateUser(result.user, true);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;

      console.error(error);

      return null;
    });

    /*
      firebase.signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    */
  }

  logout() {
    return this.fireauth.signOut().then(result => {
      this.updateUser(null);
      this.emptyLocalStorage();
    }).catch((error) => {});
  }

  getUser() {
    return this.user;
  }

  async firstSync() {
    const promises = [];

    for (const version of this.versions) {
      for (const type of this.types) {
        let data = localStorage.getItem('wotv-calc.' + (version === 'jp' ? 'jp_' : '') + type);
        if (data && Object.keys(JSON.parse(data)).length > 0) {
          data = JSON.parse(data);
          if (type !== 'guild' && type !== 'masterRank') {
            for (const itemId of Object.keys(data)) {
              data[itemId].customName = '1';
              data[itemId].user = this.user.uid;

              await this.getApiUser('post', type, version, data[itemId]);
            }
          } else {
            // @ts-ignore
            data.user = this.user.uid;

            await this.getApiUser('post', type, version, data);
          }
        }
      }
    }

    this.emptyLocalStorage();
    return await this.loadUserData();
  }

  getAvailableSync() {
    const data = {};
    const types = ['teams', 'units', 'espers', 'cards', 'equipments', 'guild', 'jp_teams', 'jp_units', 'jp_espers', 'jp_cards', 'jp_equipments', 'jp_guild', 'jp_masterRank', 'masterRank', 'materia', 'jp_materia'];
    const promises = [];

    types.forEach(type => {
      data[type] = localStorage.getItem('wotv-calc.' + type);
    });

    return data;
  }
}
