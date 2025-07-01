import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReservaDTO } from '../models/reserva.dto';

@Component({
  selector: 'dhc-celula-quadro',
  imports: [],
  templateUrl: './celula-quadro.component.html',
  styleUrl: './celula-quadro.component.scss'
})

export class CelulaQuadroComponent {

  @Input() teacher?: string;
  @Input() disciplina?: string
  @Input() reserva?: ReservaDTO | undefined
  
  @Output() cellClicked = new EventEmitter<ReservaDTO>();

  onClick() {
    this.cellClicked.emit(this.reserva);
  }

}

