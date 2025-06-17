import { Component, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AcessoComponent } from './ui/acesso/acesso.component';
import { CadastroComponent } from './ui/cadastro/cadastro.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dhc-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AcessoComponent,
    CadastroComponent,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  isCadastro = signal(false);

  returnUrl = '/';

  constructor() { }

  changeForm() {
    this.isCadastro.update(value => !value);
  }
}