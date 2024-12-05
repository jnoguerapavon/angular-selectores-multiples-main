import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CountriesRoutingModule } from './countries-routing.module';

import { SelectorPageComponent } from './pages/selector-page/selector-page.component';

import { SpinnerComponent } from '../shared/components/spinner/spinner.component';



@NgModule({
  declarations: [
    SelectorPageComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule, // Importa el módulo aquí

  ],
  providers: [ /* servicios */]
})
export class CountriesModule { }
