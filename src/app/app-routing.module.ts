import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './compartidos/guard/login.guard';
import { LoginComponent } from './login/login.component';
import { ProfesorComponent } from './componentes/profesor/profesor.component';
import { AgregarComponent } from './componentes/agregar/agregar.component';
import { InstitucionComponent } from './componentes/institucion/institucion.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: LoginComponent},
  { path: 'profesor', component: ProfesorComponent, canActivate: [LoginGuard],
    canActivateChild: [],
    children:
    [
      {path: 'agregar', component: AgregarComponent },
      {path: 'institucion', component: InstitucionComponent }
    ]
  },
  { path: 'login', component: LoginComponent},
  {path: '**', pathMatch: 'full', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
