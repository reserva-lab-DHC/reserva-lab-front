import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AcessoComponent } from './ui/acesso/acesso.component';

@Component({
  selector: 'dhc-login',
  standalone: true,
  imports: [ReactiveFormsModule, AcessoComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  returnUrl = '/';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  login() {
    const user = this.loginForm.value;
    this.auth.login(user);

    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/inicio';
    this.router.navigateByUrl(returnUrl);
  }
}
