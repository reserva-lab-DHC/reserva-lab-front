import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicButtonComponent } from '../../../../shared/dynamic-button/dynamic-button.component';
import { InputTextComponent } from '../../../../shared/input-text/input-text.component';
import { UserDTO } from '../../../../shared/models/user.dto';
import { AuthService } from '../../../../core/services/auth.service';

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
export class AcessoComponent {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  auth = inject(AuthService);
  @Output() goToCadastro = new EventEmitter<void>();

  constructor() { }

  login() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      if (!username || !password) {
        return;
      }
      const user: UserDTO = {
        nomeUsuario: username,
        senha: password
      }
      this.auth.login(user);
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
      this.loginForm.markAllAsTouched();
    }
  }
}