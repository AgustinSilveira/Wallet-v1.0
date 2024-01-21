import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendRoutingModule } from './send-routing.module';
import { SendComponent } from './send.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SendComponent],
  imports: [
    CommonModule,
    SendRoutingModule,
    IonicModule,
    FormsModule
  ]
})
export class SendModule { }
