import { Component, input, output, } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dhc-selecao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selecao.component.html',
  styleUrls: ['./selecao.component.scss']
})
export class SelecaoComponent {

  titulo = input<string>('');
  opcoes = input<number[]>([]);
  selecionado = input<number | null>(null);
  desabilitar = input<number[]>([]);
  layout = input<'horizontal' | 'vertical'>('horizontal');
  selecionadoChange = output<number>();

  selecionar(valor: number): void {
    if (this.selecionado() !== valor && !this.desabilitar().includes(valor)) {
      this.selecionadoChange.emit(valor);
    }
  }

  estaDesabilitado(valor: number): boolean {
    return this.desabilitar().includes(valor);
  }
}
