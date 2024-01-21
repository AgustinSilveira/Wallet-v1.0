import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/pages/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  // isUserAuthenticated: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
    ) { 

  }

  ngOnInit(): void {
    // Suscríbete al observable de autenticación para conocer el estado actual
  //   this.authService.isAuthenticated().subscribe(isAuthenticated => {
  //     this.isUserAuthenticated = isAuthenticated;

  //      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
  //      if (!isAuthenticated) {
  //       this.router.navigate(['/login']);
  //     }
  //   });
  }

}
