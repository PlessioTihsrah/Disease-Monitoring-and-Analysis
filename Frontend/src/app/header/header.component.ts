import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UxService } from '../ux.service';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, public ux: UxService) {}
  moonIcon = faMoon;
  sunIcon = faSun;
  ngOnInit(): void {}
  logout(): void {
    this.authService.logout();
  }
  getIcon() {
    return this.ux.dark ? this.moonIcon : this.sunIcon;
  }
}
