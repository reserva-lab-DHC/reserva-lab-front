import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from "../icon-button/icon-button.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'dhc-header-select',
  templateUrl: './header-select.html',
  styleUrls: ['./header-select.scss'],
  imports: [CommonModule, IconButtonComponent, RouterModule]
})
export class HeaderSelectComponent {
  isOpen = signal(false);

  protected openMenu(): void {
    this.isOpen.set(!this.isOpen());
  }
}
