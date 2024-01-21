import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  getUsers(): Observable<any[]> {
    return this.firestore.collection('users').valueChanges();
  }

  searchUsersByName(name: string): Observable<any[]> {
    return this.firestore.collection('users', (ref) =>
      ref.where('displayName', '>=', name).where('displayName', '<=', name + '\uf8ff')
    ).valueChanges();
  }
}
