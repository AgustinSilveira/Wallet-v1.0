import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestAmountRoutingModule } from './request-amount-routing.module';
import { RequestAmountComponent } from './request-amount.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RequestAmountComponent
  ],
  imports: [
    CommonModule,
    RequestAmountRoutingModule,
    IonicModule,
    FormsModule
  ]
})
export class RequestAmountModule { }
