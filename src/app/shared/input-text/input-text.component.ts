import { Component, input, OnInit, signal, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'dhc-input-text',
  standalone: true,
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  imports: [ReactiveFormsModule]
})
export class InputTextComponent implements OnInit {

  label = input('');
  type = input("text");
  placeholder = input('');
 
  @Input() control!: FormControl;

  inputId = signal('');

  ngOnInit(): void {
    this.inputId.set('input-' + Math.random().toString(36).substring(2, 10));
  }
}