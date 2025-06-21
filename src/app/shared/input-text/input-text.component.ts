import { Component, forwardRef, input, OnInit, output, signal, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

export type variant = 'textarea' | 'input';

@Component({
  selector: 'dhc-input-text',
  standalone: true,
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent implements OnInit, ControlValueAccessor {
  value: string | undefined;

  label = input('');
  type = input("text");
  placeholder = input('');
  valueChange = output<string>(); 

  @Input() control!: FormControl;

  inputId = signal('');
  variant = input<variant>('input');

  private _onChange?: (value: string) => void;
  private _onTouched?: () => void;

  ngOnInit(): void {
    this.inputId.set('input-' + Math.random().toString(36).substring(2, 10));
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDisabledState?(isDisabled: boolean): void {
    // Agora só desabilita a regra para 'isDisabled' não usado.
  }
  
  onInput() {
    this._onChange?.(this.control.value);
    this._onTouched?.();
  }
}