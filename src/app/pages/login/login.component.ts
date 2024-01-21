import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  loadingActive: boolean = false;
  mensajeError: string = '';

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController
  ) {}

  async login() {
    let loading: HTMLIonLoadingElement | null = null;
    try {
      // Muestra el componente de carga
      loading = await this.loadingController.create({
        message: 'Iniciando sesión...',
        duration: 2000,
        spinner: 'dots',
        backdropDismiss: false,
      });

      await loading.present();

      // Llama al método de inicio de sesión en tu servicio de autenticación
      await this.authService.signIn(this.email, this.password, null);

      // Imprime la información del usuario en la consola
      console.log('Usuario autenticado correctamente.');
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error.message);

      // Muestra un mensaje de error usando el controlador de carga
      const errorMessage = error.message || 'Error desconocido al iniciar sesión.';
      await this.showError(loading, errorMessage);
    } finally {
      // Cierra el componente de carga después de un tiempo (ajusta el tiempo según tus necesidades)
      setTimeout(() => {
        if (loading) {
          loading.dismiss();
        }
      }, 2000);
    }
  }

  async showError(loading: HTMLIonLoadingElement | null, message: string) {
    if (loading) {
      loading.dismiss();
    }

    const errorAlert = await this.loadingController.create({
      message: message,
      duration: 3000,
    });

    await errorAlert.present();
  }

  signInWithGoogle(): void {
    this.authService.signInGoogle();
  }

  signInWithFacebook(): void {
    this.authService.signInWithFacebook();
  }

  ngOnInit() {}

  async onLoadingDismissed() {
    // Esta función se llamará cuando el componente de carga se cierre
    console.log('Loading dismissed');
  }
}
