import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { CelulaQuadroComponent } from '../celula-quadro/celula-quadro.component';
import { ReservaDTO } from '../models/reserva.dto';

@Component({
  selector:'dhc-schedule-table', 
  standalone: true, 
  imports: [CommonModule, CelulaQuadroComponent, NgIf, NgFor], 
  templateUrl: './schedule-table.component.html', 
  styleUrls: ['./schedule-table.component.scss'] 
})
export class ScheduleTableComponent {

  isLoaded = false;
  @Input() scheduleData: ReservaDTO[][] = [] 
  @Input() shift = 'todos';
  @Output() cellSelected = new EventEmitter<ReservaDTO>();

  get visibleItemsFiltered() {
    return this.scheduleData.filter(row => row.some(cell => cell !== undefined));
  }
  get maxCells(): number {
    return this.shift === 'todos' ? 6 : 2;
  }

  onCellClicked(cellData: ReservaDTO) {
    this.cellSelected.emit(cellData);
  }
  getRoomName(row: ReservaDTO[]): string {
    for (const cell of row) {
      if (cell) return cell.salaReservada.nomeSala
    }
    return 'Sala não informada'
  }
}