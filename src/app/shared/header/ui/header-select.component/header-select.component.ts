import { Component, signal, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from "../icon-button/icon-button.component";

@Component({
  selector: 'dhc-header-select',
  templateUrl: './header-select.html',
  styleUrls: ['./header-select.scss'],
  imports: [CommonModule, IconButtonComponent]
})
export class HeaderSelectComponent {
  isOpen = signal(false);

  @ViewChild('menuContainer', { static: false }) menuRef!: ElementRef;

  openMenu(): void {
    this.isOpen.set(!this.isOpen());
  }

  showMenu(): void {
    this.isOpen.set(true);
  }

  closeMenu(): void {
    this.isOpen.set(false);
  }

  isMenuOpen(): boolean {
    return this.isOpen();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.isOpen() && this.menuRef && !this.menuRef.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }

  @HostListener('document:keyup.enter')
  onEnterKey(): void {
    this.openMenu();
  }
}
