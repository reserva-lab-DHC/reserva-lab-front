import { Component, inject, OnInit } from '@angular/core';
import { HeaderQuadroComponent } from "../../shared/header-quadro/header-quadro.component";
import { ScheduleTableComponent } from "../../shared/schedule-table/schedule-table.component";
import { InfoComponent } from "../../shared/modals/ui/modal-info-reserva/modal-info.component";
import { NgIf } from '@angular/common';
import { ReservaDTO } from '../../shared/models/reserva.dto';
import { ReservaService } from './reserva.service';
import { SalaService } from './sala.service';
import { LaboratorioDTO } from '../../shared/models/laboratorio.dto';

@Component({
  selector: 'dhc-quadro-de-reservas',
  imports: [HeaderQuadroComponent, ScheduleTableComponent, InfoComponent, NgIf],
  templateUrl: './quadro-de-reservas.component.html',
  styleUrl: './quadro-de-reservas.component.scss'
})
export class QuadroDeReservasComponent implements OnInit {

  reservaService = inject(ReservaService)
  labService = inject(SalaService)
  showPopup = false;
  selectedShift = 'todos';
  scheduleMap: Map<string, number> = this.indexBySchedule()
  selectedCell: ReservaDTO | undefined;

  scheduleGrid: ReservaDTO[][] = []
  reservaList: ReservaDTO[] = []
  labs: LaboratorioDTO[] = []
  labsName: string[] = []

  onCellSelected(cell: ReservaDTO) {
    this.selectedCell = cell;
    this.showPopup = true;
  }
  closePopup() {
    this.showPopup = false;
    this.selectedCell = undefined;
  }
  onShiftChange(shift: string) {
    this.selectedShift = shift;
    this.fillTable()
  }

  async ngOnInit() {
    try {
      
      this.reservaList = await this.reservaService.listAllReservas("ALL")
      const labRequests = this.reservaList.map(reserva => 
        this.labService.getSalaById(reserva.salaReservada.id!)
      );

      this.labs = await Promise.all(labRequests);
      this.fillTable()
    }
    catch (err) {
      console.trace("Um erro ocorreu ao preencher a tabela:" + err)
    }
  }

  indexBySchedule(): Map<string, number> { // isso é provisório até que todos os horários do quadro estejam no back
    const shiftMaps: Record<string, Map<string, number>> = {
      matutino: new Map([["H08_00", 0], ["H10_00", 1]]),
      vespertino: new Map([["H13_00", 0], ["H15_00", 1]]),
      noturno: new Map([["H18_20", 0], ["H20_20", 1]])
    };
    return shiftMaps[this.selectedShift] ?? new Map([
      ["H08_00", 0], ["H08_50", 1], ["H10_00", 2],
      ["H10_50", 3], ["H13_00", 4], ["H15_00", 5]
    ]);
  }

  async fillTable() {

    const labsName: string[] = []
    for (let i=0; i<this.reservaList.length; i++) {
      const lab = this.labs[i]
      const labName = lab.nomeSala
      const row: ReservaDTO[] = this.selectedShift === 'todos' ? new Array(6) : new Array(2)
      if (!labsName.includes(labName)) labsName.push(labName)
      
      for (const horario of this.reservaList[i].horariosReservados) {
        const reservaPosition = this.scheduleMap.get(horario)!
        if (reservaPosition !== undefined) row[reservaPosition] = this.reservaList[i]
        this.scheduleGrid[labsName.indexOf(labName)] = row
      }
    }
  }

}
