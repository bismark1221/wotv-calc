import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';

import { User } from '../entities/user';
import { NavService } from './nav.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user = null;
  load = 0;
  initialLoad = false;

  private userDataSubject = new BehaviorSubject(this.user);
  $user = this.userDataSubject.asObservable();

  private loadDataSubject = new BehaviorSubject(this.load);
  $load = this.loadDataSubject.asObservable();

  constructor(
    private fireauth: AngularFireAuth,
    private firestore: AngularFirestore,
    private localStorageService: LocalStorageService,
    private navService: NavService
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
    return await Promise.all(
      this.loadSavedData()
    ).then(responses => {
      if (this.initialLoad) {
        const result = {
          syncPossible: true
        };

        const types = [
          'teams',
          'units',
          'espers',
          'cards',
          'equipments',
          'guild',
          'jp_teams',
          'jp_units',
          'jp_espers',
          'jp_cards',
          'jp_equipments',
          'jp_guild',
          'jp_masterRank',
          'masterRank',
          'jp_materia',
          'materia'
        ];

        for (let i = 0; i <= types.length - 1; i++) {
          // @ts-ignore
          if (responses[i].data.length > 0) {
            result.syncPossible = false;
          }
        }

        if (result.syncPossible) {
          let localDataFound = false;

          types.forEach(type => {
            const savedData = this.localStorageService.get(type);
            if (savedData && Object.keys(savedData).length > 0) {
              localDataFound = true;
            }
          });

          if (!localDataFound) {
            result.syncPossible = false;
          }
        }

        if (!newLogin || !result.syncPossible) {
          for (let i = 0; i <= types.length - 1; i++) {
            let data = {};

            // @ts-ignore
            responses[i].data.forEach(item => {
              if (i === 5 || i === 11 || i === 12 || i === 13) {
                data = item;
              } else if (i === 0 || i === 6) {
                data[item.name] = item;
              } else {
                if (!data[item.dataId]) {
                  data[item.dataId] = [];
                }
                data[item.dataId].push(item);
              }
            });

            // @ts-ignore
            this.localStorageService.set(responses[i].type, data);
          }

          this.load++;
          this.loadDataSubject.next(this.load);
        }

        return result;
      }
    });
  }

  private loadSavedData() {
    const promises = [];

    ['teams', 'units', 'espers', 'cards', 'equipments', 'guild', 'jp_teams', 'jp_units', 'jp_espers', 'jp_cards', 'jp_equipments', 'jp_guild', 'jp_masterRank', 'masterRank', 'jp_materia', 'materia'].forEach(type => {
      promises.push(new Promise((resolve, reject) => {
        this.firestore.collection(type, ref => ref.where('user', '==', this.user.uid)).snapshotChanges().subscribe(data => {
          const items = [];

          data.forEach(item => {
            const itemData = item.payload.doc.data();
            // @ts-ignore
            itemData.storeId = item.payload.doc.id;
            items.push(itemData);
          });

          resolve({
            type: type,
            data: items
          });
        });
      }));
    });

    return promises;
  }

  private emptyLocalStorage() {
    ['teams', 'units', 'espers', 'cards', 'equipments', 'guild', 'jp_teams', 'jp_units', 'jp_espers', 'jp_cards', 'jp_equipments', 'jp_guild', 'jp_masterRank', 'masterRank', 'jp_materia', 'materia'].forEach(type => {
      this.localStorageService.remove(type);
    });

    this.load++;
    this.loadDataSubject.next(this.load);
  }

  login(provider) {
    let authProvider = null;

    switch (provider) {
      case 'google':
        authProvider = new auth.GoogleAuthProvider();
        break;
      case 'facebook':
        authProvider = new auth.FacebookAuthProvider();
        break;
      case 'twitter':
        authProvider = new auth.TwitterAuthProvider();
        break;
      default:
        console.log('Not manage auth provider : ' + provider);
        break;
    }

    return this.fireauth.signInWithPopup(authProvider).then(result => {
      const token = result.credential;

      return this.updateUser(result.user, true);
    }).catch(function(error) {
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
    }).catch(function(error) {});
  }

  getUser() {
    return this.user;
  }

  firstSync() {
    const types = ['teams', 'units', 'espers', 'cards', 'equipments', 'guild', 'jp_teams', 'jp_units', 'jp_espers', 'jp_cards', 'jp_equipments', 'jp_guild', 'jp_masterRank', 'masterRank', 'materia', 'jp_materia'];
    const promises = [];

    types.forEach(type => {
      const data = this.localStorageService.get(type);
      if (data && Object.keys(data).length > 0) {
        if (type !== 'guild' && type !== 'jp_guild' && type !== 'jp_masterRank' && type !== 'masterRank') {
          Object.keys(data).forEach(itemId => {
            data[itemId].customName = '1';
            data[itemId].user = this.user.uid;

            promises.push(this.firestore.collection(type).add(data[itemId]));
          });
        } else {
          // @ts-ignore
          data.user = this.user.uid;

          promises.push(this.firestore.collection(type).add(data));
        }
      }
    });

    return Promise.all(
      promises
    ).then(responses => {
      this.emptyLocalStorage();
      return this.loadUserData();
    });
  }

  getAvailableSync() {
    const data = {};
    const types = ['teams', 'units', 'espers', 'cards', 'equipments', 'guild', 'jp_teams', 'jp_units', 'jp_espers', 'jp_cards', 'jp_equipments', 'jp_guild', 'jp_masterRank', 'masterRank', 'materia', 'jp_materia'];
    const promises = [];

    types.forEach(type => {
      data[type] = this.localStorageService.get(type);
    });

    return data;
  }

  getIlluminty() {
    return new Promise((resolve, reject) => {
      this.firestore.collection('illuminati', ref => ref.where('userId', '==', this.user.uid)).snapshotChanges().subscribe(data => {
        resolve(data.length > 0);
      });
    });
  }
}
