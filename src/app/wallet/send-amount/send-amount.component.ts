import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-send-amount',
  templateUrl: './send-amount.component.html',
  styleUrls: ['./send-amount.component.scss'],
})
export class SendAmountComponent  implements OnInit {
  userName: string = "Invitado";
  photo: string = "";
  balance= 0;
  data: string = '';
  private subscription: Subscription = new Subscription();

  constructor(
    private sharedDataService: SharedDataService,
    private router: Router,
  ) { }

  guardarInformacion() {
    this.sharedDataService.updateMessage(this.data);
    this.sharedDataService.updateBalance(this.balance);
    this.sharedDataService.updateMonto(this.balance);
    this.router.navigate(['/pay-resumen']);
  }

  monto(amount: number) {
    if (this.balance + amount >= 0) {
      this.balance += amount;
    }
  }


  ngOnInit() {
    this.subscription.add(
      this.sharedDataService.data$.subscribe((data) => {
        this.userName = data || 'Invitado';
      })
    );

    this.subscription.add(
      this.sharedDataService.monto$.subscribe((monto) => {
        this.balance = monto;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
