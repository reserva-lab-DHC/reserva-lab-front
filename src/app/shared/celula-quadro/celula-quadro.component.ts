import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dhc-celula-quadro',
  imports: [],
  templateUrl: './celula-quadro.component.html',
  styleUrl: './celula-quadro.component.scss'
})

export class CelulaQuadroComponent {

  @Input() teacher!: string;
  @Input() lab!: string;
  @Input() disciplina!: string
  @Input() dia_e_horario!: string
  @Input() inicio!: string
  @Input() duracao!: string

  @Output() cellClicked = new EventEmitter<{ teacher: string; lab: string, disciplina: string, dia_e_horario: string, inicio: string, duracao: string }>();

  onClick() {
    if (this.teacher !== "")
    this.cellClicked.emit({ teacher: this.teacher, lab: this.lab, disciplina: this.disciplina, dia_e_horario: this.dia_e_horario, inicio: this.inicio, duracao: this.duracao });
  }

}

