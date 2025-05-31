import { Component } from '@angular/core';
import { SelecaoComponent } from "../../shared/componente-selecao/selecao.component";

@Component({
  selector: 'dhc-cadastrar-laboratorio',
  imports: [SelecaoComponent],
  templateUrl: './cadastrar-laboratorio.component.html',
  styleUrl: './cadastrar-laboratorio.component.scss'
})
export class CadastrarLaboratorioComponent {
  predioSelecionado: number = 0;
  andarSelecionado: number = 0;
}
