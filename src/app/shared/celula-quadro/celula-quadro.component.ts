import { Component, Input } from '@angular/core';

@Component({
  selector: 'dhc-card-quadro',
  imports: [],
  templateUrl: './celula-quadro.component.html',
  styleUrl: './celula-quadro.component.scss'
})

export class CardQuadroComponent {
  @Input() cellColor = '#f0f1f5';
}

