import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayResumenRoutingModule } from './pay-resumen-routing.module';
import { PayResumenComponent } from './pay-resumen.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    PayResumenComponent
  ],
  imports: [
    CommonModule,
    PayResumenRoutingModule,
    IonicModule,
  ]
})
export class PayResumenModule { }
