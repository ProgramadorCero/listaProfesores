import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthServiceService } from '../compartidos/auth/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup | undefined ;

  constructor(
    private auth: AuthServiceService,
    private formularioB: FormBuilder
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

  obtenerDatosFormularioLogin(form: any): void
  {
    console.log(form);
  }

  agregarUsuario(): void
  {
    this.auth.agregarProfesor().subscribe( respuesta => console.log(respuesta));
  }

}
