// transaction.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

interface TransactionData {
  senderUid: string;
  receiverUid: string;
  amount: number;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private firestore: AngularFirestore) {}

  transferFunds(senderUid: string, receiverUid: string, amount: number): Observable<void> {
    const transaction$ = this.firestore.firestore.runTransaction(async (transaction) => {
      const senderDocRef = this.firestore.collection('users').doc(senderUid).ref;
      const receiverDocRef = this.firestore.collection('users').doc(receiverUid).ref;

      // Obtener saldos actuales
      const senderData = await transaction.get(senderDocRef);
      const receiverData = await transaction.get(receiverDocRef);

      const senderBalance = senderData.get('balance') || 0;
      const receiverBalance = receiverData.get('balance') || 0;

      // Verificar saldo suficiente en el remitente
      if (senderBalance < amount) {
        throw new Error('Saldo insuficiente para realizar la transferencia.');
      }

      // Actualizar saldos
      transaction.update(senderDocRef, { balance: senderBalance - amount });
      transaction.update(receiverDocRef, { balance: receiverBalance + amount });

      // Crear documento de transacción
      const transactionDocRef = this.firestore.collection('transactions').doc();

      const timestamp = new Date();
      const transactionData: TransactionData = {
        senderUid,
        receiverUid,
        amount,
        timestamp,
      };

      transaction.set(transactionDocRef.ref, transactionData);
    });

    return from(transaction$).pipe(
      tap(() => console.log('Transferencia exitosa')),
      catchError((error) => {
        console.error('Error en la transferencia:', error);
        throw error;
      })
    );
    }

    getTransactionHistory(uid: string): Observable<any[]> {
      console.log('Obteniendo historial de transacciones para UID:', uid);
    
      const query = this.firestore.collection('transactions', (ref) =>
        ref.where('senderUid', '==', uid).orderBy('timestamp', 'desc')
      );
    
      return query.valueChanges().pipe(
        map((transactions: any[]) => {
          console.log('Historial de transacciones recibido:', transactions);
          return transactions;
        }),
        catchError((error) => {
          console.error('Error al obtener el historial de transacciones:', error);
          throw error;
        })
      );
    
    }

    searchUsers(searchTerm: string): Observable<any[]> {
      // Realiza la búsqueda en la base de datos y devuelve los resultados
      const query = this.firestore.collection('users', (ref) =>
        ref.where('uid', '==', searchTerm)
      );
    
      return query.valueChanges().pipe(
        map((users) => {
          console.log('Resultados de búsqueda:', users);
          return users;
        }),
        catchError((error) => {
          console.error('Error al buscar usuarios:', error);
          throw error;
        })
      );

  }

  searchUsersDynamic(searchTerm: string): Observable<any[]> {
    console.log('Llamada a searchUsersDynamic con término de búsqueda:', searchTerm);
    return this.firestore
      .collection('users', (ref) => ref.where('displayName', '>=', searchTerm).where('displayName', '<=', searchTerm + '\uf8ff'))
      .valueChanges();
  }

}

