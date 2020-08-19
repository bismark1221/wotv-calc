import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

import { User } from "../entities/user";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: any;

  constructor(
    public fireauth: AngularFireAuth
  ) {
    this.fireauth.authState.subscribe(user => {
      if (user) {
        this.user = new User(user.displayName, user.email, user.uid);

        console.log("NEW AUTH USER")
        console.log(this.user)
        console.log("----")
      }
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

    return this.fireauth.signInWithPopup(authProvider).then(function(result) {
      let token = result.credential;


      let user = new User(result.user.displayName, result.user.email, result.user.uid)

      console.log(result)
      console.log(token)
      console.log(result.user)
      console.log(user)

      return user;

      // localStorage.setItem('user', JSON.stringify(this.user));

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
      localStorage.removeItem('user');
    }).catch(function(error) {
      // An error happened.
    });
  }

  getUser() {
    return this.user
  }

}
