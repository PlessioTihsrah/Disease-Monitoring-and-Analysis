import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { DoctorSignupComponent } from './doctor-signup/doctor-signup.component';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { HospitalAdminLoginComponent } from './hospital-admin-login/hospital-admin-login.component';
import { HospitalAdminSignupComponent } from './hospital-admin-signup/hospital-admin-signup.component';
import { SuperAdminSignupComponent } from './super-admin-signup/super-admin-signup.component';
import { SuperAdminLoginComponent } from './super-admin-login/super-admin-login.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserLoginComponent,
    UserSignupComponent,
    DoctorSignupComponent,
    DoctorLoginComponent,
    HospitalAdminLoginComponent,
    HospitalAdminSignupComponent,
    SuperAdminSignupComponent,
    SuperAdminLoginComponent,
    MainComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [MainComponent],
})
export class AuthenticationModule {}
