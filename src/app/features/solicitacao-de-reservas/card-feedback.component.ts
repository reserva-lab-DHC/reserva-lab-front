import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dhc-card-feedback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" [ngClass]="status">
      @if (status === 'erro') {
        <h2>Erro ao Realizar a Reserva</h2>
        <p>{{ message }}</p>
      } @else {
        <h2>Confirmação Reserva</h2>
        <p>{{ message }}</p>
      }
      <button (click)="onButtonClick()">
        {{ status === 'sucesso' ? 'Ok' : 'Tente novamente' }}
      </button>
    </div>
  `,
  styleUrls: ['./card-feedback.component.scss']
})
export class CardFeedbackComponent {
  @Input() message = '';
  @Input() status: 'sucesso' | 'erro' = 'sucesso';
  @Output() botaoClicado = new EventEmitter<void>();

  onButtonClick() {
    this.botaoClicado.emit();
  }
}