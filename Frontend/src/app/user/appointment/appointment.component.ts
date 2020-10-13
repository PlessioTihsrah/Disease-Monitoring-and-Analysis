import { Component, OnInit } from '@angular/core';
import { UserActionService } from '../user-action.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {
  constructor(
    private userActionService: UserActionService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((p) => {
      if (p.type === 'closed') {
        this.getData(true);
      } else {
        this.getData(false);
      }
    });
  }
  getData(closed: boolean) {
    this.userActionService.getAppointment(closed).subscribe((res) => {
      console.log(res);
    });
  }
  ngOnInit(): void {}
}
