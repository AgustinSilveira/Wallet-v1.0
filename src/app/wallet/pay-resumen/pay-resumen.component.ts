import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/pages/services/auth.service';
import { TransactionService } from 'src/app/pages/services/transaction.service';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { SharedDataQRService } from 'src/app/shared/shared-dataQR.service';

@Component({
  selector: 'app-pay-resumen',
  templateUrl: './pay-resumen.component.html',
  styleUrls: ['./pay-resumen.component.scss'],
})
export class PayResumenComponent implements OnInit, OnDestroy {
  userName: string = "Invitado";
  photo: string = "";
  monto: number = 0;
  qrData: { user: string; monto: number; mensaje: string; payTransaction: string } | null = null;
  comisionActivada: boolean = false;
  montoOriginal: number = 0;
  comisionCalculada: number = 0;
  remitenteUid: string | null = null;
  destinatarioUid: string | null = null;
  mensajeError: string = '';

  loading: boolean = false;
  success: boolean = false;

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
    },
    {
      text: 'Salir',
      role: 'confirm',
      handler: () => {
        this.router.navigate(['/wallet']);
      },
    },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private sharedDataService: SharedDataService,
    public sharedDataQR: SharedDataQRService,
    private cdr: ChangeDetectorRef,
    private transactionService: TransactionService,
    private alertController: AlertController,
    private loadingController: LoadingController,
  ) {}

  toggleComision() {
    this.comisionActivada = !this.comisionActivada;
    if (this.comisionActivada) {
      this.comisionCalculada = this.monto * 0.0112;
    } else {
      this.comisionCalculada = 0;
    }
    this.monto = this.montoOriginal + this.comisionCalculada;
  }

  ngOnInit() {
    this.authService.userState$.subscribe((user) => {
      if (user) {
        this.remitenteUid = user.uid;
      }
    });

    this.sharedDataQR.getQRData()
      .pipe(
        tap(() => {
          this.cdr.detectChanges();
        })
      )
      .subscribe((qrData) => {
        if (qrData) {
          this.destinatarioUid = qrData.user;
          this.montoOriginal = qrData.monto || 0;
          this.monto = this.comisionActivada ? this.montoOriginal + this.comisionCalculada : this.montoOriginal;
        }
      });

    this.authService.userState$.subscribe((user) => {
      if (user) {
        this.userName = user.displayName || "Invitado";
        this.photo = user.photoURL || "";
      } else {
        this.userName = "Invitado";
      }
    });
  }

  async confirmPayment() {
    this.loading = true;
    if (this.remitenteUid === null || this.destinatarioUid === null) {
      console.error('UID del remitente o destinatario es nulo. No se puede realizar la transferencia.');
      return;
    }

    const remitenteUid = this.remitenteUid;
    const destinatarioUid = this.destinatarioUid;
    const amount = this.monto;

    const loading = await this.loadingController.create({
      message: 'Realizando la transferencia...',
      duration: 5000,
    });

    await loading.present();

    this.transactionService.transferFunds(remitenteUid, destinatarioUid, amount)
      .subscribe({
        next: () => {
          console.log('Transferencia exitosa');
          this.success = true;
          this.presentSuccessAlert();
        },
        error: (error: any) => {
          console.error('Error en la transferencia:', error);
          this.mensajeError = error.message || 'Error desconocido en la transferencia.';
        },
        complete: () => {
          this.loading = false;
          loading.dismiss();
        }
      });
  }

  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      header: '¡Transacción exitosa!',
      message: 'La transferencia se ha realizado con éxito.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/wallet']); 
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnDestroy(): void {
    this.mensajeError = '';
  }
}
