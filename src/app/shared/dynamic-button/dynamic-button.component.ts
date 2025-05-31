import { Component, input, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { output } from '@angular/core';


export type ButtonType = "primary" | "secondary";
export type ButtonColor = "red" | "white-red" | "blue";
@Component({
  selector: 'dhc-dynamic-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './dynamic-button.component.html',
  styleUrls: ['./dynamic-button.component.scss']
})
export class DynamicButtonComponent {
  label = input('');
  type = input<ButtonType>("primary");
  disabled = input(false);
  isPressed = signal(false);
  color = input<ButtonColor>("red");
  clicked = output();



  get colorClass() {
    if (this.label().toLowerCase() === 'reservar' && this.type() === 'primary') {
      return this.color() === 'white-red' ? 'white-red' : 'red';
    }
    if (this.label().toLowerCase() === 'botão' && this.type() === 'secondary') {
      return this.color() === 'blue' ? 'blue' : 'secondary-default';
    }
    return '';
  }

  getClasses() {
    return {
      [this.type()]: true,
      [this.color()]: true,
      pressed: this.isPressed()
    };
  }
  
  onClick() {
    this.clicked.emit();
  }
}