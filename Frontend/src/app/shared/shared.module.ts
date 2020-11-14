import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccordionComponent } from './accordion/accordion.component';
import { AppointmentCardComponent } from './appointment-card/appointment-card.component';

@NgModule({
  declarations: [
    PaginationComponent,
    AccordionComponent,
    AppointmentCardComponent,
  ],
  imports: [CommonModule, FontAwesomeModule],
  exports: [PaginationComponent, AccordionComponent, AppointmentCardComponent],
})
export class SharedModule {}
