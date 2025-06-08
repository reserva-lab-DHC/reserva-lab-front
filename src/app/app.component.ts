import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { PaginaReservasComponent } from "./features/pagina_quadro_de_reservas/pagina_reservas.component";

@Component({
  selector: 'dhc-app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, PaginaReservasComponent],
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent {
}
