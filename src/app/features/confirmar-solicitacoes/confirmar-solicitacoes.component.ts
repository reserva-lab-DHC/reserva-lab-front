import { Component } from '@angular/core';
import { ConfirmRequestComponent } from "../../shared/confirm-request/confirm-request.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'dhc-confirmar-solicitacoes',
  imports: [ConfirmRequestComponent, NgIf],
  templateUrl: './confirmar-solicitacoes.component.html',
  styleUrl: './confirmar-solicitacoes.component.scss'
})

export class ConfirmarSolicitacoesComponent {
  visibility = [true, true, true, true];
  
}
