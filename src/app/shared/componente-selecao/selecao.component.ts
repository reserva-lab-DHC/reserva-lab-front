import {
  Component, input, output, forwardRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR,
  FormsModule, ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'dhc-selecao',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './selecao.component.html',
  styleUrls: ['./selecao.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelecaoComponent),
      multi: true
    }
  ]
})
export class SelecaoComponent implements ControlValueAccessor {
  titulo = input<string>('');
  opcoes = input<number[]>([]);
  desabilitar = input<number[]>([]);
  layout = input<'horizontal' | 'vertical'>('horizontal');

  // Internal model for value
  private _value: number | null = null;

  // Output for standalone usage
  selecionadoChange = output<number>();

  // ControlValueAccessor callbacks
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onChange: (value: number | null) => void = () => { };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onTouched: () => void = () => { };

  // Getter for template
  selecionado(): number | null {
    return this._value;
  }

  writeValue(value: number | null): void {
    this._value = value;
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  selecionar(valor: number): void {
    if (this._value !== valor && !this.desabilitar().includes(valor)) {
      this._value = valor;
      this._onChange(valor);
      this._onTouched();
      this.selecionadoChange.emit(valor);
    }
  }

  estaDesabilitado(valor: number): boolean {
    return this.desabilitar().includes(valor);
  }
}