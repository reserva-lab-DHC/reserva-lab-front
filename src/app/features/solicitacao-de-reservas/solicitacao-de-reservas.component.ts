import { Component, inject, OnInit, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { InputTextComponent } from "../../shared/input-text/input-text.component";
import { DynamicButtonComponent } from "../../shared/dynamic-button/dynamic-button.component";
import { HorarioSelectComponent } from "./horario-select.component";
import { ReservaService } from "./reserva.service";
import { RepeatSelectComponent, RepeatSelection } from "./ui/repeat-select/repeat-select.component";
import { CardFeedbackComponent } from "./card-feedback.component";
import { ReservaDTO } from "../../shared/models/reserva.dto";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";

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
export class SolicitacaoDeReservasComponent implements OnInit {
  horariosSelecionados: string[] = [];
  horariosFromUrl: string[] = [];
  dataSelecionada: Date = new Date();
  repeatSelection: RepeatSelection | null = null;

  reservaForm = new FormGroup({
    responsavel: new FormControl('', Validators.required),
    disciplina: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required)
  });

  isAdmin = signal(false);
  reservaService = inject(ReservaService);
  feedbackMessage = '';
  feedbackStatus: 'sucesso' | 'erro' = 'sucesso';
  telaAtual: 'form' | 'feedback' = 'form';
  salaId = '';
  authService = inject(AuthService);

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const salaId = params['salaId'];
      const horariosFromUrl = params['horarios'];
      const dataFromUrl = params['data'];

      if (!salaId || !horariosFromUrl) {
        window.location.href = '/';
        return;
      }

      this.salaId = decodeURIComponent(salaId);

      if (dataFromUrl) {
        this.dataSelecionada = new Date(dataFromUrl);
      }

      const horarioRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
      const horariosArray = horariosFromUrl.split(',').map((h: string) => h.trim());
      const horariosValidos = horariosArray.filter((h: string) => horarioRegex.test(h));

      if (horariosValidos.length !== horariosArray.length) {
        window.location.href = '/';
        return;
      }

      this.horariosFromUrl = horariosValidos;
    });
  }


  onHorarioChange(horariosSelecionadosForm: string[]) {
    // Convert "08:00" to "H08_00" format
    this.horariosSelecionados = horariosSelecionadosForm.map(horario => {
      const [hora, minuto] = horario.split(':');
      return `H${hora}_${minuto}`;
    });
  }

  repetirChanges(event: RepeatSelection) {
    this.repeatSelection = event;
  }

  toggleTipoUsuario() {
    this.isAdmin.update(value => !value);
  }

  async solicitarReserva() {
    if (this.reservaForm.valid) {
      const formValues = this.reservaForm.value;

      const dataInicio = this.dataSelecionada;
      const dataConclusao = this.repeatSelection?.finalDate ?? this.dataSelecionada;

      const diasSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

      const diasReservados = [];
      const dataAtual = new Date(dataInicio); //isso deve ta bugado, mas n sei ainda

      const repeticoes = this.repeatSelection?.value ? parseInt(this.repeatSelection.value, 10) : 1;
      let count = 0;

      while (dataAtual <= dataConclusao && count < repeticoes) {
        diasReservados.push({
          diaReserva: diasSemana[dataAtual.getDay()],
          horarios: this.horariosSelecionados
        });

        if (this.repeatSelection?.category === 'day') {
          dataAtual.setDate(dataAtual.getDate() + 1);
        } else if (this.repeatSelection?.category === 'week') {
          dataAtual.setDate(dataAtual.getDate() + 7);
        } else if (this.repeatSelection?.category === 'month') {
          dataAtual.setMonth(dataAtual.getMonth() + 1);
        } else {

          break;
        }
        count++;
      }

      const reserva = {
        dataReserva: new Date().toISOString().split('T')[0],
        dataDaSolicitacao: new Date().toISOString(),
        diasReservados: diasReservados,
        status: "PENDENTE",
        solicitanteId: this.authService.getUserId(),
        salaReservadaId: this.salaId,
        disciplinaRelacionada: formValues.disciplina ?? '',
        motivoReserva: formValues.descricao ?? '',
        dataInicio: this.dataSelecionada.toISOString(),
        dataConclusao: dataConclusao.toISOString()
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