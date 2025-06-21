import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ReservaDTO } from '../../../models/reserva.dto';
import { ReservaService } from '../../../../features/quadro-de-reservas/reserva.service';

@Component({
  selector: 'dhc-modal-info-reserva',
  imports: [],
  templateUrl: './modal-info.component.html',
  styleUrl: './modal-info.component.scss'
})

export class InfoComponent {

  @Input() reserva!: ReservaDTO;
  @Output() closeModal = new EventEmitter<void>();
  reservaService = inject(ReservaService)

  closePopup() {
    this.closeModal.emit();
  }

/*   editReserva() {

  }
 */
  apagarReserva() {
      this.reservaService.cadastrarReserva(this.reserva)
      .then((res: ReservaDTO | undefined) => {
        console.log('Reserva excluída:', res);
        alert('Reserva excluída com êxito!');
      })
      .catch((err: Error) => {
        console.error('Erro ao excluir a reserva:', err);
        alert('Erro ao excluir a reserva!');
      });
    
    // this.reservaService.deleteReserva(this.reserva.)
  }
}