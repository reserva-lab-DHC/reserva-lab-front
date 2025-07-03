import { Component, input, output } from '@angular/core';

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
  imgSrc = input<string>()
  disabled = input(false)
  clicked = output();

  onClick() {
    if (!this.disabled()) {
      this.clicked.emit();
    }
  }
}

