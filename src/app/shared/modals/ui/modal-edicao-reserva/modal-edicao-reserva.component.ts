
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ReservaDTO } from '../../../models/reserva.dto'; // Verifique o caminho
import { ReservaService } from '../../../../features/quadro-de-reservas/reserva.service'; // Verifique o caminho
import { FormsModule } from '@angular/forms'; // Para usar [(ngModel)]
import { CommonModule } from '@angular/common'; // Para usar *ngIf, *ngFor, pipes

@Component({
  selector: 'dhc-modal-edicao-reserva',
  standalone: true, // Se for um componente standalone, senão remova
  imports: [FormsModule, CommonModule], // Importe aqui se for standalone
  templateUrl: './modal-edicao-reserva.component.html', // <-- Ajuste aqui
  styleUrls: ['./modal-edicao-reserva.component.scss'] 
})
export class ModalEdicaoReservaComponent implements OnInit {
  @Input() reserva!: ReservaDTO;
  @Output() closeModal = new EventEmitter<void>();
  @Output() reservaAtualizada = new EventEmitter<ReservaDTO>();

  reservaEditavel: ReservaDTO = {} as ReservaDTO;

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    if (this.reserva) {
      this.reservaEditavel = { ...this.reserva }; // Faz uma cópia profunda se necessário
      // Se 'diasReservados' for um array de objetos, talvez precise de uma cópia mais profunda:
      // this.reservaEditavel.diasReservados = this.reserva.diasReservados ? JSON.parse(JSON.stringify(this.reserva.diasReservados)) : [];
    }
  }

  closePopup() {
    this.closeModal.emit();
  }

  async salvarEdicao() {
    try {
      // Ajuste para garantir que o UUID correto é enviado para a edição
      // O método editReserva do seu serviço espera o DTO completo e o UUID
      const reservaAtualizadaBackend = await this.reservaService.editReserva(this.reservaEditavel, this.reservaEditavel.uuid!);

      if (reservaAtualizadaBackend) {
        this.reservaAtualizada.emit(reservaAtualizadaBackend);
        this.closePopup();
      } else {
        alert('Erro: Nenhuma reserva retornada após a atualização.');
      }
    } catch (error: unknown) { // Mude 'any' para 'unknown'
  console.error('Erro ao salvar edição:', error);
  if (error instanceof Error) { // Faça uma verificação se precisar acessar 'message'
    alert(`Erro ao salvar edição: ${error.message}`);
  } else {
    alert('Erro ao salvar edição: Erro desconhecido.');
  }
}
  }
}
