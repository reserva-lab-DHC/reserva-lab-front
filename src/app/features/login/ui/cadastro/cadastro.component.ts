import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicButtonComponent } from '../../../../shared/dynamic-button/dynamic-button.component';
import { InputTextComponent } from '../../../../shared/input-text/input-text.component';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserDTO } from '../../../../shared/models/user.dto';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const repassword = control.get('repassword');

  if (password && repassword && password.value !== repassword.value) {
    return { mismatch: true };
  }
  return null;
}

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
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    repassword: new FormControl('', Validators.required)
  }, { validators: passwordMatchValidator });

  auth = inject(AuthService);
  @Output() goToAcesso = new EventEmitter<void>();
  @Output() submitCadastro = new EventEmitter<void>();

  constructor(private router: Router) { }

  async cadastrar() {
    if (this.cadastroForm.valid) {
      const nomeDeUsuario = this.cadastroForm.get('username')?.value as string;
      const senhaDoUsuario = this.cadastroForm.get('password')?.value as string;
      const emailDoUsuario = this.cadastroForm.get('email')?.value as string;

      const user: UserDTO = {
        username: nomeDeUsuario,
        rawPassword: senhaDoUsuario,
        email: emailDoUsuario,
        role: 'ADMIN' //so cria admin kkkkkkkkk
      };

      const res = await this.auth.register(user);
      if (res) {
        alert('Cadastro realizado com sucesso!');
        localStorage.setItem('currentUser', JSON.stringify(res));
        this.router.navigate(['/inicio']);
      } else {
        alert('Erro ao cadastrar usuário. Tente novamente mais tarde.');
      }

    } else {
      alert('Por favor, preencha todos os campos corretamente.');
      this.cadastroForm.markAllAsTouched();
    }
  }
}