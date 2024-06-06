import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DemoAngularMaterailModule } from '../DemoAngularMaterialModule';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet,
    // MatGridListModule,
    // MatButtonModule,
    // MatIconModule,
    // MatFormFieldModule,
    // MatInputModule,
    DemoAngularMaterailModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet,
    // MatGridListModule,
    // MatButtonModule,
    // MatIconModule,
    // MatFormFieldModule,
    // MatInputModule,
    DemoAngularMaterailModule
  ]
})
export class SharedModule { }
