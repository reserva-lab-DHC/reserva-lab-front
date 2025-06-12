import { Component,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'dhc-modal-erro',
  standalone: true,
  templateUrl: './modal-erro.component.html',
  styleUrls: ['./modal-erro.component.scss']
})
export class ErroComponent {
    @Output() fechar = new EventEmitter<void>();

  onFechar() {
    this.fechar.emit();
  }
}
