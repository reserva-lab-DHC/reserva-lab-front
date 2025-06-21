import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicButtonComponent } from '../../../../shared/dynamic-button/dynamic-button.component';
import { InputTextComponent } from '../../../../shared/input-text/input-text.component';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'dhc-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    DynamicButtonComponent,
    InputTextComponent,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  cadastroForm = new FormGroup({
    nomeUsuario: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required),
    repetirSenha: new FormControl('', Validators.required)
  });

  @Output() goToAcesso = new EventEmitter<void>();
  @Output() submitCadastro = new EventEmitter<void>();

  constructor() { }

  cadastrar() {
    if (this.cadastroForm.valid) {
      alert('Formulário de cadastro válido (simulação)!');
      this.submitCadastro.emit();
    } else {
      alert('Formulário de cadastro inválido. Por favor, preencha todos os campos corretamente.');
      this.cadastroForm.markAllAsTouched();
    }
  }
}