import { Component, input, OnInit, output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

export type variant = 'textarea' | 'input';
@Component({
  selector: 'dhc-input-text',
  standalone: true,
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  imports: [ReactiveFormsModule]

})
export class InputTextComponent implements OnInit {

  value = signal('');
  label = input('');
  type = input("text");
  placeholder = input('');
  valueChange = output();
  control: FormControl = new FormControl('');
  inputId = signal('');
  variant = input<variant>('input')

  ngOnInit(): void {
    this.inputId.set('input-' + Math.random().toString(36).substring(2, 10));
  }

  onInput(event: Event) {
    this.value.set((event?.target as HTMLInputElement).value);
    this.valueChange.emit();

  }

}