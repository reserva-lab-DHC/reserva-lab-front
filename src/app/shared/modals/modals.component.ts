import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmacaoComponent } from './modal-confirmacao/modal-confirmacao.component';
import { ErroComponent } from './modal-erro/modal-erro.component';
import { ExclusaoComponent } from './modal-excluir_reserva/modal-exclusao.component';

@Component({
  selector: 'dhc-modals',
  standalone: true, 
  imports: [
    CommonModule,
    ConfirmacaoComponent,
    ErroComponent,
    ExclusaoComponent
  ],
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent {
  @Input() tipo: 'confirmacao' | 'erro' | 'cancelamento' = 'confirmacao';
}
