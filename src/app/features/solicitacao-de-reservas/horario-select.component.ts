import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dhc-horario-select',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="horario-select">
      
      <div class="horario-group">
        <button
          *ngFor="let horario of horarios"
          type="button"
          [class.selected]="horariosSelecionados().includes(horario)"
          (click)="toggleHorario(horario)"
          class="horario-btn"
        >
          {{ horario }}
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./horario-select.component.scss']
})
export class HorarioSelectComponent {
  horarios = [
     '19:00', '20:00'
  ];

  horariosSelecionados = signal<string[]>([]);

  @Output() horarioChange = new EventEmitter<string[]>();

  toggleHorario(horario: string) {
    this.horariosSelecionados.update(current => {
      const newSelection = current.includes(horario)
        ? current.filter(h => h !== horario)
        : [...current, horario];
      
      this.horarioChange.emit(newSelection);
      return newSelection;
    });
  }
}