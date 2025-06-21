import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicButtonComponent } from '../../../../shared/dynamic-button/dynamic-button.component';
import { InputTextComponent } from '../../../../shared/input-text/input-text.component';

@Component({
  selector: 'dhc-acesso',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicButtonComponent,
    InputTextComponent
  ],
  templateUrl: './acesso.component.html',
  styleUrl: './acesso.component.scss'
})
export class AcessoComponent implements OnInit {

  @Input() loginForm!: FormGroup;
  @Output() goToCadastro = new EventEmitter<void>();
  @Output() submitLogin = new EventEmitter<void>();

  constructor() { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
      // Este método está vazio por design, pois a lógica de redirecionamento está no LoginComponent (pai).
  }

  login() {
    this.submitLogin.emit();
  }
}