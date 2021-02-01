import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  constructor()
  {
  }

  guardarIdentificacionLocalStorage(identificacion: string): void
  {
    localStorage.setItem('identificacion', identificacion);
  }

  eliminarIdentificacionLocalStorage(): void
  {
    localStorage.removeItem('identificacion');
  }

  obtenerIdentificacionLocalStorage(): string | null
  {
    return localStorage.getItem('identificacion');
  }

}
