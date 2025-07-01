import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaDTO } from '../../../models/reserva.dto';
import { ReservaService } from '../../../../features/quadro-de-reservas/reserva.service';

@Component({
  selector: 'dhc-modal-info-reserva',
  standalone: true, 
 imports: [CommonModule],
  templateUrl: './modal-info.component.html',
  styleUrl: './modal-info.component.scss'
})

export class InfoComponent {

  @Input() reserva!: ReservaDTO;
  @Output() closeModal = new EventEmitter<void>();
  @Output() reservaDeletada = new EventEmitter<string>(); 
  @Output() editarReserva = new EventEmitter<ReservaDTO>();
  
  reservaService = inject(ReservaService)
  
    loading = false;

  closePopup() {
    this.closeModal.emit();
  }
  editReserva() {
    this.editarReserva.emit(this.reserva); 
    this.closePopup(); 
  }
  async apagarReserva() {
    if (this.loading) return;
  this.loading = true;
 
    if (!this.reserva || !this.reserva.id) { 
      alert('Não foi possível encontrar a reserva para exclusão (ID ausente).');
      return;
    }

    if (confirm('Tem certeza que deseja excluir esta reserva?')) {
      try {
        
        await this.reservaService.deleteReserva(this.reserva.id);
        console.log('Reserva excluída com êxito!');
        alert('Reserva excluída com êxito!');
        this.reservaDeletada.emit(this.reserva.id); 
        this.closePopup(); 
      } catch (error: unknown) {
          if (error instanceof Error) {
            console.error('Erro ao excluir a reserva:', error);
            alert(`Erro ao excluir a reserva: ${error.message || 'Erro desconhecido ao deletar reserva.'}`);
          }
      }finally {
        
        this.loading = false;
      }
    } else {
      
      this.loading = false;
    }
  }
}



  