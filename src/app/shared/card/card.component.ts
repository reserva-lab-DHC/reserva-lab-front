import { Component, input, output, computed } from '@angular/core';
import { Fotos, FotosPorNumero } from '../models/fotos.enum';

@Component({
  selector: 'dhc-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})

export class CardComponent {
  titulo = input<string>()
  horario1 = input<string>()
  horario2 = input<string>()
  andar = input<string>()
  fotoTipo = input<string>() // Recebe como string do template
  disabled = input(false)
  clicked = output();

  // Computed para obter a URL da imagem baseada no número
  imgSrc = computed(() => {
    const numeroTipo = this.fotoTipo();
    const numero = numeroTipo ? parseInt(numeroTipo, 10) : 0;
    return FotosPorNumero[numero] || Fotos.Sala; // Fallback para Sala
  });

  onClick() {
    if (!this.disabled()) {
      this.clicked.emit();
    }
  }
}

