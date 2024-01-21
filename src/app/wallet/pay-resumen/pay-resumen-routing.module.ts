import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayResumenComponent } from './pay-resumen.component';

const routes: Routes = [{path:'', component: PayResumenComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayResumenRoutingModule { }
