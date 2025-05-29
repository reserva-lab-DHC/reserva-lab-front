import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { ConfirmarSolicitacoesComponent } from './features/confirmar-solicitacoes/confirmar-solicitacoes.component';
import { ConfirmRequestComponent } from './shared/confirm-request/confirm-request.component';

@Component({
  selector: 'dhc-app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ConfirmarSolicitacoesComponent, ConfirmRequestComponent],
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent {
}
