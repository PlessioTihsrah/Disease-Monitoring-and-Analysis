import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalAdminRoutingModule } from './hospital-admin-routing.module';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, HospitalAdminRoutingModule],
  exports: [MainComponent],
})
export class HospitalAdminModule {}
