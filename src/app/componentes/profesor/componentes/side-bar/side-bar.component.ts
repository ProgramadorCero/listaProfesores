import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  @Output() opcion = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.seleccionarLista();
  }

  seleccionarLista(): void
  {
    document.getElementById('lista')
    ?.addEventListener('click', (e) => this.obtenerElementoLista(e) );
  }

  obtenerElementoLista(hijoSeleccionado: any): void
  {
    if (hijoSeleccionado.target.classList.value !== 'item-opciones-clic')
    {
      /*const lista: any = document.getElementById('lista');
      const listaHijos: any [] = lista.childNodes;
      listaHijos.forEach( hijo => this.cambiarLaClaseDeLosHijos(hijo));
      this.cambiarClaseDelNodo(hijoSeleccionado, 'item-opciones', 'item-opciones-clic' );*/
    }
  }

  cambiarLaClaseDeLosHijos(hijo: any): void
  {
    /*if (hijo.classList.value === 'item-opciones-clic')
    {
      hijo.classList.replace('item-opciones-clic', 'item-opciones');
    }*/
  }

  cambiarClaseDelNodo(hijoSeleccionado: any, claseAntigua: string, claseNueva: string): void
  {
    hijoSeleccionado.target.classList.replace(claseAntigua, claseNueva);
  }

  enviarOpcionElegidaAComponenteProfesor(opcion: string): void
  {
    const urlHijosProfesor = `./profesor/${opcion}`;
    this.opcion.emit(urlHijosProfesor);
  }

}
