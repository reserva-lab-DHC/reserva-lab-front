import { Component, input } from '@angular/core';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';

export type Mode = 'range' | 'multiple' | 'single';

@Component({
  selector: 'dhc-calendar',
  imports: [ DatePickerModule, FormsModule ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})

export class CalendarComponent {
  dates: Date[] = [];
  /* selectionMode -> 'range' | 'multiple' | 'single' */
  selectionMode = input<Mode>('single');
}