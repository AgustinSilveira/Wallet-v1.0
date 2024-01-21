import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendAmountComponent } from './send-amount.component';

const routes: Routes = [{ path: '', component: SendAmountComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendAmountRoutingModule { }
