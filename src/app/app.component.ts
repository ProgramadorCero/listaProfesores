import { Component } from '@angular/core';
import { AuthServiceService } from './compartidos/auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'listaprofesores';

  constructor(private auth: AuthServiceService ){}

  obtenerUsuarioLoggeado(): boolean
  {
    return true;
  }
}
