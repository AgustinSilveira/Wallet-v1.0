import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss'],
})
export class ResetPassComponent implements OnInit {
  email: string = '';
  emailError: string = '';

  mostrarFormulario = true;


  restablecerEstado() {
    this.mostrarFormulario = true;
  }

  constructor(private authService: AuthService) {}

  resetPassword() {
    // Validar el formato del correo electrónico
    if (!this.validateEmail(this.email)) {
      this.emailError = 'Ops, al parecer este correo no existe.';
    } else {
      // Continuar con el proceso de restablecimiento de contraseña
      console.log('Resetting password for email:', this.email);
      this.authService.sendPasswordResetEmail(this.email);
      this.mostrarFormulario = false;
    }
    
  }

  // Método para validar el formato del correo electrónico
  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  ngOnInit() {}
}