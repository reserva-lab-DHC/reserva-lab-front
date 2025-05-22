import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dhc-icon-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-button.html',
  styleUrls: ['./icon-button.scss']
})
export class IconButtonComponent {
  @Input() isMenuOpen = false;
  @Output() toggleMenu = new EventEmitter<void>();

  onClick() {
    this.toggleMenu.emit();
  }
}
