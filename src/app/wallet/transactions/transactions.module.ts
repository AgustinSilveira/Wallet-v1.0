import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SharedDataQRService } from 'src/app/shared/shared-dataQR.service';
import { AppComponent } from 'src/app/app.component';


@NgModule({
  declarations: [
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    IonicModule,
    FormsModule
  ],
  providers: [SharedDataQRService],
  bootstrap: [AppComponent]
})
export class TransactionsModule { }
