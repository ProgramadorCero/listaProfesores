import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante } from '../interfaces/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  header: HttpHeaders = new HttpHeaders({'Content-Type': 'application/js'});
  url = 'http://localhost/php';

  constructor(private http: HttpClient) { }

  registrarEstudiante(datosEstudiante: Estudiante): Observable<any>
  {
    const urlAgregarEstudiante = this.url + '/estudiante/agregar.php';
    return this.http.post(urlAgregarEstudiante, datosEstudiante, {headers: this.header});
  }

  listarEstudiantes(): Observable<any>
  {
    const urlListarEstudiante = this.url + '/estudiante/listar.php';
    return this.http.get(urlListarEstudiante, {headers: this.header});
  }

  eliminarEstudiante(idEstudiante: string): Observable<any>
  {
    const urlAgregarEstudiante = this.url + '/estudiante/eliminar.php';
    return this.http.post(urlAgregarEstudiante, idEstudiante, {headers: this.header});
  }


  actualizarEstudiante(datosEstudiante: Estudiante): Observable<any>
  {
    const urlAgregarEstudiante = this.url + '/estudiante/actualizar.php';
    return this.http.post(urlAgregarEstudiante, datosEstudiante, {headers: this.header});
  }


}
