import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { RegistrarComponent } from '../componentes/registrar/registrar.component';
import { CrudProfesorService } from '../compartidos/service/crud-profesor.service';
import { Usuario } from '../compartidos/interfaces/usuario';
import { AuthServiceService } from '../compartidos/auth/auth-service.service';
import { Router } from '@angular/router';
declare let alertify: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formularioLogin!: FormGroup;

  constructor(
    private formularioB: FormBuilder,
    public dialog: MatDialog,
    private crudProfesor: CrudProfesorService,
    private auth: AuthServiceService,
    private router: Router
    )
  {
    this.auth.eliminarIdentificacionLocalStorage();
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

  validarIdentificacion(): void
  {
  }

  abrirModalRegistro(): void
  {
    const dialog = this.dialog.open(RegistrarComponent, {width: '400px'});
    dialog.afterClosed().subscribe(result => {
      if (result !== undefined)
      {
        this.mensajeSuccessAlertify('Usuario creado correctamente');
      }
    });
  }

  obtenerDatosFormularioLogin(form: FormGroup): void
  {
    const profesor: Usuario =
    {
      identificacion: form.get('identificacion')?.value,
      password: form.get('password')?.value
    };
    this.crudProfesor.obtenerProfesor(profesor)
    .subscribe(result => {
      this.notificarRespuestaBusquedaProfesor(result);
    },
    error => this.mensajeErrorAlertify('error en la conexión a la base de datos'));
  }

  notificarRespuestaBusquedaProfesor(result: any): void
  {
    if (typeof (result) === 'string')
    {
      this.mensajeErrorAlertify(result);
    }else if (result === null)
    {
      this.mensajeErrorAlertify('El USUARIO NO ESTÁ REGISTRADO');
    }
    else
    {
      this.auth.guardarIdentificacionLocalStorage(result.identificacion);
      this.router.navigateByUrl('/profesor');
    }
  }

  mensajeSuccessAlertify(mensaje: string): void
  {
    alertify.set('notifier', 'position', 'top-right');
    alertify.success(mensaje);
  }

  mensajeErrorAlertify(mensaje: string): void
  {
    alertify.set('notifier', 'position', 'top-right');
    alertify.error(mensaje);
  }

  soloNumerosEnElCampo(nombreCampo: string): void
  {
    const cadena: string = this.formularioLogin.get(nombreCampo)?.value;
    if (cadena)
    {
      if (!cadena.match(/^[0-9]*$/g))
      {
        const nuevaCadena = cadena.replace(/[\Wa-z_]*/gi, '');
        this.formularioLogin.get(nombreCampo)?.setValue(nuevaCadena);
      }
    }
  }


}
