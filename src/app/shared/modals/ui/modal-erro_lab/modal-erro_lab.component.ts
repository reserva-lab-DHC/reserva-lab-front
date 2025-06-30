import { Component,EventEmitter, Output } from '@angular/core';
import { DynamicButtonComponent } from "../../../dynamic-button/dynamic-button.component";

@Component({
  selector: 'dhc-modal-erro-lab',
  standalone: true,
  templateUrl: './modal-erro_lab.component.html',
  styleUrls: ['./modal-erro_lab.component.scss'],
  imports: [DynamicButtonComponent]
})
export class ErroLabComponent {
    @Output() fechar = new EventEmitter<void>();

  onFechar() {
    this.fechar.emit();
  }
}