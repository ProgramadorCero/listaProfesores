import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CrudProfesorService } from 'src/app/compartidos/service/crud-profesor.service';
import { ValidacionFormularioService } from 'src/app/compartidos/validacion-formulario/validacion-formulario.service';
import { Profesor } from '../../compartidos/interfaces/profesor';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
declare let alertify: any;


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit, OnDestroy {

  formularioRegistro!: FormGroup;
  validacionFormularioRegistro = ValidacionFormularioService.validacionRegistro;
  profesor!: Profesor;
  unSubscription!: Subscription;

  constructor(
    public  modalReferencia: MatDialogRef <RegistrarComponent>,
    public formularioB: FormBuilder,
    private crudProfesor: CrudProfesorService,
    private cdRef: ChangeDetectorRef
    )
    {

    }

  ngOnInit(): void {
    this.inicializarFormularioRegsitro();
  }

  ngOnDestroy(): void
  {
    this.unSubscription.unsubscribe();
  }

  inicializarFormularioRegsitro(): void
  {
    this.formularioRegistro = this.formularioB.group({
      nombre: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[a-z ]*$/i)]],
      identificacion: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  cerrarModalRegistro(dato?: string): void
  {
    this.modalReferencia.close(dato);
  }

  validarDatosFormularioRegistro( elemento: FormGroup): void
  {
    if (this.formularioValido())
    {
      this.inicializarObjetoProfesor(elemento.value);
      this.enviarDatosAlCrudProfesores();
    }
    else
    {
      // tslint:disable-next-line: forin
      for (const propiedad in this.formularioRegistro.getRawValue())
      {
        if (this.campoFormularioRegistroTieneError(propiedad))
        {
          this.mensajeDeErrorSegunElCampoRegistro(propiedad);
        }
      }
    }
  }

  mensajeDeErrorSegunElCampoRegistro(propiedad: string): void
  {
    switch (propiedad)
    {
      case 'nombre':
        this.mensajeErrorAlertify('ERROR EN EL CAMPO NOMBRE');
        break;
      case 'email':
        this.mensajeErrorAlertify('ERROR EN EL CAMPO CORREO ELECTRONICO');
        break;
      case 'identificacion':
        this.mensajeErrorAlertify('ERROR EN EL CAMPO CORREO IDENTIFICACIÓN');
        break;
      case 'password':
        this.mensajeErrorAlertify('ERROR EN EL CAMPO CORREO CONTRASEÑA');
        break;
      default:
        console.log('no hay errores');
        break;
    }
  }

  mensajeErrorAlertify(mensaje: string): void
  {
    alertify.set('notifier', 'position', 'top-right');
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
    };
  }

  campoFormularioRegistroTieneError(nombreCampo: string): boolean
  {
    if ( this.formularioRegistro.get(nombreCampo)?.invalid)
    {
      return true;
    }
    return false;
  }

  enviarDatosAlCrudProfesores(): void
  {
   this.unSubscription = this.crudProfesor.registrarProfesor(this.profesor)
    .subscribe(
      respuesta => {
        console.log(respuesta);
        this.cerrarModalRegistro('hola');
      },
      error =>
      this.mensajeErrorAlertify('Error en conexión a la base de datos ' + error)
      );
  }

  validacionesEspesificasIdentificacion(cadena: string): boolean
  {
    if (cadena !== undefined && cadena !== null)
    {
      cadena = cadena.toString();
      if (cadena.match(/\./g))
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    else
    {
      return false;
    }
  }

  borrarCampo(nombreCampo: string): void
  {
    this.formularioRegistro.get(nombreCampo)?.setValue('');
    this.cdRef.detectChanges();
  }

  soloNumerosEnElCampo(nombreCampo: string): void
  {
    const cadena: string = this.formularioRegistro.get(nombreCampo)?.value;
    if (cadena)
    {
      if (!cadena.match(/^[0-9]*$/g))
      {
        const nuevaCadena = cadena.replace(/[\Wa-z_]*/gi, '');
        this.formularioRegistro.get(nombreCampo)?.setValue(nuevaCadena);
      }
    }
  }


}
