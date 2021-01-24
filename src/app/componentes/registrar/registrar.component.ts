import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ValidacionFormularioService } from 'src/app/compartidos/validacion-formulario/validacion-formulario.service';
import { AuthServiceService } from '../../compartidos/auth/auth-service.service';
import { Profesor } from '../../compartidos/interfaces/profesor';
declare let alertify: any;


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {

  formularioRegistro!: FormGroup;
  validacionFormularioRegistro = ValidacionFormularioService.validacionRegistro;
  profesor!:Profesor;
  constructor(
    private auth: AuthServiceService,
    public  modalReferencia: MatDialogRef <RegistrarComponent>,
    public formularioB: FormBuilder
    )
    {
      console.log(this.validacionFormularioRegistro);
    }

  ngOnInit(): void {
    this.inicializarFormularioRegsitro();
  }

  inicializarFormularioRegsitro(): void
  {
    this.formularioRegistro = this.formularioB.group({
      nombre: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[a-z ]*$/i)]],
      identificacion: ['', [Validators.required, Validators.pattern(/^[0-9]*$/s)]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  cerrarModalRegistro(): void
  {
    this.modalReferencia.close();
  }

  agregarUsuario(): void
  {
    this.auth.agregarProfesor().subscribe( respuesta => console.log(respuesta));
  }

  obtenerDatosFormularioRegistro( elemento: FormGroup): void
  {
    if (this.formularioValido())
    {
      this.inicializarObjetoProfesor(elemento.value);
    }
    else
    {
      for (let propiedad in this.formularioRegistro.getRawValue())
      {
        console.log(this.campoFormularioRegistroTieneError(propiedad))
        if (this.campoFormularioRegistroTieneError(propiedad))
        {
          this.mensajeDeErrorSegunElCampoRegistro(propiedad);
        }
      }
    }
  }

  mensajeDeErrorSegunElCampoRegistro(propiedad:string): void
  {
    switch (propiedad)
    {
      case 'nombre':
        this.mensajeErrorAlertify('ERROR EN EL CAMPO NOMBRE');
      break
      case 'email':
        this.mensajeErrorAlertify('ERROR EN EL CAMPO CORREO ELECTRONICO');
      break
      case 'identificacion':
        this.mensajeErrorAlertify('ERROR EN EL CAMPO CORREO IDENTIFICACIÓN');
      break
      case 'password':
        this.mensajeErrorAlertify('ERROR EN EL CAMPO CORREO CONTRASEÑA');
      break
      default:
        console.log('no hay errores');
      break
    }
  }

  mensajeErrorAlertify(mensaje: string):void
  {
    alertify.set('notifier','position', 'top-right');
    alertify.error(mensaje);
  }

  formularioValido(): boolean
  {
    return this.formularioRegistro.valid;
  }

  inicializarObjetoProfesor(elemento: any): void
  {
    this.profesor = {
      nombre: elemento.nombre,
      identificacion: elemento.identificacion,
      password: elemento.password,
      email: elemento.email
    }
    console.log(this.profesor);
  }

  campoFormularioRegistroTieneError(nombreCampo: string): boolean
  {
    if( this.formularioRegistro.get(nombreCampo)?.invalid)
    {
      return true;
    }
    return false;
  }

}
