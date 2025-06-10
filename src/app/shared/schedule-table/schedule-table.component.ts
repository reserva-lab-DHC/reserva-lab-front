import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { CelulaQuadroComponent } from '../celula-quadro/celula-quadro.component';

@Component({
  selector:'dhc-schedule-table', 
  standalone: true, 
  imports: [CommonModule, CelulaQuadroComponent, NgIf, NgFor], 
  templateUrl: './schedule-table.component.html', 
  styleUrls: ['./schedule-table.component.scss'] 
})
export class ScheduleTableComponent {

  @Input() scheduleData: { teacher: string; lab: string, disciplina: string, dia_e_horario: string, inicio: string, duracao: string }[][] = [];
  @Output() cellSelected = new EventEmitter<{ teacher: string; lab: string, disciplina: string, dia_e_horario: string, inicio: string, duracao: string }>();

  onCellClicked(cellData: { teacher: string; lab: string, disciplina: string, dia_e_horario: string, inicio: string, duracao: string }) {
    this.cellSelected.emit(cellData);
  }

  @Input() shift = 'todos';

  get maxCells(): number {
  return this.shift === 'todos' ? 6 : 2;
  
  }

  get visibleItems(): { teacher: string; lab: string, disciplina: string, dia_e_horario: string, inicio: string, duracao: string }[][] {
  return this.scheduleData;
}
}