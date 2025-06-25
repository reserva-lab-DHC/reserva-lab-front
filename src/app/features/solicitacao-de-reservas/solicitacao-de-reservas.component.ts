import { Component, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { InputSelectComponent } from "../../shared/input-select/input-select.component";
import { InputTextComponent } from "../../shared/input-text/input-text.component";
import { DynamicButtonComponent } from "../../shared/dynamic-button/dynamic-button.component";
import { HorarioSelectComponent } from "./horario-select.component";
import { ReservaService } from "./reserva.service";
import { CardFeedbackComponent } from "./card-feedback.component";

@Component({
  selector: 'dhc-solicitacao-de-reservas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextComponent,
    InputSelectComponent,
    DynamicButtonComponent,
    HorarioSelectComponent,
    CardFeedbackComponent
  ],
  templateUrl: './solicitacao-de-reservas.component.html',
  styleUrls: ['./solicitacao-de-reservas.component.scss']
})
export class SolicitacaoDeReservasComponent {
  horariosSelecionados: string[] = [];

  reservaForm = new FormGroup({
    repetir: new FormControl('', Validators.required),
    responsavel: new FormControl('', Validators.required),
    disciplina: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required)
  });

  isAdmin = signal(false);
  feedbackMessage = '';
  feedbackStatus: 'sucesso' | 'erro' = 'sucesso';
  telaAtual: 'form' | 'feedback' = 'form';

  constructor(private reservaService: ReservaService) {}

  onHorarioChange(horarios: string[]) {
    this.horariosSelecionados = horarios;
  }

  toggleTipoUsuario() {
    this.isAdmin.update(value => !value);
  }

  solicitarReserva() {
    if (this.reservaForm.valid) {
      const formValues = this.reservaForm.value;

      const reserva = {
        dataReserva: new Date().toISOString().split('T')[0],
        diasReservados: [
          {
            diaReserva: "SEG",
            horarios: this.horariosSelecionados
          }
        ],
        status: "PENDENTE",
        solicitanteId: "04e88769-e0fa-421a-a7b9-39e266874549",
        salaReservadaId: "2878abd2-d047-4773-888e-a398419820e1",
        disciplinaRelacionada: formValues.disciplina ?? '',
        motivoReserva: formValues.descricao ?? '',
        dataInicio: new Date().toISOString(),
        dataConclusao: new Date().toISOString()
      };

      this.reservaService.enviarReserva(reserva).subscribe({
        next: () => {
          this.feedbackMessage = 'Sua solicitação foi enviada!';
          this.feedbackStatus = 'sucesso';
          this.telaAtual = 'feedback';
        },
        error: (error: Error) => {
          this.feedbackMessage = error.message || 'Ocorreu um erro ao processar sua solicitação.';
          this.feedbackStatus = 'erro';
          this.telaAtual = 'feedback';
        }
      });
    } else {
      console.log('Formulário inválido');
      this.reservaForm.markAllAsTouched();
    }
  }

  voltarTela() {
    if (this.feedbackStatus === 'sucesso') {
      window.location.href = '/';
    } else {
      this.telaAtual = 'form';
    }
  }
}