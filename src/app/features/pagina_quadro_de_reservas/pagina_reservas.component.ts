import { CommonModule, NgIf } from '@angular/common';
import { ScheduleTableComponent } from '../../shared/schedule-table/schedule-table.component';
import { Component } from '@angular/core';
import { HeaderQuadroComponent } from "../../shared/header-quadro/header-quadro.component";
import { InfoComponent } from "../../shared/modals/ui/modal-info-reserva/modal-info.component";

@Component({
  selector: 'dhc-pagina-reservas', // Confirme se esse é o seletor correto utilizado na rota.
  standalone: true, // Confirme se o componente realmente é standalone.
  imports: [
    CommonModule,
    // ModalsComponent, // Descomente se for utilizado no HTML.
    ScheduleTableComponent,
    HeaderQuadroComponent,
    InfoComponent,
    NgIf
],
  templateUrl: './pagina_reservas.component.html',
  styleUrls: ['./pagina_reservas.component.scss']
})
export class PaginaReservasComponent {
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

  selectedShift: string = 'todos';
  onShiftChange(shift: string) {
    this.selectedShift = shift;
  }

}