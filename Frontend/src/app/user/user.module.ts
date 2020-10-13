import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MainComponent } from './main/main.component';
import { MainPageCardComponent } from './main-page-card/main-page-card.component';
import { HospitalListComponent } from './hospital-list/hospital-list.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { DiseasePredictionComponent } from './disease-prediction/disease-prediction.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MainComponent,
    MainPageCardComponent,
    HospitalListComponent,
    AppointmentComponent,
    DiseasePredictionComponent,
    MainPageComponent,
  ],
  imports: [CommonModule, UserRoutingModule, FormsModule, SharedModule],
  exports: [MainComponent],
})
export class UserModule {}
