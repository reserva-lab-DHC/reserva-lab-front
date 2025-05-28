import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'dhc-input-select',
  standalone: true,
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class InputSelectComponent {

  value = signal('');
  label = input('');
  placeholder = input('');
  options = input(['']);
  valueChange = output();

  onSelectChangeFromModel(value: string) {
    if (value !== undefined) {
      this.value.set(value);
      this.valueChange.emit();
    }
  }
}
