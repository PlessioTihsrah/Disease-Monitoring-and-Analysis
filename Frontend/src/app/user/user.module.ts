import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageCardComponent } from './main-page-card/main-page-card.component';
import { HospitalListComponent } from './hospital-list/hospital-list.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { DiseasePredictionComponent } from './disease-prediction/disease-prediction.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    MainPageCardComponent,
    HospitalListComponent,
    AppointmentComponent,
    DiseasePredictionComponent,
    MainPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    NgMultiSelectDropDownModule,
  ],
  exports: [],
})
export class UserModule {}
