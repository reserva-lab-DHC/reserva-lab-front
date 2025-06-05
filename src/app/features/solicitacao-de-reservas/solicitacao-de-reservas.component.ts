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
  // - formgroup para o formulário de solicitação incluindo o botão de horário
  // - implementar a lógica de envio do formulário
  // - implementar um sinal que basicamente controlar se um input aparece ou não (o que valida o tipo de usuário, se é aluno ou professor)
  // - Fernanda, caso vc n tenha lembrdom, a Ana chegou a comentar ocm vc que fez alteraçoes na task do ghit e colocou um print e um link pro figma de como seria o visual dos botões de horário,
  // e também colocou um link do primeng para como fazer o grupo de botões

}

