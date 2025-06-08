import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
// import { QuadroDeReservasComponent } from "./features/quadro-de-reservas/quadro-de-reservas.component";

@Component({
  selector: 'dhc-app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent {
}
