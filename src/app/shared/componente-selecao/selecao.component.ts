import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dhc-selecao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selecao.component.html',
  styleUrls: ['./selecao.component.scss']
})
export class SelecaoComponent {
  @Input() titulo = '';
  @Input() opcoes: number[] = [];
  @Input() selecionado: number | null = null;
  @Input() desabilitar: number[] = [];
  @Input() layout = 'horizontal';

  @Output() selecionadoChange = new EventEmitter<number>();

  selecionar(valor: number): void {
    if (this.selecionado !== valor && !this.desabilitar.includes(valor)) {
      this.selecionado = valor;
      this.selecionadoChange.emit(valor);
    }
  }

  estaDesabilitado(valor: number): boolean {
    return this.desabilitar.includes(valor);
  }
}
