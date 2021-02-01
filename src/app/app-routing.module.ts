import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './compartidos/guard/login.guard';
import { LoginComponent } from './login/login.component';
import { ProfesorComponent } from './componentes/profesor/profesor.component';
import { AgregarEstudianteComponent } from './componentes/agregar-estudiante/agregar-estudiante.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: LoginComponent},
  { path: 'profesor', component: ProfesorComponent, canActivate: [LoginGuard],
    children: [{path: 'estudiante', component: AgregarEstudianteComponent}]
  },
  { path: 'login', component: LoginComponent},
  {path: '**', pathMatch: 'full', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
