import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { ModalsComponent } from './shared/modals/modals.component';

@Component({
  selector: 'dhc-app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ModalsComponent],
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'reserva-lab-front';
}
