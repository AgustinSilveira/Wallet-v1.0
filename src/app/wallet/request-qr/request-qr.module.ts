import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestQRRoutingModule } from './request-qr-routing.module';
import { RequestQRComponent } from './request-qr.component';
import { IonicModule } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RequestQRComponent
  ],
  imports: [
    CommonModule,
    RequestQRRoutingModule,
    IonicModule,
    QRCodeModule,
    FormsModule
  ]
})
export class RequestQRModule { }
