import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/pages/services/auth.service';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-request-amount',
  templateUrl: './request-amount.component.html',
  styleUrls: ['./request-amount.component.scss'],
})
export class RequestAmountComponent  implements OnInit {
  userName: string = "Invitado";
  photo: string = "";
  balance= 0;
  data: string = '';

  

  constructor(
    private sharedDataService: SharedDataService,
    private authService: AuthService
    ) {}

  guardarInformacion() {
    this.sharedDataService.updateMessage(this.data);
    this.sharedDataService.updateBalance(this.balance);
  }

  monto(amount: number) {
    if (this.balance + amount >= 0) {
      this.balance += amount;
    }
  }

  formatBalance(balance: number): string {
    return balance.toLocaleString();
  }

  ngOnInit() {
    this.authService.userState$.subscribe(user => {
      if (user) {
        
        this.photo = user.photoURL || "";
      } else {
        this.userName = "Invitado";
      }
    });
  }

}
