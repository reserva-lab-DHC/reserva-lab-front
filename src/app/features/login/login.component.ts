import { Component, effect, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
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

  btnText = signal('Não tem cadastro? Crie agora!');

  returnUrl = '/';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    effect(() => {
      this.btnText.set(this.isCadastro() ? 'Já tem cadastro? Acesse agora!' : 'Não tem cadastro? Crie agora!');
    });
  }

  login() {
    const user = this.loginForm.value;
    this.auth.login(user);

    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/inicio';
    this.router.navigateByUrl(returnUrl);
  }

  changeForm() {
    this.isCadastro.update(value => !value);
  }
}