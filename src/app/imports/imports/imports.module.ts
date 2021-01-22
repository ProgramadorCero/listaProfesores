import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// http
import {HttpClientModule} from '@angular/common/http';

// Modulos Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ImportsModule { }
