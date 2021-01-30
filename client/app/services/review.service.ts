import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class ReviewService {
  private collections = {
    unit: 'review_units'
  };

  constructor(
    private firestore: AngularFirestore
  ) {}

  saveReview(review, type) {
    if (!review.storeId) {
      return this.firestore.collection(this.collections[type]).add(review).then(data => {
        // @ts-ignore
        return data.id;
      });
    } else {
      return this.firestore.collection(this.collections[type]).doc(review.storeId).set(review).then(data => {
        return null;
      });
    }
  }

  getStoredReviews(type) {
    return this.firestore.collection(this.collections[type]).valueChanges();
  }
}
