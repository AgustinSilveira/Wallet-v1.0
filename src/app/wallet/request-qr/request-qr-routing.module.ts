import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestQRComponent } from './request-qr.component';

const routes: Routes = [{path: '', component: RequestQRComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestQRRoutingModule { }
