import { Component, Output, EventEmitter, Input, inject } from '@angular/core';
import { ReservaService } from '../../features/quadro-de-reservas/reserva.service';
import { ReservaDTO } from '../models/reserva.dto';

@Component({
  selector: 'dhc-confirm-request',
  imports: [],
  templateUrl: './confirm-request.component.html',
  styleUrl: './confirm-request.component.scss'
})
export class ConfirmRequestComponent {
  @Output() requestDestroy = new EventEmitter<{id: string, accepted: boolean}>();
  @Input() solicitacao: ReservaDTO | undefined
  @Input() lab = ""
  @Input() diasReservados = ""
  @Input() professor = ""
  @Input() disciplina = ""
  @Input() horario_solicitacao = ""

  reservaService = inject(ReservaService)

  requestClose(requestAccepted: boolean) {
    this.requestDestroy.emit({id: this.solicitacao!.id!, accepted: requestAccepted});
  }
}
