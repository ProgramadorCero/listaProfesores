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
import { SideBarComponent } from './componentes/profesor/componentes/side-bar/side-bar.component';
import { HeaderComponent } from './componentes/profesor/componentes/header/header.component';
import { AgregarComponent } from './componentes/agregar/agregar.component';
import { InstitucionComponent } from './componentes/institucion/institucion.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarComponent,
    ProfesorComponent,
    SideBarComponent,
    HeaderComponent,
    AgregarComponent,
    InstitucionComponent,
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
