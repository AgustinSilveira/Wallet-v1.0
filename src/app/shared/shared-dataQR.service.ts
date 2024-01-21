import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataQRService {
    public destinatarioUid: string | null = null;
  private balanceSubject = new BehaviorSubject<number>(0);
  private qrDataSubject = new BehaviorSubject<{ user: string; monto: number; mensaje: string; payTransaction: string }>
  ({ user: '', monto: 0, mensaje: '', payTransaction: '' });
  private unreadTransactionsCountSubject = new BehaviorSubject<number>(0);

  setQRData(data: string) {
    this.qrDataSubject.next(JSON.parse(data));
  }

  getQRData() {
    return this.qrDataSubject.asObservable();
  }

  updateBalance(balance: number) {
    this.balanceSubject.next(balance);
  }

  get balance$() {
    return this.balanceSubject.asObservable();
  }

  private userToSendSubject = new BehaviorSubject<any>(null);
  
  setUserToSend(user: any) {
    this.userToSendSubject.next(user);
  }

  getUserToSend() {
    return this.userToSendSubject.asObservable();
  }
  // ===============

  setUnreadTransactionsCount(count: number) {
    this.unreadTransactionsCountSubject.next(count);
  }

  getUnreadTransactionsCount(): number {
    return this.unreadTransactionsCountSubject.value;
  }

  getUnreadTransactionsCount$(): Observable<number> {
    return this.unreadTransactionsCountSubject.asObservable();
  }
  
}
