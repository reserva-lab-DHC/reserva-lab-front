import { Component,EventEmitter, Output } from '@angular/core';
import { DynamicButtonComponent } from "../../../dynamic-button/dynamic-button.component";

@Component({
  selector: 'dhc-modal-erro',
  standalone: true,
  templateUrl: './modal-erro.component.html',
  styleUrls: ['./modal-erro.component.scss'],
  imports: [DynamicButtonComponent]
})
export class ErroComponent {
    @Output() fechar = new EventEmitter<void>();

  onFechar() {
    this.fechar.emit();
  }
}