import { Component, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { InputSelectComponent } from "../../shared/input-select/input-select.component";
import { InputTextComponent } from "../../shared/input-text/input-text.component";
import { DynamicButtonComponent } from "../../shared/dynamic-button/dynamic-button.component";
import { Reserva} from "./reserva.service";
import { HorarioSelectComponent } from "./horario-select.component";


@Component({
  selector: 'dhc-solicitacao-de-reservas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextComponent,
    InputSelectComponent,
    DynamicButtonComponent,
    HorarioSelectComponent
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

  onHorarioChange(horarios: string[]) {
    console.log('Horários selecionados:', horarios);

  }

  toggleTipoUsuario() {
    this.isAdmin.update(value => !value);
  }

  solicitarReserva() {
    if (this.reservaForm.valid) {
      const responsavel = this.reservaForm.get('responsavel')?.value ?? '';
      const disciplina = this.reservaForm.get('disciplina')?.value ?? '';
      const descricao = this.reservaForm.get('descricao')?.value ?? '';
      const repetir = this.reservaForm.get('repetir')?.value ?? '';
      const horarios = this.reservaForm.get('horarios')?.value || [];
      const reserva: Reserva = {
        responsavel,
        disciplina,
        descricao,
        repetir,
        horarios
      };
      console.log('Solicitação de reserva:', reserva);
    } else {
      console.log('Formulário inválido');
      this.reservaForm.markAllAsTouched();
    }

  }
}




