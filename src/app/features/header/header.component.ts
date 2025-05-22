import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSelectComponent } from './ui/header-select.component/header-select.component';
import { IconButtonComponent } from './ui/icon-button/icon-button.component';

@Component({
  selector: 'dhc-header',
  standalone: true,
  imports: [CommonModule, IconButtonComponent, HeaderSelectComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
