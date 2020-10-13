import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { AppointmentResponse, HospitalSearchResponse } from '../types';

@Injectable({
  providedIn: 'root',
})
export class UserActionService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  showToast(title: string, content: string): void {
    this.authService.showToast(title, content);
  }

  bookAppointment(hospital: string, date: string) {
    return this.http.post(
      'https://realtimehospital.herokuapp.com/appointments',
      {
        hospital,
        date,
      },
      {
        headers: {
          Authorization: 'Bearer ' + this.authService.token,
        },
      }
    );
  }
  getAppointment(closed = false) {
    return this.http.get<AppointmentResponse>(
      'https://realtimehospital.herokuapp.com/appointments',
      {
        headers: {
          Authorization: 'Bearer ' + this.authService.token,
        },
        params: {
          closed: closed.toString(),
        },
      }
    );
  }
  public getHospitals(
    state: string,
    district: string,
    pincode: number,
    page = 1,
    maxResults = 10
  ) {
    const params: any = {
      state,
      district,
      maxResults,
      page,
    };
    if (pincode) {
      params.pincode = pincode;
    }
    return this.http.get<HospitalSearchResponse>(
      'https://realtimehospital.herokuapp.com/hospitals',
      {
        headers: {
          Authorization: 'Bearer ' + this.authService.token, // `Bearer ${this.authService.token}`,
        },
        params,
      }
    );
  }
}
