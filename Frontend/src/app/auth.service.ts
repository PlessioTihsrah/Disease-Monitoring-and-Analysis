import {
  HospitalAdminAuthResponse,
  SuperAdminAuthResponse,
  UserAuthResponse,
  DoctorAuthResponse,
} from './types';

declare var halfmoon;
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;
  user: any;
  userType = '';
  token = '';

  constructor(
    private http: HttpClient,
    private spinnerService: NgxSpinnerService
  ) {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.userType = localStorage.getItem('userType');
      this.token = localStorage.getItem('token');
      this.loggedIn = true;
    }
  }
  showToast(title: string, content: string): void {
    halfmoon.initStickyAlert({
      content,
      title,
    });
  }
  private setUser(user: any, type: string, token: string): void {
    this.user = user;
    this.loggedIn = true;
    this.userType = type;
    this.token = token;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userType', type);
    localStorage.setItem('token', token);
  }
  signupUser(
    email: string,
    password: string,
    dob: string,
    name: string,
    mobile: number
  ): void {
    dob = dob.split('-').reverse().join('/');
    this.spinnerService.show();
    this.http
      .post('https://realtimehospital.herokuapp.com/signup/user', {
        email,
        password,
        dob,
        name,
        mobile: '' + mobile,
      })
      .subscribe((response: UserAuthResponse) => {
        this.spinnerService.hide();
        if (!response.success) {
          this.showToast('Error', response.message);
        } else {
          this.setUser(response.user, 'user', response.token);
        }
      });
  }
  signupDoctor(
    email: string,
    password: string,
    hospital: string,
    name: string,
    mobile: number
  ): void {
    console.log(email, password, hospital, name, mobile);
    this.http
      .post('https://realtimehospital.herokuapp.com/signup/doctor', {
        email,
        password,
        hospital,
        name,
        mobile: '' + mobile,
      })
      .subscribe((response: DoctorAuthResponse) => {
        if (!response.success) {
          this.showToast('Error', response.message);
        } else {
          this.setUser(response.doctor, 'doctor', response.token);
        }
      });
  }
  signupHospitalAdmin(
    email: string,
    password: string,
    hospital: string,
    name: string
  ): void {
    console.log(email, password, hospital, name);
    this.http
      .post('https://realtimehospital.herokuapp.com/signup/hospital-admin', {
        email,
        password,
        hospital,
        name,
      })
      .subscribe((response: HospitalAdminAuthResponse) => {
        if (!response.success) {
          this.showToast('Error', response.message);
        } else {
          this.setUser(
            response.hospital_admin,
            'hospital_admin',
            response.token
          );
        }
      });
  }
  signupSuperAdmin(email: string, password: string): void {
    this.http
      .post('https://realtimehospital.herokuapp.com/signup/super-admin', {
        email,
        password,
      })
      .subscribe((response: SuperAdminAuthResponse) => {
        if (!response.success) {
          this.showToast('Error', response.message);
        } else {
          this.setUser(response.super_admin, 'super_admin', response.token);
        }
      });
  }
  loginUser(email: string, password: string): void {
    this.spinnerService.show();
    this.http
      .post('https://realtimehospital.herokuapp.com/login/user', {
        email,
        password,
      })
      .subscribe((response: UserAuthResponse) => {
        this.spinnerService.hide();
        if (!response.success) {
          this.showToast('Error', response.message);
        } else {
          this.setUser(response.user, 'user', response.token);
        }
      });
  }
  loginDoctor(email: string, password: string): void {
    this.http
      .post('https://realtimehospital.herokuapp.com/login/doctor', {
        email,
        password,
      })
      .subscribe((response: DoctorAuthResponse) => {
        if (!response.success) {
          this.showToast('Error', response.message);
        } else {
          this.setUser(response.doctor, 'doctor', response.token);
        }
      });
  }
  loginSuperAdmin(email: string, password: string): void {
    this.http
      .post('https://realtimehospital.herokuapp.com/login/super-admin', {
        email,
        password,
      })
      .subscribe((response: SuperAdminAuthResponse) => {
        if (!response.success) {
          this.showToast('Error', response.message);
        } else {
          this.setUser(response.super_admin, 'super_admin', response.token);
        }
      });
  }
  loginHospitalAdmin(email: string, password: string): void {
    this.http
      .post('https://realtimehospital.herokuapp.com/login/hospital-admin', {
        email,
        password,
      })
      .subscribe((response: HospitalAdminAuthResponse) => {
        if (!response.success) {
          this.showToast('Error', response.message);
        } else {
          this.setUser(
            response.hospital_admin,
            'hospital_admin',
            response.token
          );
        }
      });
  }
  logout(): void {
    this.loggedIn = false;
    this.user = {};
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    localStorage.removeItem('token');
  }
}
