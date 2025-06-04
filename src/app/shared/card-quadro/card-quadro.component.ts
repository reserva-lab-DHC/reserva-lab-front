import { Component, input } from '@angular/core';

@Component({
  selector: 'dhc-card-quadro',
  imports: [],
  templateUrl: './card-quadro.component.html',
  styleUrl: './card-quadro.component.scss'
})

export class CardQuadroComponent {
  textcolor = input<string>('#f0f1f5');
}

