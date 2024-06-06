import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DemoAngularMaterailModule } from '../../DemoAngularMaterialModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DemoAngularMaterailModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
