import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicButtonComponent } from '../../../../shared/dynamic-button/dynamic-button.component';

@Component({
  selector: 'dhc-cadastro',
  standalone: true,
  imports: [CommonModule, DynamicButtonComponent],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  @Output() goToAcesso = new EventEmitter<void>();

  onReservar() {
    console.log('Botão Reservar clicado');
  }
}