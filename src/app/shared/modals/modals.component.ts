import { Component, Input,Output,EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmacaoComponent } from "./ui/modal-confirmacao/modal-confirmacao.component";
import { ErroComponent } from "./ui/modal-erro/modal-erro.component";
import { ExclusaoComponent } from "./ui/modal-excluir_reserva/modal-exclusao.component";

export type modalType = 'confirmacao' | 'erro' | 'cancelamento';
@Component({
  selector: 'dhc-modals',
  standalone: true,
  imports: [
    CommonModule,
    ConfirmacaoComponent,
    ErroComponent,
    ExclusaoComponent,
  ],
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent {
  @Input() type: modalType | null = 'confirmacao';
  @Output() fechar = new EventEmitter<void>();
  
  fecharModal(){
    this.type=null;
  }
}