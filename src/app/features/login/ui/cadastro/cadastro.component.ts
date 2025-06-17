import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicButtonComponent } from '../../../../shared/dynamic-button/dynamic-button.component';
import { InputTextComponent } from '../../../../shared/input-text/input-text.component';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
    nomeUsuario: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required),
    repetirSenha: new FormControl('', Validators.required)
  });

  @Output() goToAcesso = new EventEmitter<void>();

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  cadastrar() {
    if (this.cadastroForm.valid) {
      alert('Cadastrado com sucesso!');
      const user = this.cadastroForm.value;
      this.auth.login(user);
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/inicio';
      this.router.navigateByUrl(returnUrl);
    } else {
      alert('Formulário de cadastro inválido');
    }
  }
}