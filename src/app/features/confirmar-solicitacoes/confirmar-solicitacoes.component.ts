import { Component, inject, OnInit } from '@angular/core';
import { ConfirmRequestComponent } from "../../shared/confirm-request/confirm-request.component";
import { NgFor} from '@angular/common';
import { ReservaService } from '../quadro-de-reservas/reserva.service';
import { ReservaDTO } from '../../shared/models/reserva.dto';

@Component({
  selector: 'dhc-confirmar-solicitacoes',
  imports: [ConfirmRequestComponent, NgFor],
  templateUrl: './confirmar-solicitacoes.component.html',
  styleUrl: './confirmar-solicitacoes.component.scss'
})
export class ConfirmarSolicitacoesComponent implements OnInit{
  reservaService = inject(ReservaService)
  reservasPending: ReservaDTO[] = []

  async ngOnInit() {
    try {
      this.reservasPending = await this.reservaService.listAllReservas("PENDENTE")
    } catch (error) {
      console.error('Erro ao carregar reservas pendentes:', error)
      this.reservasPending = []
    }
  }

  async onRequestClose(solicitacaoId: string, requestAccepted: boolean) {
    if (!solicitacaoId) {
      console.error('ID da solicitação não fornecido')
      return
    }

    const currentReserva = this.reservasPending.find(reserva => reserva.id === solicitacaoId)
    if (!currentReserva) {
      console.error(`Reserva com ID ${solicitacaoId} não encontrada`)
      return
    }

    try {
      if (requestAccepted) {
        currentReserva.status = "APROVADA"
        currentReserva.dataInicio = new Date().toISOString()
        await this.reservaService.editReserva(currentReserva, currentReserva.id!)
        console.log(`> Reserva ${solicitacaoId} aceita!`)
      } else {
        currentReserva.status = "REJEITADA"
        await this.reservaService.editReserva(currentReserva, currentReserva.id!)
        // Opcional: deletar se rejeitada
        await this.reservaService.deleteReserva(currentReserva.id!)
        console.log(`> Reserva ${solicitacaoId} rejeitada e removida!`)
      }
      
      // Remove da lista local após sucesso
      this.reservasPending = this.reservasPending.filter(reserva => reserva.id !== solicitacaoId)
      
    } catch (error) {
      console.error(`Erro ao processar reserva ${solicitacaoId}:`, error)
    }
  }

  formatDiasReservados(solicitacao: ReservaDTO): string {
    if (!solicitacao?.diasReservados || solicitacao.diasReservados.length === 0) {
      return "Horário não especificado"
    }

    let formatted = ""
    for (const dia of solicitacao.diasReservados) {
      if (dia.diaReserva) {
        formatted += `${dia.diaReserva}`
        
        if (dia.horarios && dia.horarios.length > 0) {
          formatted += `: ${dia.horarios.join(', ')}`
        }
        formatted += " | "
      }
    }
    
    // Remove o último " | "
    return formatted.slice(0, -3) || "Horário não especificado"
  }
}
