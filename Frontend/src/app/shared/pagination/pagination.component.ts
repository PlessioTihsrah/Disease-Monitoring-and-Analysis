import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number;
  @Input() maxPage: number;
  @Output() clickedPage = new EventEmitter<number>();
  leftIcon = faArrowLeft;
  rightIcon = faArrowRight;
  constructor() {}
  changePage(i: number) {
    if (i >= 1 && i <= this.maxPage && i !== this.currentPage) {
      this.clickedPage.emit(i);
    }
  }
  ngOnInit(): void {}
}
