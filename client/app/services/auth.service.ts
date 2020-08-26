import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from 'angular-2-local-storage';

import { User } from "../entities/user";
import { NavService } from "./nav.service";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user = null;

  private userDataSubject = new BehaviorSubject<any[]>(this.user);
  $user = this.userDataSubject.asObservable();

  constructor(
    private fireauth: AngularFireAuth,
    private firestore: AngularFirestore,
    private localStorageService: LocalStorageService,
    private navService: NavService
  ) {
    this.fireauth.authState.subscribe(user => {
      this.updateUser(user)
    })
  }

  private updateUser(user, newLogin = false) {
    let result = null;

    if (user && this.user == null) {
      this.user = new User(user.displayName, user.email, user.uid);
      result = this.loadUserData(newLogin)
    } else if (user == null && this.user != null) {
      this.user = null
    }

    this.userDataSubject.next(this.user);
    return result
  }

  private loadUserData(newLogin = false) {
    return Promise.all(
      this.loadSavedData()
    ).then(responses => {
      let result = {
        syncPossible: true
      }

      for (let i = 0; i <= 11; i++) {
        // @ts-ignore
        if (responses[i].data.length > 0) {
          result.syncPossible = false
        }
      }

      if (!newLogin || !result.syncPossible) {
        for (let i = 0; i <= 11; i++) {
          let data = {}

          // @ts-ignore
          responses[i].data.forEach(item => {
            if (i == 5 || i == 11) {
              data = item
            } else if (i == 0 || i == 6) {
              data[item.name] = item
            } else {
              if (!data[item.dataId]) {
                data[item.dataId] = []
              }
              data[item.dataId].push(item)
            }
          })

          // @ts-ignore
          this.localStorageService.set(responses[i].type, data);
        }
      }

      return result
    })
  }

  private loadSavedData() {
    let promises = [];

    ['teams', 'units', 'espers', 'cards', 'equipments', 'guild', 'jp_teams', 'jp_units', 'jp_espers', 'jp_cards', 'jp_equipments', 'jp_guild'].forEach(type => {
      promises.push(new Promise((resolve, reject) => {
        this.firestore.collection(type, ref => ref.where('user', '==', this.user.uid)).valueChanges().subscribe(data => {
          resolve({
            type: type,
            data: data
          })
        })
      }))
    })

    return promises
  }

  private emptyLocalStorage() {
    ['teams', 'units', 'espers', 'cards', 'equipments', 'guild', 'jp_teams', 'jp_units', 'jp_espers', 'jp_cards', 'jp_equipments', 'jp_guild'].forEach(type => {
      this.localStorageService.remove(type)
    })
  }

  login(provider) {
    let authProvider = null

    switch (provider) {
      case "google":
        authProvider = new auth.GoogleAuthProvider()
        break;
      case "facebook":
        authProvider = new auth.FacebookAuthProvider()
        break;
      case "twitter":
        authProvider = new auth.TwitterAuthProvider()
        break;
      default:
        console.log("Not manage auth provider : " + provider)
        break;
    }

    return this.fireauth.signInWithPopup(authProvider).then(result => {
      let token = result.credential;

      return this.updateUser(result.user, true)
    }).catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      let email = error.email;
      let credential = error.credential;
      console.log(error)

      return null
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
      this.updateUser(null)
      this.emptyLocalStorage()
    }).catch(function(error) {});
  }

  getUser() {
    return this.user
  }

  firstSync() {
    let types = ['teams', 'units', 'espers', 'cards', 'equipments', 'guild', 'jp_teams', 'jp_units', 'jp_espers', 'jp_cards', 'jp_equipments', 'jp_guild']
    let promises = []

    types.forEach(type => {
      let data = this.localStorageService.get(type)

      if (type !== 'guild' && type !== 'jp_guild') {
        Object.keys(data).forEach(itemId => {
          data[itemId].customName = "1"
          data[itemId].user = this.user.uid

          promises.push(this.firestore.collection(type).add(data[itemId]))
        })
      } else {
        // @ts-ignore
        data.user = this.user.uid

        promises.push(this.firestore.collection(type).add(data))
      }
    })

    return Promise.all(
      promises
    ).then(responses => {
      console.log("FINISH SYNC")
      this.emptyLocalStorage()
      return this.loadUserData()
    })
  }

  getAvailableSync() {
    let data = {}
    let types = ['teams', 'units', 'espers', 'cards', 'equipments', 'guild', 'jp_teams', 'jp_units', 'jp_espers', 'jp_cards', 'jp_equipments', 'jp_guild']
    let promises = []

    types.forEach(type => {
      data[type] = this.localStorageService.get(type)
    })

    return data
  }
}
