import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  header: HttpHeaders = new HttpHeaders (
    {'Content-type': 'application/json'}
    );
  constructor(private http: HttpClient) { }

  agregarProfesor(): Observable<any>
  {
    const url = 'http://localhost/php/index.php';
    return  this.http.post(url, { 'hola' : 'mundo'}, {headers: this.header});
  }
}
