import { CommonModule } from '@angular/common';
import { Component, forwardRef, input, output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'dhc-input-select',
  standalone: true,
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
  imports: [FormsModule, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true
    }
  ]
})
export class InputSelectComponent implements ControlValueAccessor {

 onSelectChangeFromModel() {
  // método vazio
}

  value = '';
  label = input('');
  placeholder = input('');
  options = input<string[]>();
  valueChange = output<string>();

  private _onChange?: (value: string) => void;
  private _onTouched?: () => void;

  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  selectValue(value: string): void {
    this.value = value;
    this._onChange?.(value);
    this._onTouched?.();
  }
}
