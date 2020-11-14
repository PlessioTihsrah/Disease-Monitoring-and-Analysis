import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { AppointmentResponse, HospitalSearchResponse } from '../types';
import { Observable } from 'rxjs';
import { UxService } from '../ux.service';

@Injectable({
  providedIn: 'root',
})
export class UserActionService {
  baseURL = 'http://127.0.0.1:5000';
  constructor(private http: HttpClient, private authService: AuthService) {
    this.baseURL = authService.baseURL;
  }
  bookAppointment(hospital: string, date: string) {
    return this.http.post(
      this.baseURL + '/appointments',
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
  getAppointment(closed): Observable<AppointmentResponse> {
    if (closed) {
      return this.http.get<AppointmentResponse>(
        this.baseURL + '/appointments',
        {
          headers: {
            Authorization: 'Bearer ' + this.authService.token,
          },
          params: { closed: 'true' },
        }
      );
    } else {
      return this.http.get<AppointmentResponse>(
        this.baseURL + '/appointments',
        {
          headers: {
            Authorization: 'Bearer ' + this.authService.token,
          },
        }
      );
    }
  }
  public getHospitals(
    state: string,
    district: string,
    pincode: number,
    disease: string,
    page = 1,
    maxResults = 10
  ) {
    const params: any = {
      state,
      district,
      maxResults,
      page,
      disease,
    };
    if (pincode) {
      params.pincode = pincode;
    }
    return this.http.get<HospitalSearchResponse>(this.baseURL + '/hospitals', {
      headers: {
        Authorization: 'Bearer ' + this.authService.token, // `Bearer ${this.authService.token}`,
      },
      params,
    });
  }

  getSymptoms() {
    return this.http.get(this.baseURL + '/symptoms');
  }
  predictDisease(symptomsArray: { item_id: string; item_text: string }[]) {
    const symptoms = [];
    symptomsArray.forEach((symptom) => {
      symptoms.push(symptom.item_id);
    });
    return this.http.get(this.baseURL + '/predict', {
      params: {
        symptoms: symptoms.join(','),
      },
    });
  }
}
