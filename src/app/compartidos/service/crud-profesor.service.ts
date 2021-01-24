import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profesor } from '../interfaces/profesor';



@Injectable({
  providedIn: 'root'
})
export class CrudProfesorService {

  header: HttpHeaders = new HttpHeaders({'Content-Type': 'application/js'});

  constructor(private http: HttpClient) { }

  registrarProfesor(datosProfesor: Profesor): Observable<any>
  {
    const url = 'http://localhost/php/index.php';
    return this.http.post(url, datosProfesor, {headers: this.header});
  }
}
