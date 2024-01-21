import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private dataSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private balanceSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private montoSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);


  

  data$: Observable<string> = this.dataSubject.asObservable();
  balance$: Observable<number> = this.balanceSubject.asObservable();
  monto$: Observable<number> = this.montoSubject.asObservable();

  updateMessage(data: string) {
    this.dataSubject.next(data);
  }

  updateBalance(balance: number) {
    this.balanceSubject.next(balance);
  }

  updateMonto(monto: number) {
    this.montoSubject.next(monto);
  }
  

}
