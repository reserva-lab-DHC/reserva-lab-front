import { Component,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'dhc-modal-exclusao',
  standalone: true,
  templateUrl: './modal-exclusao.component.html',
  styleUrls: ['./modal-exclusao.component.scss']
})
export class ExclusaoComponent {
  @Output() fechar = new EventEmitter<void>();

  onFechar() {
    this.fechar.emit();
  }
}