import { Component, inject, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { InputTextComponent } from "../../shared/input-text/input-text.component";
import { DynamicButtonComponent } from "../../shared/dynamic-button/dynamic-button.component";
import { HorarioSelectComponent } from "./horario-select.component";
// import { ReservaDTO } from "../../shared/models/reserva.dto";
import { ReservaService } from "./reserva.service";
import { RepeatSelectComponent, RepeatSelection } from "./ui/repeat-select/repeat-select.component";
import { CardFeedbackComponent } from "./card-feedback.component";
import { ReservaDTO } from "../../shared/models/reserva.dto";

@Component({
  selector: 'dhc-solicitacao-de-reservas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextComponent,
    DynamicButtonComponent,
    HorarioSelectComponent,
    RepeatSelectComponent,
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
  reservaService = inject(ReservaService);
  feedbackMessage = '';
  feedbackStatus: 'sucesso' | 'erro' = 'sucesso';
  telaAtual: 'form' | 'feedback' = 'form';

  constructor() { }

  onHorarioChange(horarios: string[]) {
    this.horariosSelecionados = horarios;
  }

  repetirChanges(event : RepeatSelection) {
    console.log('Repetir selecionado:', event);
  }

  toggleTipoUsuario() {
    this.isAdmin.update(value => !value);
  }

  async solicitarReserva() {
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

      const res: ReservaDTO = await this.reservaService.solicitarReserva(reserva);

      if (res.status === 'PENDENTE') {
        this.telaAtual = 'feedback';
        this.feedbackMessage = 'Reserva solicitada com sucesso!';
        this.feedbackStatus = 'sucesso';
      } else {
        this.telaAtual = 'feedback';
        this.feedbackMessage = 'Erro ao solicitar reserva. Tente novamente.';
        this.feedbackStatus = 'erro';
      }
    } else {
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