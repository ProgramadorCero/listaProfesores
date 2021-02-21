import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  header: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/js'});
  prueba?: any;
  urlServidor = 'http://localhost/php/';
  constructor(private http: HttpClient)
  {
    this.usuarioLoggeado();
  }

  guardarIdentificacionLocalStorage(id: string): void
  {
    localStorage.setItem('idSession', id);
  }

  eliminarIdentificacionLocalStorage(): void
  {
    localStorage.removeItem('idSession');
  }

  obtenerIdentificacionLocalStorage(): string | null
  {
    return localStorage.getItem('idSession');
  }

  usuarioLoggeado(): Promise<any>
  {
    const url = `${this.urlServidor}verificacionLoguin.php`;
    return this.http.get(url, {headers: this.header}).toPromise();
  }

  finalizarSession(): Observable<any>
  {
    const url = `${this.urlServidor}finalizarSeccion.php`;
    return this.http.get(url, {headers: this.header});
  }

}
