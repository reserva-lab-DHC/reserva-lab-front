import { Component, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dhc-icon-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-button.html',
  styleUrls: ['./icon-button.scss']
})
export class IconButtonComponent {

  iconUrl = input('');
  /* 
  iconWidth = signal('');
  iconHeight = signal(''); 
  o caminho é por aí
  */
  clicked = output();

  onClick() {
    this.clicked.emit();
  }

}
