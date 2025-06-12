import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'dhc-modal-confirmacao',
  standalone: true,
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.scss']
})
export class ConfirmacaoComponent {
  @Output() fechar = new EventEmitter<void>();

  onFechar(){
    this.fechar.emit();
  }
}
