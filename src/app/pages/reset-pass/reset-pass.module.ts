import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPassRoutingModule } from './reset-pass-routing.module';
import { IonicModule } from '@ionic/angular';
import { ResetPassComponent } from './reset-pass.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ResetPassComponent
  ],
  imports: [
    CommonModule,
    ResetPassRoutingModule,
    IonicModule,
    FormsModule,
  ]
})
export class ResetPassModule { }
