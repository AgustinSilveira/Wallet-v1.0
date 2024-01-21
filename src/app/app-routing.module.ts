import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';


const routes: Routes = [
  
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomeModule),
    canActivate: [authGuard(false)],
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginModule),
    canActivate: [authGuard(false)],
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterModule),
    canActivate: [authGuard(false)],
  },
  {
    path: 'resetPass',
    loadChildren: () => import('./pages/reset-pass/reset-pass.module').then( m => m.ResetPassModule),
    canActivate: [authGuard(false)],
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/support/support.module').then( m => m.SupportModule),
    canActivate: [authGuard(false)],
  },
  {
    path: 'home',
    loadChildren: () => import('./wallet/home/home.module').then( m => m.HomeModule),
    canActivate: [authGuard(true)],
  },
  {
    path: 'wallet',
    loadChildren: () => import('./wallet/wallet/wallet.module').then( m => m.WalletModule),
    canActivate: [authGuard(true)],
  },
  // {
  //   path: 'send',
  //   loadChildren: () => import('./wallet/send/send.module').then( m => m.SendModule),
  //   canActivate: [authGuard(true)],
  // },
  // {
  //   path: 'send-amount',
  //   loadChildren: () => import('./wallet/send-amount/send-amount.module').then( m => m.SendAmountModule),
  //   canActivate: [authGuard(true)],
  // },
  {
    path: 'request-amount',
    loadChildren: () => import('./wallet/request-amount/request-amount.module').then( m => m.RequestAmountModule),
    canActivate: [authGuard(true)],
  },
  {
    path: 'request-QR',
    loadChildren: () => import('./wallet/request-qr/request-qr.module').then( m => m.RequestQRModule),
    canActivate: [authGuard(true)],
  },
  {
    path: 'pay-resumen',
    loadChildren: () => import('./wallet/pay-resumen/pay-resumen.module').then( m => m.PayResumenModule),
    canActivate: [authGuard(true)],
  },
  {
    path: 'transactions',
    loadChildren: () => import('./wallet/transactions/transactions.module').then( m => m.TransactionsModule),
    canActivate: [authGuard(true)],
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
