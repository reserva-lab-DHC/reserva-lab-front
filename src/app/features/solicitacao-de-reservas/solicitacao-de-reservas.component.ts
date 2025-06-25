import { Component, inject, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { InputTextComponent } from "../../shared/input-text/input-text.component";
import { DynamicButtonComponent } from "../../shared/dynamic-button/dynamic-button.component";
import { HorarioSelectComponent } from "./horario-select.component";
// import { ReservaDTO } from "../../shared/models/reserva.dto";
import { ReservaService } from "./reserva.service";
import { RepeatSelectComponent, RepeatSelection } from "./ui/repeat-select/repeat-select.component";


@Component({
  selector: 'dhc-solicitacao-de-reservas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextComponent,
    DynamicButtonComponent,
    HorarioSelectComponent,
    RepeatSelectComponent
],
  templateUrl: './solicitacao-de-reservas.component.html',
  styleUrls: ['./solicitacao-de-reservas.component.scss']
})
export class SolicitacaoDeReservasComponent {
  reservaForm = new FormGroup({

    repetir: new FormControl('', Validators.required),
    responsavel: new FormControl('', Validators.required),
    disciplina: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),

  });
  isAdmin = signal(false);
  reservaService = inject(ReservaService);

  onHorarioChange(horarios: string[]) {
    console.log('Horários selecionados:', horarios);

  }

  repetirChanges(event : RepeatSelection) {
    console.log('Repetir selecionado:', event);
  }

  toggleTipoUsuario() {
    this.isAdmin.update(value => !value);
  }

  solicitarReserva() {
    if (this.reservaForm.valid) {
      console.log('Formulário válido, enviando dados:', this.reservaForm.value);

      /* 
      NAO TA FUNCIONANDO AINDA, PRECISA DE AJUSTES
       */
      /* const responsavel = this.reservaForm.get('responsavel')?.value ?? '';
      const disciplina = this.reservaForm.get('disciplina')?.value ?? '';
      const descricao = this.reservaForm.get('descricao')?.value ?? '';
      // const repetir = this.reservaForm.get('repetir')?.value ?? '';
      const horarios = this.reservaForm.get('horarios')?.value || [];
      const reserva: ReservaDTO = {
        dataReserva: new Date().toISOString(),
        horariosReservados: horarios,
        status: 'PENDENTE',
        solicitanteId: responsavel, //todo: definir o ID do solicitante, que deve ser obtido pelo usuário logado
        salaReservadaId: "578a9e99-d915-4af2-8647-f2e828d75997", // Aqui você deve definir o ID da sala reservada que deve ser obtido por fora
        disciplinaRelacionada: disciplina,
        motivoReserva: descricao,
        dataSolicitacao: new Date().toISOString()
      }; */

      /* this.reservaService.solicitarReserva(reserva).then((res: ReservaDTO | undefined) => {
        console.log('Reserva solicitada:', res);
        alert('Reserva solicitada com sucesso!');//aqui caberia aparecer um modal 
      })
        .catch((err: Error) => {
          console.error('Erro ao solicitar reserva:', err);
          alert('Erro ao solicitar reserva');//aqui caberia aparecer um modal 
        }); */
    } else {
      this.reservaForm.markAllAsTouched();
    }

  }
}




