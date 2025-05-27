import { Component, input } from '@angular/core';

@Component({
  selector: 'dhc-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})

export class CardComponent {
  titulo = input.required<string>()
  horario1 = input.required<string>()
  horario2 = input.required<string>()
  andar = input.required<string>()
  imgSrc = input.required<string>()
}

