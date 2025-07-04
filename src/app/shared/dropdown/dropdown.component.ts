import { Component, EventEmitter, input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Option {
  label: string;
  value: string;
};
type Turno = 'matutino' | 'vespertino' | 'noturno' | 'todos';
@Component({
  selector: 'dhc-dropdown',
  templateUrl: './dropdown.component.html',
  imports: [CommonModule],
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {


  @Output() shiftSelected = new EventEmitter<Turno>();
  isOpen = signal(false);
  selected = signal('Todos');
  options = input<{ label: string, value: string }[]>([
    { label: 'Matutino', value: 'matutino' },
    { label: 'Vespertino', value: 'vespertino' },
    { label: 'Noturno', value: 'noturno' },
    { label: 'Todos', value: 'todos' }
  ]);

  toggleDropdown() {
    this.isOpen.set(!this.isOpen());
  }

  selectOption(option: Option) {
    this.selected.set(option.label);
    this.isOpen.set(false);
    this.shiftSelected.emit(option.value as Turno);
    console.log('Selecionado:', option.label, option.value);
  }

  closeDropdown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-dropdown')) {
      this.isOpen.set(false);
    }
  }
}
