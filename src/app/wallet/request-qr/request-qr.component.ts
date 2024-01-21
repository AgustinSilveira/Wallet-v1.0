import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/pages/services/auth.service';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { Observable, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-request-qr',
  templateUrl: './request-qr.component.html',
  styleUrls: ['./request-qr.component.scss'],
})
export class RequestQRComponent implements OnInit {
  userName: string = "Invitado";
  photo: string = ""; 
  mensaje: string = '';
  balance: number = 0;
  qrData$: Observable<string>;

  constructor(
    private authService: AuthService,
    private sharedDataService: SharedDataService
  ) {
    this.qrData$ = this.generateQRData(); 
  }

  ngOnInit() {

    this.qrData$.subscribe();

    this.sharedDataService.data$.subscribe((data) => {
      this.mensaje = data;
    });

    this.sharedDataService.balance$.subscribe((balance) => {
      this.balance = balance;
    });

    this.authService.userState$.subscribe(user => {
      if (user) {
        this.userName = user.displayName || "Invitado";
        this.photo = user.photoURL || "";
      } else {
        this.userName = "Invitado";
      }
    });
  }

  generateQRData(): Observable<string> {
    return combineLatest([
      this.authService.$user,
      this.sharedDataService.data$,
      this.sharedDataService.balance$,
    ]).pipe(
      map(([user, mensaje, balance]) => {
        const uid = user?.uid || '';
        const qrData = {
          user: uid,
          monto: balance,
          mensaje: mensaje,
          payTransaction: "false"
        };
        
        return JSON.stringify(qrData);
      })
    );
  }
}
