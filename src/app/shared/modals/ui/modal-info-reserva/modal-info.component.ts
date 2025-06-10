import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dhc-modal-info-reserva',
  imports: [],
  templateUrl: './modal-info.component.html',
  styleUrl: './modal-info.component.scss'
})

export class InfoComponent {

  @Input() data!: { teacher: string; lab: string, disciplina: string, dia_e_horario: string, inicio: string, duracao: string };
  @Output() close = new EventEmitter<void>();

  closePopup() {
    console.log(this.data)
    this.close.emit();
  }


}