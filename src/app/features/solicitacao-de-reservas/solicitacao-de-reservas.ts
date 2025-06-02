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
  templateUrl: './solicitacao-de-reservas.html',
  styleUrls: ['./solicitacao-de-reservas.scss']
})
export class SolicitacaoDeReservasComponent  {

}

