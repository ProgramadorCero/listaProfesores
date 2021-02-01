// Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ImportsModule } from './imports/imports/imports.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrarComponent } from './componentes/registrar/registrar.component';
import { ProfesorComponent } from './componentes/profesor/profesor.component';
import { AgregarEstudianteComponent } from './componentes/agregar-estudiante/agregar-estudiante.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarComponent,
    ProfesorComponent,
    AgregarEstudianteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ImportsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
