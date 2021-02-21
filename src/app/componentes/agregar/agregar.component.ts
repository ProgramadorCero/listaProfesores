import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Estudiante } from 'src/app/compartidos/interfaces/estudiante';
import { EstudianteService } from '../../compartidos/service/estudiante.service';
declare let alertify: any;

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {

  agregarForm!: FormGroup;
  actualizarForm!: FormGroup;
  listaEstudiantes: any[] = [];
  listaEstudiantesFiltrados: any[] = [];
  valorDelBuscador = '';
  noActulizandoEstudiante = true;

  constructor(
    private agregarBuilder: FormBuilder,
    private estudianteServicio: EstudianteService)
  {}

  ngOnInit(): void
  {
    this.iniciarFormularioAgregar();
    this.iniciarFormularioActualizar();
    this.obtenerEstudiantesDelServidor();
  }

  iniciarFormularioAgregar(): void
  {
    this.agregarForm  = this.agregarBuilder.group(
      {
        identificacion: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
        nombre: ['', [Validators.required, Validators.pattern(/^[a-z ]*$/i)]],
        apellido: ['', [Validators.required, Validators.pattern(/^[a-z ]*$/i)]]
      });
  }
  iniciarFormularioActualizar(): void
  {
    this.actualizarForm  = this.agregarBuilder.group(
      {
        identificacion: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
        nombre: ['', [Validators.required, Validators.pattern(/^[a-z ]*$/i)]],
        apellido: ['', [Validators.required, Validators.pattern(/^[a-z ]*$/i)]]
      });
  }

  validarCampos(formulario: FormGroup): void
  {
    const camposDelFormulario = formulario.getRawValue();
    // tslint:disable-next-line: forin
    for (const nombreCampo in camposDelFormulario)
    {
      const controlDelCampo = formulario.get(nombreCampo);
      const error = controlDelCampo?.invalid;
      this.eliminarUltimoCaracterDelCampo(error, controlDelCampo);
    }
  }

  eliminarUltimoCaracterDelCampo(
    error: boolean | undefined,
    controlDelCampo: AbstractControl | null | undefined): void
  {
    if (error)
    {
      const valorCampo = `${controlDelCampo?.value}`;
      controlDelCampo?.setValue(valorCampo.slice(0, -1));
    }
  }

  validarFormulario(formulario: FormGroup, nombreFormulario: string): void
  {
    console.log(formulario);
    const formularioValido =  formulario.valid;
    if (formularioValido)
    {
      this.formularioElegido(nombreFormulario);
    }
    else
    {
      this.mensajeErrorAlertify('DEBE LLENAR TODOS LOS CAMPOS');
    }
  }

  formularioElegido(nombreFormulario: string): void
  {
    if (nombreFormulario === 'agregar')
    {
      this.enviarDatosDelEstudiante(this.agregarForm.value);
    }
    else
    {
      this.actualizarEstudiante(this.actualizarForm.value);
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

  actualizarEstudiante(datosEstudiante: Estudiante): void
  {
    this.estudianteServicio.actualizarEstudiante(datosEstudiante)
    .subscribe(respuesta => {
      this.mostrarMensajeRespuestaEstudianteActualizado(respuesta);
      this.obtenerEstudiantesDelServidor();
    } ,
    error => this.mensajeErrorAlertify(error));
  }

  mostrarMensajeRespuestaEstudianteActualizado(respuesta: string): void
  {
    if (respuesta === 'ESTUDIANTE ACTUALIZADO')
    {
      this.mensajeSuccessAlertify(respuesta);
    }
    else
    {
      this.mensajeErrorAlertify(respuesta);
    }
  }

  enviarDatosDelEstudiante(datosEstudiante: Estudiante): void
  {
    this.estudianteServicio.registrarEstudiante(datosEstudiante)
    .subscribe(
      respuesta => {
        this.mostrarMensajeRespuestaEstudianteAgregado(respuesta);
        this.obtenerEstudiantesDelServidor();
      } ,
      error => this.mensajeErrorAlertify(error));

  }

  mostrarMensajeRespuestaEstudianteAgregado(respuesta: string | any): void
  {
    if (respuesta === 'ESTUDIANTE AGREGADO')
    {
      this.mensajeSuccessAlertify(respuesta);
    }
    else
    {
      this.mensajeErrorAlertify(respuesta);
    }
  }

  obtenerEstudiantesDelServidor(): void
  {
    this.estudianteServicio.listarEstudiantes()
    .subscribe(
      resultado => this.asignarResultadoAListaEstudiante(resultado),
      error => this.mensajeErrorAlertify(error));
  }

  asignarResultadoAListaEstudiante(resultado: any[] | any): void
  {
    this.listaEstudiantes = resultado;
    this.filtrarEstudiantesEnLaLista();
  }

  filtrarEstudiantesEnLaLista(): void
  {
    const valorEnMinuscula = this.valorDelBuscador.toLowerCase();
    console.log(valorEnMinuscula);
    if (+valorEnMinuscula)
    {
      this.filtrarEstudiantePorIdentificacion(valorEnMinuscula);
    }
    else
    {
      this.filtrarEstudiantesPorNombre(valorEnMinuscula);
    }

  }

  filtrarEstudiantesPorNombre(valorEnMinuscula: string | any): void
  {
    this.listaEstudiantesFiltrados = this.listaEstudiantes.filter(estudiante =>
      {
        let estudianteNombre: string = estudiante.nombres + estudiante.apellidos;
        estudianteNombre = estudianteNombre.toLowerCase();
        const resultadoDeBusqueda = estudianteNombre.indexOf(valorEnMinuscula);
        console.log(resultadoDeBusqueda);
        return this.validarLaBusquedaDelEstudiante(resultadoDeBusqueda);
      });
  }

  filtrarEstudiantePorIdentificacion(valorEnMinuscula: string | any): void
  {
    this.listaEstudiantesFiltrados = this.listaEstudiantes.filter(estudiante =>
      {
        let estudianteIdentificacion: string = estudiante.identificacion;
        estudianteIdentificacion = estudianteIdentificacion.toLowerCase();
        const resultadoDeBusqueda = estudianteIdentificacion.indexOf(valorEnMinuscula);
        return this.validarLaBusquedaDelEstudiante(resultadoDeBusqueda);
      });
  }

  validarLaBusquedaDelEstudiante(resultado: number): boolean
  {
    if (resultado >= 0)
    {
      return true;
    }
    return false;
  }

  eliminarEstudiante(idEstudiante: string): void
  {
    this.estudianteServicio.eliminarEstudiante(idEstudiante)
    .subscribe(resultado =>
      {
        this.obtenerEstudiantesDelServidor();
        this.mensajeEliminarEstudiante(resultado);
      },
      error => this.mensajeErrorAlertify(error));
  }

  mensajeEliminarEstudiante(resultado: string): void
  {
    if (resultado === 'ESTUDIANTE ELIMINADO')
    {
      this.mensajeSuccessAlertify(resultado);
    }
    else
    {
      this.mensajeErrorAlertify(resultado);
    }
  }

  colocarDatosDelEstudianteEnFormularioActualizar(estudiante: any ): void
  {
    this.actualizarForm.setValue(
      {
        identificacion: estudiante.identificacion,
        nombre: estudiante.nombres,
        apellido: estudiante.apellidos
      });
    this.noActulizandoEstudiante = false;
  }

  regresarAlaLista(): void
  {
    this.noActulizandoEstudiante = true;
  }




}
