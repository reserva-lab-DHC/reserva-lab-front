import { Component, EventEmitter, Output } from '@angular/core';
import { DynamicButtonComponent } from "../../../dynamic-button/dynamic-button.component";

@Component({
  selector: 'dhc-modal-confirmacao',
  standalone: true,
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.scss'],
  imports: [DynamicButtonComponent]
})
export class ConfirmacaoComponent {
  @Output() fechar = new EventEmitter<void>();

  onFechar(){
    this.fechar.emit();
  }
}