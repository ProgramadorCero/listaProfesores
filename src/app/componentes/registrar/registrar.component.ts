import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ValidacionFormularioService } from 'src/app/compartidos/validacion-formulario/validacion-formulario.service';
import { AuthServiceService } from '../../compartidos/auth/auth-service.service';
declare let alertify: any;


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {

  formularioRegistro!: FormGroup;
  validacionFormularioRegistro = ValidacionFormularioService.validacionRegistro;
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
    alertify.set('notifier', 'position', 'top-center');
    alertify.success('Profesor registrado exitosamente');
    console.log(elemento);
  }

}
