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
    this.reservasPending = await this.reservaService.listAllReservas("PENDENTE")
  }

  onRequestClose(solicitacaoId: string, requestAccepted: boolean) {
    const currentReserva = this.reservasPending.find(reserva => reserva.id === solicitacaoId)
    if (!currentReserva) return;
    if (requestAccepted) {
      currentReserva.status = "APROVADA"
      currentReserva.dataInicio = new Date().toISOString()
      this.reservaService.editReserva(currentReserva, currentReserva.id!)
      console.log(`> reserva ${solicitacaoId} aceita!`) // test
    }
    else {
      currentReserva.status = "REJEITADA"
      this.reservaService.editReserva(currentReserva, currentReserva.id!)
      // this.reservaService.deleteReserva(currentReserva.id!) // não sei, deletar solicitação se rejeitada?
      console.log(`> reserva ${solicitacaoId} negada!`) // test
    }
    this.reservasPending = this.reservasPending.filter(reserva => reserva.id !== solicitacaoId)
  }

  formatDiasReservados(solicitacao: ReservaDTO) {
    let formatted = ""
    if (solicitacao.diasReservados == null) {
      return "Horario não especificado"
    }
    for (const dia of solicitacao.diasReservados) {
      formatted += `${dia.diaReserva}, `
      for (const horario of dia.horarios) {
        formatted += `${horario} `
      }
    }
    return formatted
  }

}
