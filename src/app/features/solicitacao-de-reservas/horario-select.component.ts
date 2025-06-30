import { Component, EventEmitter, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';

@Component({
  selector: 'dhc-horario-select',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="horario-select">
      <div class="horario-group">
        <button
          *ngFor="let horario of horarios()"
          type="button"
          [class.selected]="horariosSelecionados().includes(horario)"
          (click)="toggleHorario(horario)"
          class="horario-btn"
        >
          {{ formatHorario(horario) }}
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./horario-select.component.scss']
})
export class HorarioSelectComponent {
  horarios = input<string[]>([]);
  formatHorario(horario: string): string {
    const match = horario.match(/^H(\d{2})[_:](\d{2})$/);
    return match ? `${match[1]}:${match[2]}` : horario;
  }

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