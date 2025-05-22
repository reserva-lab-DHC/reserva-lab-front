import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './features/header/header.component';
import { FooterComponent } from "./features/footer/footer.component";

@Component({
  selector: 'dhc-app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'reserva-lab-front';
}
