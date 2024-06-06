import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { DemoAngularMaterailModule } from '../../DemoAngularMaterialModule';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    DemoAngularMaterailModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class EmployeeModule { }
