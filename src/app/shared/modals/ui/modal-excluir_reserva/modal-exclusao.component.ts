import { Component,EventEmitter, Output } from '@angular/core';
import { DynamicButtonComponent } from "../../../dynamic-button/dynamic-button.component";

@Component({
  selector: 'dhc-modal-exclusao',
  standalone: true,
  templateUrl: './modal-exclusao.component.html',
  styleUrls: ['./modal-exclusao.component.scss'],
  imports: [DynamicButtonComponent]
})
export class ExclusaoComponent {
  @Output() fechar = new EventEmitter<void>();

  onFechar() {
    this.fechar.emit();
  }
}