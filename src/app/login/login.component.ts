import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { RegistrarComponent } from '../componentes/registrar/registrar.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formularioLogin!: FormGroup;

  constructor(
    private formularioB: FormBuilder,
    public dialog: MatDialog
    )
  {
  }

  ngOnInit(): void
  {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void
  {
    this.formularioLogin = this.formularioB.group({
      identificacion: ['', [ Validators.required]],
      password: ['', [ Validators.required]]
    });
  }

  abrirModalRegistro(): void
  {
    this.dialog.open(RegistrarComponent, {width: '400px'});
  }

  obtenerDatosFormularioLogin(form: any): void
  {
    console.log(form);
  }


}
