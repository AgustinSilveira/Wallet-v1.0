import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendAmountRoutingModule } from './send-amount-routing.module';
import { SendAmountComponent } from './send-amount.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    SendAmountComponent,
  ],
  imports: [
    CommonModule,
    SendAmountRoutingModule,
    IonicModule
  ]
})
export class SendAmountModule { }
