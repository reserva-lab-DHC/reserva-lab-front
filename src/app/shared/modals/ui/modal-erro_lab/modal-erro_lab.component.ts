import { Component,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'dhc-modal-erro-lab',
  standalone: true,
  templateUrl: './modal-erro_lab.component.html',
  styleUrls: ['./modal-erro_lab.component.scss']
})
export class ErroLabComponent {
    @Output() fechar = new EventEmitter<void>();

  onFechar() {
    this.fechar.emit();
  }
}
