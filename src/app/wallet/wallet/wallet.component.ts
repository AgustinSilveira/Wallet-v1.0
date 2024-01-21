
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/pages/services/auth.service';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { SharedDataQRService } from 'src/app/shared/shared-dataQR.service';
import { FirestoreService } from 'src/app/pages/services/firebase.service';
import { firstValueFrom } from 'rxjs';
import { TransactionService } from 'src/app/pages/services/transaction.service';
import { MenuController } from '@ionic/angular';




@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
  userName: string = "Invitado";
  photo: string = "";
  balance = 0;
  receivedTransactions: any[] = [];
  unreadTransactionsCount: number = 0;

  constructor(
    private authService: AuthService,
     private router: Router,
     private sharedDataQR: SharedDataQRService,
     private firestoreService: FirestoreService,
     private transactionService: TransactionService,
     private menuController: MenuController,
     
     ) {}

     get formattedBalance(): string {
      return this.balance.toFixed(2);
    }

    openMenuItem(item: string) {
      this.menuController.close('start');
    }

    openMenu() {
      this.menuController.toggle('start');
    }

    async updateBalance(amount: number) {
      // Actualiza el balance local
      this.balance += amount;
    
      // Actualiza el balance en la base de datos de Firebase
      const user = await this.authService.getCurrentUser();
      if (user) {
        const newBalance = this.balance;
        await this.firestoreService.updateUserBalance(user.uid || '', newBalance);
      }
    }

  signOut() {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
  


public async startScan() {
  await BarcodeScanner.checkPermission({ force: true });
  BarcodeScanner.hideBackground();
  const result = await BarcodeScanner.startScan(); 

  if (result.hasContent) {
    this.sharedDataQR.setQRData(result.content);
    this.router.navigate(['/pay-resumen']);
  }
};




async ngOnInit(): Promise<void> {
  
  this.authService.userState$.subscribe(async (user) => {
    if (user) {
      this.userName = user.displayName || 'Invitado';
      this.photo = user.photoURL || '';

      // Obtener el documento del usuario en Firestore y cargar el balance
      const userDoc = await firstValueFrom(this.firestoreService.getUser(user.uid || ''));
      if (userDoc) {
        this.balance = userDoc.balance || 0;
      }
    } else {
      this.userName = 'Invitado';
    }
    
  });
  // Suscribirse al contador de transacciones no leídas
  this.sharedDataQR.getUnreadTransactionsCount$().subscribe((count) => {
    this.unreadTransactionsCount = count;
  });
}
}



