import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-doctor-signup',
  templateUrl: './doctor-signup.component.html',
  styleUrls: ['./doctor-signup.component.css'],
})
export class DoctorSignupComponent implements OnInit {
  email: string = '';
  password: string = '';
  hospital: string = '';
  name: string = '';
  mobileNo: number = 0;

  constructor(private authService: AuthService) {}
  onSubmit(event) {
    event.preventDefault();
    this.authService.signupDoctor(
      this.email,
      this.password,
      this.hospital,
      this.name,
      this.mobileNo
    );
  }

  ngOnInit(): void {}
}
