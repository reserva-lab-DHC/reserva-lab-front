import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicButtonComponent } from '../../../../shared/dynamic-button/dynamic-button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

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

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  login() {
    const user = this.loginForm.value;
    this.auth.login(user);

    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/inicio';
    this.router.navigateByUrl(returnUrl);
  }

}