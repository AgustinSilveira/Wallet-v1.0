import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IonLoading } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  username: string = '';
  email: string = '';
  password: string = '';
  acceptedTerms: boolean = false;
  selectedFile: File | null = null;
  loadingActive: boolean = false;

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController
    ) { }

  signInWithGoogle() {
    this.authService.signInGoogle();
  }
  

  // img del register
  onFileSelected(event: any): void {
    // Obtener el archivo seleccionado
    this.selectedFile = event.target.files[0] as File;
  }

  onLoadingDismissed() {
    // Esta función se llamará cuando el componente de carga se cierre
    console.log('Loading dismissed');
  }

  async signUp() {
    let loading: HTMLIonLoadingElement | null = null;
    try {
      // Verifica que se hayan aceptado los términos
      if (!this.acceptedTerms) {
        throw new Error('Debe aceptar los términos y condiciones para registrarse.');
      }
  
      // Verifica que se hayan proporcionado todos los campos obligatorios
      if (!this.username || !this.email || !this.password) {
        throw new Error('Por favor, complete todos los campos obligatorios.');
      }
  
      // Verifica la longitud de la contraseña
      if (this.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres.');
      }
  
      // Muestra el componente de carga
      const loading = await this.loadingController.create({
        message: 'Registrando...',
        duration: 2000,
        spinner: 'dots',
        backdropDismiss: false,
      });
  
      await loading.present();
  
     // Llama al método de registro en tu servicio de autenticación
    await this.authService.signUpWithProfilePicture(this.email, this.password, this.username, this.selectedFile);

     // Imprime la información del usuario en la consola
     console.log('Usuario registrado exitosamente.');
    } catch (error: any) {
      console.error('Error al registrar usuario:', error.message);

     // Muestra un mensaje de error usando el controlador de carga
     const errorMessage = error.message || 'Error desconocido al registrar usuario.';
     await this.showError(loading, errorMessage);
   } finally {
    // Cierra el componente de carga después de un tiempo (puedes ajustar el tiempo según tus necesidades)
    setTimeout(() => {
      if (loading) {
        loading.dismiss();
      }
    }, 2000);
    }
  }



  // Método para mostrar un mensaje de error utilizando el controlador de carga
  async showError(alert: HTMLIonAlertElement | null, message: string) {
    if (alert) {
      alert.dismiss();
    }
  
    const errorAlert = await this.loadingController.create({
      message: message,
      duration: 3000, // Ajusta la duración según tus necesidades
    });
  
    await errorAlert.present();
  }
  }

