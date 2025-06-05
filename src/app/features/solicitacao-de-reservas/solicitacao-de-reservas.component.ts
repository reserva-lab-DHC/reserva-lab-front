import { CommonModule } from "@angular/common";
import { InputSelectComponent } from "../../shared/input-select/input-select.component";
import { InputTextComponent } from "../../shared/input-text/input-text.component";
import { Component } from "@angular/core";
import { DynamicButtonComponent } from "../../shared/dynamic-button/dynamic-button.component";


@Component({
  selector: 'dhc-solicitacao-de-reservas',
  standalone: true,
  imports: [
    InputTextComponent, InputSelectComponent, CommonModule,
    DynamicButtonComponent
],
  templateUrl: './solicitacao-de-reservas.component.html',
  styleUrls: ['./solicitacao-de-reservas.component.scss']
})
export class SolicitacaoDeReservasComponent  {
  //todo : implementar lógica de solicitação de reservas
  // basicamente falta:
  // - criar o serviço de solicitação de reservas
  // - formgroup para o formulário de solicitação
  // - implementar a lógica de envio do formulário
  // - implementar um sinal que basicamente controlar se um input aparece ou não (o que valida o tipo de usuário, se é aluno ou professor)

}

