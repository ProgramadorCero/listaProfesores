import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacionFormularioService {

  static validacionRegistro = {
    nombre: [
      { tipo: 'required', texto: 'El nombre es requerido'},
      { tipo: 'maxlength', texto: 'El limite de letra es de 20'},
      { tipo: 'pattern', texto: 'El solo se permiten letras'},
    ],
    identificacion: [
      { tipo: 'required', texto: 'La identificación es necesaria'},
      { tipo: 'pattern', texto: 'La identificación no debe tener punto'}
    ],
    password: [{ tipo: 'required', texto: 'La contraseña es necesaria'}],
    email: [
      { tipo: 'required', texto: 'El correo electronico es requerido'},
      { tipo: 'email', texto: 'El correo electronico es invalido'}
    ]
  };
}