import { Component, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicButtonComponent } from '../../../../shared/dynamic-button/dynamic-button.component';
import { InputTextComponent } from '../../../../shared/input-text/input-text.component';
import { AuthDTO, AuthService } from '../../../../core/services/auth.service';

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

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  auth = inject(AuthService);
  @Output() goToCadastro = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      window.location.href = '/inicio';
    }
  }

  async login() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      if (!username || !password) {
        return;
      }
      const user: AuthDTO = {
        username: username,
        rawPassword: password
      }

      try {
        await this.auth.login(user);
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login. Tente novamente mais tarde.');
      }

    } else {
      alert('Por favor, preencha todos os campos corretamente.');
      this.loginForm.markAllAsTouched();
    }
  }
}