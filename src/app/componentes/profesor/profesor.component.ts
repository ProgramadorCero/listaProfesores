import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.scss']
})
export class ProfesorComponent implements OnInit {

  opcionSideBar = 'Bienvenido';
  constructor() { }

  ngOnInit(): void {
  }

  opcionElegidaSideBar(e: string): void
  {
    this.opcionSideBar = e;
  }

}
