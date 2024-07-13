import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-date',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './current-date.component.html',
  styleUrl: './current-date.component.scss',
})
export class CurrentDateComponent implements OnInit {
  currentDate: Date;

  ngOnInit(): void {
    this.updateCurrentDate();
  }

  constructor() {
    this.currentDate = new Date();
  }

  updateCurrentDate(): void {
    setInterval(() => {
      this.currentDate = new Date();
    }, 100);
  }
}
