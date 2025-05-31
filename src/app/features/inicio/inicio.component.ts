import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { DynamicButtonComponent } from "../../shared/dynamic-button/dynamic-button.component";

@Component({
  selector: 'dhc-inicio',
  imports: [CommonModule, DynamicButtonComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  authService = inject(AuthService);
}
