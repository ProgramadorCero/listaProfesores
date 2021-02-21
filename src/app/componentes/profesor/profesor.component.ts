import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.scss']
})
export class ProfesorComponent implements OnInit {

  opcionSideBar = 'Bienvenido';
  constructor(private router: Router)
  {
  }

  ngOnInit(): void {
  }

  opcionElegidaSideBar(valorEvento: string): void
  {
    this.opcionSideBar = valorEvento;
    // this.irALaOpcionSeleccionadaSidebar(valorEvento);
  }

  irALaOpcionSeleccionadaSidebar(opcion: string): void
  {
    this.router.navigate([opcion]);
  }

}
