import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
declare var halfmoon;
@Injectable({
  providedIn: 'root',
})
export class UxService {
  dark = JSON.parse(localStorage.getItem('dark')) || false;
  showToast(title: string, content: string): void {
    halfmoon.initStickyAlert({
      content,
      title,
    });
  }
  constructor(private spinner: NgxSpinnerService) {
    if (this.dark) {
      halfmoon.toggleDarkMode();
    }
  }
  startSpinner(): void {
    this.spinner.show();
  }
  stopSpinner(): void {
    this.spinner.hide();
  }
  toggleDarkMode(): void {
    halfmoon.toggleDarkMode();
    this.dark = !this.dark;
    localStorage.setItem('dark', JSON.stringify(this.dark));
  }
  errHandler = (err): void => {
    this.stopSpinner();
    const message = err.message || 'Something went wrong';
    this.showToast('Error', message);
  };
}
