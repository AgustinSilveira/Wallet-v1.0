import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { SharedDataQRService } from 'src/app/shared/shared-dataQR.service';
import { UserService } from 'src/app/pages/services/user.service';
import { Observable } from 'rxjs';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss'],
})
export class SendComponent  implements OnInit {
  searchTerm = '';
  users$: Observable<any[]> = new Observable<any[]>();
  

  constructor(
    private userService: UserService,
    private router: Router,
    private sharedDataQR: SharedDataQRService,
    private sharedDataService: SharedDataService
  ) { }

  search() {
    this.users$ = this.userService.searchUsersByName(this.searchTerm);
  }

  sendMoney(user: any) {
    // Almacenar la información del destinatario en el servicio compartido
    this.sharedDataQR.destinatarioUid = user.uid;
    this.sharedDataQR.setUserToSend(user);
    this.sharedDataService.updateMessage(user.displayName);
    this.sharedDataService.updateBalance(user.balance || 0);
    this.router.navigate(['/send-amount']);
  }

  

  
  public async startScan() {
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan();

    if (result.hasContent) {
      console.log(result.content);
      this.sharedDataQR.setQRData(result.content);
      this.router.navigate(['/pay-resumen']);
    }
  }

  ngOnInit() {}

}
