import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dhc-modal-info-reserva',
  imports: [],
  templateUrl: './modal-info.component.html',
  styleUrl: './modal-info.component.scss'
})

export class InfoComponent {

  @Input() professor = ""
  @Input() lab = "";
  @Input() disciplina = "";
  @Input() dia_e_horario = "";
  @Input() duracao_reserva = "";
  @Input() inicio_reserva = "";


  @Output() fechar = new EventEmitter<void>();

  onFechar() {
    this.fechar.emit();
  }
}