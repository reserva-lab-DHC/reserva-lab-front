import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { output } from '@angular/core';

@Component({
  selector: 'dynamic-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './dynamic-button.component.html',
  styleUrls: ['./dynamic-button.component.scss']
})
export class DynamicButtonComponent {
  @Input() label: string = 'Botão';
  @Input() type: 'primary' | 'secondary' = 'primary';
  @Input() disabled: boolean = false;
  @Input() color: 'red' | 'white-red' | 'blue' = 'red';
  clicked = output();

  isPressed = false;

  get colorClass() {
    if (this.label.toLowerCase() === 'reservar' && this.type === 'primary') {
      return this.color === 'white-red' ? 'white-red' : 'red';
    }
    if (this.label.toLowerCase() === 'botão' && this.type === 'secondary') {
      return this.color === 'blue' ? 'blue' : 'secondary-default';
    }
    return '';
  }

  getClasses() {
    return {
      [this.type]: true,
      [this.colorClass]: true,
      pressed: this.isPressed
    };
  }
  onClick() {
    this.clicked.emit();
  }
}