import { Component, EventEmitter, inject, Input, Output, OnInit } from '@angular/core';
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

export class InfoComponent implements OnInit {

  @Input() reserva!: ReservaDTO;
  @Output() closeModal = new EventEmitter<void>();
  @Output() reservaDeletada = new EventEmitter<string>(); 
  @Output() editarReserva = new EventEmitter<ReservaDTO>();
  
  reservaService = inject(ReservaService)
  
  loading = false;

  // Variáveis com validação para uso no template
  solicitanteName = '';
  nomeSala = '';
  disciplinaRelacionada = '';
  primeiroHorario = '';
  dataReserva = '';

  ngOnInit(): void {
    if (this.reserva) {
      this.initializeDisplayVariables();
    }
  }

  private initializeDisplayVariables(): void {
    // Validação e inicialização do nome do solicitante
    this.solicitanteName = this.reserva?.solicitante?.userName || 'Solicitante não informado';
    
    // Validação e inicialização do nome da sala
    this.nomeSala = this.reserva?.salaReservada?.nomeSala || 'Sala não informada';
    
    // Validação e inicialização da disciplina
    this.disciplinaRelacionada = this.reserva?.disciplinaRelacionada || 'Disciplina não informada';
    
    // Validação e inicialização da data
    this.dataReserva = this.reserva?.dataReserva || '';
    
    // Validação e inicialização do primeiro horário
    this.primeiroHorario = this.getPrimeiroHorario();
  }

  private getPrimeiroHorario(): string {
    if (this.reserva?.diasReservados && 
        Array.isArray(this.reserva.diasReservados) && 
        this.reserva.diasReservados.length > 0) {
      
      const primeiroDia = this.reserva.diasReservados[0];
      
      // Verifica se horarios é um array
      if (Array.isArray(primeiroDia.horarios) && primeiroDia.horarios.length > 0) {
        return primeiroDia.horarios[0];
      }
      
      // Verifica se horarios é uma string
      if (typeof primeiroDia.horarios === 'string') {
        return primeiroDia.horarios;
      }
    }
    
    return 'Horário não informado';
  }

  // Getters para verificações de validação
  get temSolicitante(): boolean {
    return this.reserva?.solicitante !== null && 
           this.reserva?.solicitante !== undefined;
  }

  get temSalaReservada(): boolean {
    return this.reserva?.salaReservada !== null && 
           this.reserva?.salaReservada !== undefined;
  }

  get temDiasReservados(): boolean {
    return this.reserva?.diasReservados && 
           Array.isArray(this.reserva.diasReservados) && 
           this.reserva.diasReservados.length > 0;
  }

  get temDataReserva(): boolean {
    return this.reserva?.dataReserva !== null && 
           this.reserva?.dataReserva !== undefined &&
           this.reserva?.dataReserva !== '';
  }

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
      this.loading = false;
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
      } finally {
        this.loading = false;
      }
    } else {
      this.loading = false;
    }
  }
}



