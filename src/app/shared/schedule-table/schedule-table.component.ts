import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
export class ScheduleTableComponent implements OnChanges {

  isLoaded = false;
  @Input() scheduleData: Map<string, ReservaDTO | undefined>[] = []
  @Input() shift = 'todos';
  @Output() cellSelected = new EventEmitter<ReservaDTO>();
  labAdded: string[] = []
  get visibleItemsFiltered() {
    return this.scheduleData.filter(row => [...row.values()].some(cell => cell !== undefined));
  }
  get maxCells(): number {
    return this.shift === 'todos' ? 6 : 2;
  }

  onCellClicked(cellData: ReservaDTO) {
    this.cellSelected.emit(cellData);
  }
  getRoomName(row: Map<string, ReservaDTO | undefined>): string {
    let lab = 'Sala não informada'
    for (const cell of row.values()) {
      if (cell) {
        if (!this.labAdded.includes(cell.salaReservada!.nomeSala!)) {
          this.labAdded.push(cell.salaReservada!.nomeSala!)
          return cell.salaReservada!.nomeSala || 'Nome não identificado'
        }
        lab = cell.salaReservada!.nomeSala || 'Nome não identificado'
      }
    }
    return lab
  }

  labValues: Map<Map<string, ReservaDTO | undefined>, (ReservaDTO | undefined)[]> = new Map<Map<string, ReservaDTO | undefined>, (ReservaDTO | undefined)[]>()

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['scheduleData'] && this.scheduleData.length > 0) {
      for (const row of this.visibleItemsFiltered) {
        this.labValues.set(row, [...row.values()])
      }
    }
  }
  getRowValues(row: Map<string, ReservaDTO | undefined>): (ReservaDTO | undefined)[] {
    return this.labValues.get(row)!
  }
}