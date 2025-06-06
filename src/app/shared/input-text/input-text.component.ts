import { Component, input, OnInit, output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'dhc-input-text',
  standalone: true,
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  imports: [ReactiveFormsModule]
  
})
export class InputTextComponent implements OnInit {

  value = signal('');
  label =input('');  
  type = input("text");
  placeholder = input('');
  valueChange = output<string>();
  control: FormControl = new FormControl('');
  inputId = signal('');

  ngOnInit(): void {
    this.inputId.set('input-' + Math.random().toString(36).substring(2, 10));
  }
  
onInput(event: Event) {
  const valor = (event?.target as HTMLInputElement).value;
  this.value.set(valor);
  this.valueChange.emit(valor); //emitir string corretamente
}


  }