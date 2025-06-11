import { Component, Input, Output, EventEmitter } from '@angular/core'; 
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicButtonComponent } from '../../../../shared/dynamic-button/dynamic-button.component'; 

@Component({
  selector: 'dhc-acesso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DynamicButtonComponent], 
  templateUrl: './acesso.component.html',
  styleUrl: './acesso.component.scss'
})
export class AcessoComponent {
  @Input() loginForm!: FormGroup;
  @Output() goToCadastro = new EventEmitter<void>(); 

  login() {
    console.log('Botão Acessar clicado no AcessoComponent');
  }
}