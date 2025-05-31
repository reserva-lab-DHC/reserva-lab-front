import { Component } from '@angular/core';
import { SelecaoComponent } from "../../shared/componente-selecao/selecao.component";

@Component({
  selector: 'dhc-cadastrar-laboratorio',
  imports: [SelecaoComponent],
  templateUrl: './cadastrar-laboratorio.component.html',
  styleUrl: './cadastrar-laboratorio.component.scss'
})
export class CadastrarLaboratorioComponent {
  predioSelecionado = 0;
  andarSelecionado = 0;
}
