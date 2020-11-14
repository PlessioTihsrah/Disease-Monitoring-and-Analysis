import { Component, OnInit } from '@angular/core';
import { UserActionService } from '../user-action.service';
import { BookAppointment, HospitalData } from '../../types';
import { UxService } from '../../ux.service';

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.css'],
})
export class HospitalListComponent implements OnInit {
  district = '';
  state = '';
  pincode: number;
  maxResults = 9;
  hospitals: HospitalData[] = [];
  page = 1;
  totalPages: number;
  totalRecords: number;
  opened = -1;
  date = '';
  disease = '';
  diseases: string[] = [];
  constructor(
    private userActionService: UserActionService,
    private ux: UxService
  ) {
    this.diseases = [
      'Fungal infection',
      'Allergy',
      'GERD',
      'Chronic cholestasis',
      'Drug Reaction',
      'Peptic ulcer disease',
      'AIDS',
      'Diabetes',
      'Gastroenteritis',
      'Bronchial Asthma',
      'Hypertension',
      ' Migraine',
      'Cervical spondylosis',
      'Paralysis (brain hemorrhage)',
      'Jaundice',
      'Malaria',
      'Chicken pox',
      'Dengue',
      'Typhoid',
      'hepatitis A',
      'Hepatitis B',
      'Hepatitis C',
      'Hepatitis D',
      'Hepatitis E',
      'Alcoholic hepatitis',
      'Tuberculosis',
      'Common Cold',
      'Pneumonia',
      'Dimorphic hemorrhoids(piles)',
      'Heart Attack',
      'Varicose Veins',
      'Hypothyroidism',
      'Hyperthyroidism',
      'Hypoglycemia',
      'Osteoarthritis',
      'Arthritis',
      '(vertigo) Paroxysmal  Positional Vertigo',
      'Acne',
      'Urinary tract infection',
      'Psoriasis',
      'Impetigo',
    ];
  }
  onSubmit(event): void {
    event.preventDefault();
    this.changePage(1);
  }

  changePage(page: number): void {
    this.ux.startSpinner();
    this.userActionService
      .getHospitals(
        this.state,
        this.district,
        this.pincode,
        this.disease,
        page,
        this.maxResults
      )
      .subscribe((res) => {
        this.ux.stopSpinner();
        this.opened = -1;
        if (res.success) {
          this.hospitals = res.data;
          this.page = res.page;
          this.totalPages = res.totalPages;
          this.totalRecords = res.totalRecords;
        } else {
          this.ux.showToast('Error', res.message);
          this.hospitals = [];
        }
      }, this.ux.errHandler);
  }

  book(hospital: string, date: string): void {
    this.ux.startSpinner();
    const dateArray = date.split('T');
    date = dateArray[0].split('-').reverse().join('/') + ' ' + dateArray[1];
    this.userActionService
      .bookAppointment(hospital, date)
      .subscribe((res: BookAppointment) => {
        this.ux.stopSpinner();
        if (res.success) {
          this.ux.showToast('Success', 'Booking Done Successfully');
          this.opened = -1;
        } else {
          this.ux.showToast('Error', res.message);
        }
      }, this.ux.errHandler);
  }

  ngOnInit(): void {}
}
