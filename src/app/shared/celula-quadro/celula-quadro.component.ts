import { Component } from '@angular/core';

@Component({
  selector: 'dhc-celula-quadro',
  imports: [],
  templateUrl: './celula-quadro.component.html',
  styleUrl: './celula-quadro.component.scss'
})

export class CelulaQuadroComponent {

  showPopup = false;

  closePopup() {
    this.showPopup = false;
  }
}

