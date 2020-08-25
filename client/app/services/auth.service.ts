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
  user: any;

  private userDataSubject = new BehaviorSubject<any[]>(this.user);
  $user = this.userDataSubject.asObservable();

  constructor(
    private fireauth: AngularFireAuth,
    private firestore: AngularFirestore,
    private localStorageService: LocalStorageService,
    private navService: NavService
  ) {
    this.fireauth.authState.subscribe(user => {
      console.log("-------")
      this.updateUser(user)
    })
  }

  private updateUser(user, newLogin = false) {
    let result = null;

    if (user) {
      console.log("barr : " + newLogin)
      console.log(user)
      this.user = new User(user.displayName, user.email, user.uid);
      result = this.loadUserData(newLogin)
    } else {
      this.user = null
    }

    this.userDataSubject.next(this.user);

    return result
  }

  private loadUserData(newLogin = false) {
    console.log("LOAD USER DATA : " + newLogin)
    return Promise.all(
      this.loadSavedData(newLogin)
    ).then(responses => {
      let result = {
        syncNotPossible: false
      }

      for (let i = 0; i <= 11; i++) {
        if (responses[i].data.length > 0) {
          result.syncNotPossible = true
        }
      }

      console.log("newLogin : " + newLogin)
      console.log("result.syncNotPossible : " + result.syncNotPossible)

      if (!newLogin || result.syncNotPossible) {
        console.log("SAVE TO LOCAL")
        for (let i = 0; i <= 11; i++) {
          this.localStorageService.set(responses[i].type, responses[i].data);
        }
      } else {
        console.log("ASK TO INITIATE SYNC ?")
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

      this.updateUser(result.user, true)

      return this.user;
    }).catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      let email = error.email;
      let credential = error.credential;
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
    return this.fireauth.signOut().then(() => {
      this.updateUser(null)
      this.emptyLocalStorage()
    }).catch(function(error) {});
  }

  getUser() {
    return this.user
  }

  firstSync() {

  }
}
