import { Component } from '@angular/core';
import { HeaderQuadroComponent } from "../../shared/header-quadro/header-quadro.component";
import { ScheduleTableComponent } from "../../shared/schedule-table/schedule-table.component";
import { InfoComponent } from "../../shared/modals/ui/modal-info-reserva/modal-info.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'dhc-quadro-de-reservas',
  imports: [HeaderQuadroComponent, ScheduleTableComponent, InfoComponent, NgIf],
  templateUrl: './quadro-de-reservas.component.html',
  styleUrl: './quadro-de-reservas.component.scss'
})
export class QuadroDeReservasComponent {
  selectedCell = {teacher: "", lab: "", disciplina: "", dia_e_horario: "", inicio: "", duracao: ""};
  showPopup = false;

  onCellSelected(cell: { teacher: string; lab: string; disciplina: string; dia_e_horario: string; inicio: string, duracao: string }) {
    this.selectedCell = cell;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
    this.selectedCell = {teacher: "", lab: "", disciplina: "", dia_e_horario: "", inicio: "", duracao: ""};
  }

  scheduleGrid = [ // dados para demonstração da tabela
    [
      { teacher: 'Ricardo Freitas', lab: 'Metodologias Ativas II', disciplina: 'Algoritmos e Estrutura de Dados I', dia_e_horario: 'Terça 10:00 e Quinta 08:00', inicio: "1 de Maio", duracao: "Até 4 de julho" },
      { teacher: 'Renata Santana', lab: 'Laboratório Tecnológico I', disciplina: 'Paradigmas de Programação', dia_e_horario: 'Terça 10:00 e Quinta 08:00', inicio: "1 de Maio", duracao: "Até 4 de julho" },
      { teacher: '', lab: '', disciplina: '', dia_e_horario: '', inicio: '', duracao: '' },
      { teacher: '', lab: '', disciplina: '', dia_e_horario: '', inicio: '', duracao: '' },
      { teacher: 'Diego Caldeira', lab: 'Metodologias Ativas III', disciplina:'Algoritmos e Estrutura de Dados III', dia_e_horario: 'Terça 10:00 e Quinta 08:00', inicio: "1 de Maio", duracao: "Até 4 de julho" },
      { teacher: 'Ricardo Freitas', lab: 'Metodologias Ativas IV', disciplina:'Algoritmos e Estrutura de Dados III', dia_e_horario: 'Terça 10:00 e Quinta 08:00', inicio: "1 de Maio", duracao: "Até 4 de julho" },
    ],
    [
      { teacher: 'Vinícus Von Filippo', lab: 'Laboratório Tecnológico II', disciplina:'Algoritmos e Estrutura de Dados III', dia_e_horario: 'Terça 10:00 e Quinta 08:00', inicio: "1 de Maio", duracao: "Até 4 de julho" },
      { teacher: '', lab: '', disciplina: '', dia_e_horario: '', inicio: '', duracao: '' },
      { teacher: '', lab: '', disciplina: '', dia_e_horario: '', inicio: '', duracao: '' },
      { teacher: '', lab: '', disciplina: '', dia_e_horario: '', inicio: '', duracao: '' },
      { teacher: 'Diego Caldeira', lab: 'Laboratório Tecnológico III', disciplina:'Algoritmos e Estrutura de Dados III', dia_e_horario: 'Terça 10:00 e Quinta 08:00', inicio: "1 de Maio", duracao: "Até 4 de julho" },
      { teacher: '', lab: '', disciplina: '', dia_e_horario: '', inicio: '', duracao: '' },
    ],
  
  ];

  selectedShift = 'todos';
  onShiftChange(shift: string) {
    this.selectedShift = shift;
  }
}
