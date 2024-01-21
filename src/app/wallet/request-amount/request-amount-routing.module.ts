import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestAmountComponent } from './request-amount.component';

const routes: Routes = [{ path: '', component: RequestAmountComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestAmountRoutingModule { }
