import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  getUser(uid: string) {
    return this.firestore.collection('users').doc(uid).valueChanges({ idField: 'id' }) as Observable<any>; // Asegúrate de importar Observable
  }

  createUser(uid: string, userData: any) {
    return this.firestore.collection('users').doc(uid).set(userData);
  }

  updateUserBalance(uid: string, newBalance: number) {
    return this.firestore.collection('users').doc(uid).update({ balance: newBalance });
  }
}
