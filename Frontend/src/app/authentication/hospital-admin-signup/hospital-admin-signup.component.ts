import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-hospital-admin-signup',
  templateUrl: './hospital-admin-signup.component.html',
  styleUrls: ['./hospital-admin-signup.component.css'],
})
export class HospitalAdminSignupComponent implements OnInit {
  email: string = '';
  password: string = '';
  hospital: string = '';
  name: string = '';

  constructor(private authService: AuthService) {}
  onSubmit(event) {
    event.preventDefault();
    this.authService.signupHospitalAdmin(
      this.email,
      this.password,
      this.hospital,
      this.name
    );
  }

  ngOnInit(): void {}
}
