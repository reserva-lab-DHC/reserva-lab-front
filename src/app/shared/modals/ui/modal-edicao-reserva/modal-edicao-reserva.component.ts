import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ReservaDTO } from '../../../models/reserva.dto';
import { ReservaService } from '../../../../features/quadro-de-reservas/reserva.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dhc-modal-edicao-reserva',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './modal-edicao-reserva.component.html',
  styleUrls: ['./modal-edicao-reserva.component.scss'] 
})
export class ModalEdicaoReservaComponent implements OnInit {
  @Input() reserva!: ReservaDTO;
  @Output() closeModal = new EventEmitter<void>();
  @Output() reservaAtualizada = new EventEmitter<ReservaDTO>();

  reservaEditavel: ReservaDTO = {} as ReservaDTO;
  
  // Variáveis com validação para uso no template
  solicitanteName = '';
  disciplinaRelacionada = '';
  dataReserva = '';
  primeiroHorario = '';

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    if (this.reserva) {
      this.reservaEditavel = { ...this.reserva };
      
      // Inicializar as variáveis com validação
      this.initializeFormVariables();
    }
  }

  private initializeFormVariables(): void {
    // Validação e inicialização do nome do solicitante
    this.solicitanteName = this.reserva?.solicitante?.userName || '';
    
    // Validação e inicialização da disciplina
    this.disciplinaRelacionada = this.reserva?.disciplinaRelacionada || '';
    
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
    
    return '';
  }

  // Getter para verificar se tem dias reservados
  get temDiasReservados(): boolean {
    return this.reserva?.diasReservados && 
           Array.isArray(this.reserva.diasReservados) && 
           this.reserva.diasReservados.length > 0;
  }

  // Getter para verificar se tem solicitante
  get temSolicitante(): boolean {
    return this.reserva?.solicitante !== null && 
           this.reserva?.solicitante !== undefined;
  }

  closePopup() {
    this.closeModal.emit();
  }

  async salvarEdicao() {
    try {
      // Atualizar o objeto reservaEditavel com os valores das variáveis
      this.updateReservaEditavel();
      
      const reservaAtualizadaBackend = await this.reservaService.editReserva(this.reservaEditavel, this.reservaEditavel.id!);

      if (reservaAtualizadaBackend) {
        this.reservaAtualizada.emit(reservaAtualizadaBackend);
        this.closePopup();
      } else {
        alert('Erro: Nenhuma reserva retornada após a atualização.');
      }
    } catch (error: unknown) {
      console.error('Erro ao salvar edição:', error);
      if (error instanceof Error) {
        alert(`Erro ao salvar edição: ${error.message}`);
      } else {
        alert('Erro ao salvar edição: Erro desconhecido.');
      }
    }
  }

  private updateReservaEditavel(): void {
    // Atualizar solicitante se existir
    if (this.reservaEditavel.solicitante) {
      this.reservaEditavel.solicitante.userName = this.solicitanteName;
    }
    
    // Atualizar disciplina
    this.reservaEditavel.disciplinaRelacionada = this.disciplinaRelacionada;
    
    // Atualizar data
    this.reservaEditavel.dataReserva = this.dataReserva;
    
    // Atualizar primeiro horário se existir
    if (this.reservaEditavel.diasReservados && 
        this.reservaEditavel.diasReservados.length > 0) {
      
      if (Array.isArray(this.reservaEditavel.diasReservados[0].horarios)) {
        this.reservaEditavel.diasReservados[0].horarios[0] = this.primeiroHorario;
      } else {
        this.reservaEditavel.diasReservados[0].horarios = [this.primeiroHorario];
      }
    }
  }
}
