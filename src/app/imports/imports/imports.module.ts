import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// http
import {HttpClientModule} from '@angular/common/http';

// Modulos Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular material
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule
  ]
})
export class ImportsModule { }
