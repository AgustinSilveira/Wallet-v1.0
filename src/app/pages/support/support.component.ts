import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent  implements OnInit {

  mostrarFormulario = true;

  enviarMensaje() {
    // futura logica para enviar el formulario
    // oculta el formulario y muestra el mensaje de éxito
    this.mostrarFormulario = false;
  }

  restablecerEstado() {
    this.mostrarFormulario = true;
  }

  constructor() { }


  ngOnInit() {}

}
