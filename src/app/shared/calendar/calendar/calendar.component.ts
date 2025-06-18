import { Component, forwardRef, Input } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export type Mode = 'range' | 'multiple' | 'single';

@Component({
  selector: 'dhc-calendar',
  imports: [ CalendarModule, FormsModule ],
  templateUrl: './calendar.component.html',
  standalone: true,
  styleUrl: './calendar.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarComponent),
      multi: true
    }
  ]
})
export class CalendarComponent implements ControlValueAccessor {
  dates: Date | Date[] | null = null;
  @Input() selectionMode: Mode = 'single';

  onChange: (value: Date | Date[] | null) => void = () => { void 0; };
  onTouched: () => void = () => { void 0; };

  writeValue(value: Date | Date[] | null): void {
    this.dates = value;
  }

  registerOnChange(fn: (value: Date | Date[] | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    void isDisabled;
  }

  onDatesChange(value: Date | Date[] | null) {
    this.dates = value;
    this.onChange(value);
    this.onTouched();
  }
}