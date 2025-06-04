import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dhc-app-daily-schedule-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily-schedule-header.component.html',
  styleUrls: ['./daily-schedule-header.component.scss']
})
export class DailyScheduleHeaderComponent implements OnInit, AfterViewInit {

  showCalendar = false;
  currentCalendarDate: Date = new Date();
  selectedMainDate: Date = new Date();

  titleCase(value: string): string {
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
  }

  titleCaseMonth(value: string): string {
    return value
      ? value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      : '';
  }

  ngOnInit(): void {
    this.updateMainDateDisplay();
  }

  updateMainDateDisplay(): void {
    // Implement your logic here, for example:
    // This could update a display string or perform other actions
    // For now, we'll just log the selectedMainDate
    console.log('Main date display updated:', this.selectedMainDate);
  }

    ngAfterViewInit(): void {
      this.generateCalendarDays();
      // this.addEventListeners(); // Removed or comment out this line to fix the error
    }
  
    generateCalendarDays(): void {
      // Implement your logic here
      // For now, we'll just log to indicate the method is called
      console.log('generateCalendarDays called');
    }
  }
