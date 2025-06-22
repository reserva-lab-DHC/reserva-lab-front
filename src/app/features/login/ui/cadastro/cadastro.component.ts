import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicButtonComponent } from '../../../../shared/dynamic-button/dynamic-button.component';
import { InputTextComponent } from '../../../../shared/input-text/input-text.component';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserDTO } from '../../../../shared/models/user.dto';
import { AuthService } from '../../../../core/services/auth.service';

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
  });

  auth = inject(AuthService);
  @Output() goToAcesso = new EventEmitter<void>();

  constructor() { }

  cadastrar() {
    if (this.cadastroForm.valid) {
      const username = this.cadastroForm.get('username')?.value;
      const password = this.cadastroForm.get('password')?.value;
      const email = this.cadastroForm.get('email')?.value;
      const repassword = this.cadastroForm.get('repassword')?.value;

      if (password !== repassword) {
        //usa o setErrors para adicionar um erro ao campo de senha
        // this.cadastroForm.get('repassword')?.setErrors({ mismatch: true }); <- talvez isso funcione
        return;
      }

      if (!username || !password || !email || !repassword) {
        return;
      }

      const user: UserDTO = {
        nomeUsuario: username,
        senha: password
      }
        this.auth.login(user);
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
      this.cadastroForm.markAllAsTouched();
    }

  }
}