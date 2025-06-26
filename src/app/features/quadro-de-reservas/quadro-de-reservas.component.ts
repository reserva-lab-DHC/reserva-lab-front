import { AfterViewInit, Component, EventEmitter, inject, Input, OnInit, ViewChild } from '@angular/core';
import { HeaderQuadroComponent } from "../../shared/header-quadro/header-quadro.component";
import { ScheduleTableComponent } from "../../shared/schedule-table/schedule-table.component";
import { InfoComponent } from "../../shared/modals/ui/modal-info-reserva/modal-info.component";
import { NgIf } from '@angular/common';
import { ReservaDTO } from '../../shared/models/reserva.dto';
import { ReservaService } from './reserva.service';
import { SalaService } from './sala.service';
import { defineDays, filterOngoingReservas, filterWeekDay } from './reservas.utils';

@Component({
  selector: 'dhc-quadro-de-reservas',
  imports: [HeaderQuadroComponent, ScheduleTableComponent, InfoComponent, NgIf],
  templateUrl: './quadro-de-reservas.component.html',
  styleUrl: './quadro-de-reservas.component.scss'
})
export class QuadroDeReservasComponent implements OnInit, AfterViewInit {

  reservaService = inject(ReservaService)
  labService = inject(SalaService)
  showPopup = false;
  selectedShift = 'todos';
  selectedCell: ReservaDTO | undefined;
  
  reservaList: ReservaDTO[] = []
  labsName: string[] = []
  currentDay = ""
  weekDays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"]
  validSchedules = ["H07_40", "H09_40", "H13_00", "H15_00", "H18_20", "H20_20"]
  currentTable: Map<string, ReservaDTO | undefined>[] = []
  showingTable: Map<string, ReservaDTO | undefined>[] = []
  filledTables: Map<string, Map<string, ReservaDTO | undefined>[]> = new Map()

  async ngOnInit() {
    try {
      this.reservaList = await this.reservaService.listAllReservas("ALL")
      this.reservaList = filterOngoingReservas(this.reservaList, this.headerQuadro.date)
      await this.loadAllLabs()
      this.loadTable()
    }
    catch (err) {
      console.trace("Um erro ocorreu ao preencher a tabela:" + err)
    }
  }

  @ViewChild(HeaderQuadroComponent) headerQuadro!: HeaderQuadroComponent;
  ngAfterViewInit() {
    this.currentDay = filterWeekDay(this.headerQuadro.weekday)
  }

  onCellSelected(cell: ReservaDTO) {
    this.selectedCell = cell;
    this.showPopup = true;
  }
  onClosePopup() {
    this.selectedCell = undefined;
    this.showPopup = false;
  }
  onDayChange(day: string) {
    this.currentDay = filterWeekDay(day)
    this.reservaList = filterOngoingReservas(this.reservaList, this.headerQuadro.date)
    this.loadTable()
  }
  onShiftChange(shift: string) {
    this.selectedShift = shift;
    this.loadTable()
  }

  async loadAllLabs() {

    // Step 1: Get unique lab IDs to minimize backend calls
    const uniqueLabIds = [...new Set(this.reservaList.map(r => r.salaReservada.id!))];

    try {
      const labs = await Promise.all(uniqueLabIds.map(id => this.labService.getSalaById(id)));
      const seenNames = new Set<string>();
      const uniqueLabNames: string[] = [];

      for (const lab of labs) {
        const normalizedName = lab.nomeSala.trim().toLowerCase();
        if (!seenNames.has(normalizedName)) {
          seenNames.add(normalizedName);
          uniqueLabNames.push(lab.nomeSala); // keep original casing
        }
      }

      // sortear em ordem alfabética
      this.labsName = uniqueLabNames.sort((a, b) => a.localeCompare(b));
    } catch (err) {
      console.trace("Erro ao carregar laboratórios: " + err);
      this.labsName = [];
    }
  }

  // Talvez organizar os métodos a seguir em um arquivo separado
  isCached() {
    if (this.filledTables.get(this.currentDay)) { // se a tabela deste dia já estiver definida
      this.currentTable = this.filledTables.get(this.currentDay)!
      return true
    }
    return false
  }
  loadTable() {
    this.fillTable()
    this.divideByCurrentShift()
  }

  fillTable() {
    if (this.isCached()) return

    // se não estiver em cache, uma nova tabela será criada
    this.currentTable = new Array(this.labsName.length)
    this.currentTable = this.labsName.map(() =>  new Map<string, ReservaDTO | undefined>(this.validSchedules.map(key => [key, undefined])))
    
    for (const reserva of this.reservaList) {
      // DESCOMENTAR CASO NÃO ESTEJA FAZENDO TESTES
/*       if (reserva.diasReservados == null) {
        console.log(reserva.id + ": datas reservadas não informadas, a reserva não será carregada na tabela!")
        continue;
      }   */
      defineDays(reserva, this.validSchedules) // SOMENTE PARA TESTES
      const matchingDay = reserva.diasReservados.find(d => d.diaReserva === this.currentDay)
      const labIndex = this.labsName.indexOf(reserva.salaReservada.nomeSala);

      if (!matchingDay || labIndex === -1) continue;

      for (let schedule of matchingDay.horarios) {
        if (!this.validSchedules.includes(schedule)) continue;
        if (!this.currentTable[labIndex].get(schedule)) this.currentTable[labIndex].set(schedule, reserva);
        else console.log(`reserva ${reserva.id} não será registrada pois o horário ${schedule} já tem uma reserva!`)
      }
    }
    this.filledTables.set(this.currentDay, this.currentTable)
  }

  divideByCurrentShift() {

    // cópia da tabela atual para divisão dos dados
    let shiftMap: Map<string, ReservaDTO | undefined>[]  = this.currentTable.map(map => new Map(map)) 
    if (this.selectedShift !== 'todos') 
    for (let i=0; i<this.currentTable.length; i++) {
      const row = [...this.currentTable[i]];
      if      (this.selectedShift === 'matutino'  ) shiftMap[i] = new Map(row.slice(0, 2))
      else if (this.selectedShift === 'vespertino') shiftMap[i] = new Map(row.slice(2, 4))
      else if (this.selectedShift === 'noturno'   ) shiftMap[i] = new Map(row.slice(4, 6))
    }
    this.showingTable = shiftMap.map(row => new Map(row));
  }

}
