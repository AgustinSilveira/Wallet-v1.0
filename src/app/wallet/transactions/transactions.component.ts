// transactions.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/pages/services/auth.service';
import { TransactionService } from 'src/app/pages/services/transaction.service';

import { Subject, Observable } from 'rxjs';
import { takeUntil, debounceTime, switchMap } from 'rxjs/operators';
import { SharedDataQRService } from 'src/app/shared/shared-dataQR.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  segmentValue: string = 'todo';
  historialTransacciones: any[] = [];
  private unsubscribe$ = new Subject<void>();
  showTransactions: boolean = true;

  searchTerm: string = '';
  searchResults: any[] = [];

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    public sharedDataQR: SharedDataQRService,
  ) { }

  ngOnInit() {
    // Obtener el UID del usuario actual desde el servicio de autenticación
    this.authService.userState$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (user) => {
          if (user) {
            const uidUsuarioActual = user.uid;

            // Llamar a la función getTransactionHistory para obtener el historial de transacciones
            this.transactionService
              .getTransactionHistory(uidUsuarioActual)
              .pipe(takeUntil(this.unsubscribe$))
              .subscribe({
                next: (historial) => {
                  console.log('Historial de transacciones recibido:', historial);
                  this.historialTransacciones = historial || [];

                  // Actualizar el contador de transacciones no leídas
                  if (!this.showTransactions) {
                    const unreadCount = historial.filter((transaccion) => !transaccion.read).length;
                    this.sharedDataQR.setUnreadTransactionsCount(unreadCount);
                  }
                },
              });
          }
        },
        error: (error) => {
          console.error('Error al obtener el usuario actual:', error);
        },
      });

    // Configurar la búsqueda con debounceTime
    this.setupSearch();
  }

  search() {
    console.log('Realizando búsqueda con término:', this.searchTerm);
    this.transactionService.searchUsersDynamic(this.searchTerm).subscribe(
      (results) => {
        console.log('Resultados de la búsqueda:', results);

        // Filtrar los resultados para que coincidan con el término de búsqueda
        this.searchResults = results.filter((user) =>
          user.displayName.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      },
      (error) => {
        console.error('Error al buscar usuarios:', error);
      }
    );
  }

  segmentChanged() {
    // Lógica para manejar el cambio de segmento (si es necesario)
    console.log('Segment changed:', this.segmentValue);
  }

  private setupSearch() {
    // Configurar la búsqueda dinámica
    this.transactionService
      .searchUsersDynamic(this.searchTerm)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((results) => {
        this.searchResults = results;
      });
  }

  // Actualizar la búsqueda cuando se modifica el término de búsqueda
  onSearchTermChange() {
    this.setupSearch();
  }

  getUserDisplayName(uid: string): string {
    // Verificar si hay resultados de búsqueda
    if (this.searchResults.length > 0) {
      const userResult = this.searchResults.find((user) => user.uid === uid);
      return userResult ? userResult.displayName : '';
    } else {
      return '';
    }
  }

  // Método para manejar clic en la sección de transacciones
  onTransactionsClick() {
    // Cambiar la visibilidad de las transacciones y restablecer el contador
    this.showTransactions = !this.showTransactions;

    if (!this.showTransactions) {
      this.sharedDataQR.setUnreadTransactionsCount(0);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
