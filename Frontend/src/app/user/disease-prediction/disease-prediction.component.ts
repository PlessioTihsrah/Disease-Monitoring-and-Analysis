import { Component, OnInit } from '@angular/core';
import { UserActionService } from '../user-action.service';
import { UxService } from '../../ux.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-disease-prediction',
  templateUrl: './disease-prediction.component.html',
  styleUrls: ['./disease-prediction.component.css'],
})
export class DiseasePredictionComponent implements OnInit {
  symptoms: { item_id: string; item_text: string }[] = [];
  abc = [];
  prediction = '';
  dropdownSettings: IDropdownSettings = {};
  constructor(private userService: UserActionService, private ux: UxService) {
    this.ux.startSpinner();
    this.userService.getSymptoms().subscribe((data: any) => {
      this.ux.stopSpinner();
      if (data.success) {
        this.setSymptoms(data.symptoms);
      } else {
        this.ux.showToast(
          'Error',
          data.message || 'Something went wrong. Please try again later'
        );
      }
    }, this.ux.errHandler);
  }
  setSymptoms(symptoms: string[]): void {
    this.symptoms = [];
    symptoms.forEach((symptom) => {
      this.symptoms.push({
        item_id: symptom,
        item_text: this.formatSymptom(symptom),
      });
    });
  }

  formatSymptom(symptom: string): string {
    return symptom
      .split('_')
      .map((v) => v[0].toLocaleUpperCase() + v.slice(1))
      .join(' ');
  }
  predict() {
    if (this.abc.length) {
      this.ux.startSpinner();
      this.userService.predictDisease(this.abc).subscribe((res: any) => {
        this.ux.stopSpinner();
        if (res.success) {
          this.prediction = res.disease;
        } else {
          this.ux.showToast('Error', res.message || 'Something went wrong');
        }
      }, this.ux.errHandler);
    } else {
      this.ux.showToast('Error', 'Symptoms empty');
    }
  }
  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };
  }
}
