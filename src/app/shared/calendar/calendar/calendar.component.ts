import { Component, input, output } from '@angular/core';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';

export type Mode = 'range' | 'multiple' | 'single';

@Component({
  selector: 'dhc-calendar',
  imports: [DatePickerModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})

export class CalendarComponent {
  date = input<Date | null>(null);
  /* selectionMode -> 'range' | 'multiple' | 'single' */
  selectionMode = input<Mode>('single');
  dateChange = output<Date | null>();
  
  get modelDate(): Date | null {
    return this.date();
  }
  set modelDate(value: Date | null) {
    this.dateChange.emit(value);
  }

  onDateChange(value: Date) {
    this.dateChange.emit(value);
  }
}