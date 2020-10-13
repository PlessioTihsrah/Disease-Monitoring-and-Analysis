import { Component, OnInit } from '@angular/core';
import { UserActionService } from '../user-action.service';
import { BookAppointment, HospitalData } from '../../types';

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
  constructor(private userActionService: UserActionService) {}
  onSubmit(event) {
    event.preventDefault();
    this.changePage(1);
  }
  changePage(page: number) {
    this.userActionService
      .getHospitals(
        this.state,
        this.district,
        this.pincode,
        page,
        this.maxResults
      )
      .subscribe((res) => {
        console.log(res);
        this.opened = -1;
        if (res.success) {
          this.hospitals = res.data;
          this.page = res.page;
          this.totalPages = res.totalPages;
          this.totalRecords = res.totalRecords;
        } else {
          this.userActionService.showToast('Error', res.message);
          this.hospitals = [];
        }
      });
  }

  book(hospital: string, date: string) {
    console.log(hospital, date);
    date = date.replace(/-/g, '/').replace('T', ' ');
    this.userActionService
      .bookAppointment(hospital, date)
      .subscribe((res: BookAppointment) => {
        if (res.success) {
          this.userActionService.showToast('successful', 'booking done');
          this.opened = -1;
        } else {
          this.userActionService.showToast('Error', res.message);
        }
      });
  }

  ngOnInit(): void {}
}
