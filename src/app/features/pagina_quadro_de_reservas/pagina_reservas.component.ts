import { CommonModule } from '@angular/common';
import { DailyScheduleHeaderComponent } from '../../shared/daily-schedule-header/daily-schedule-header.component';
import { ScheduleTableComponent } from '../../shared/schedule-table/schedule-table.component';
import { Component } from '@angular/core';
import { HeaderQuadroComponent } from "../../shared/header-quadro/header-quadro.component";
import { HeaderComponent } from "../../shared/header/header.component";

@Component({
  selector: 'dhc-pagina-reservas', // Confirme se esse é o seletor correto utilizado na rota.
  standalone: true, // Confirme se o componente realmente é standalone.
  imports: [
    CommonModule,
    // ModalsComponent, // Descomente se for utilizado no HTML.
    DailyScheduleHeaderComponent,
    ScheduleTableComponent,
    HeaderQuadroComponent,
    HeaderComponent
],
  templateUrl: './pagina_reservas.component.html',
  styleUrls: ['./pagina_reservas.component.scss']
})
export class PaginaReservasComponent {
  // Lógica do componente
}