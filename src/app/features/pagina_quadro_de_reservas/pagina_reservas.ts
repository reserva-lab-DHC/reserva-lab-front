import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Se **não** utilizar ModalsComponent em `pagina_reservas.html`, mantenha comentado ou remova.
// Caso utilize, descomente e **verifique o caminho correto**.
// import { ModalsComponent } from '../../shared/modals/modals.component';

// import { DailyScheduleHeaderComponent } from './daily-schedule-header/daily-schedule-header.component';
import { ScheduleTableComponent } from './schedule-table/schedule-table.component';

@Component({
  selector: 'dhc-quadro-de-reservas', // Confirme se esse é o seletor correto utilizado na rota.
  standalone: true, // Confirme se o componente realmente é standalone.
  imports: [
    CommonModule,
    // ModalsComponent, // Descomente se for utilizado no HTML.
    ScheduleTableComponent
  ],
  templateUrl: './pagina_reservas.html',
  styleUrls: ['./pagina_reservas.scss']
})
export class PaginaReservasComponent {
  // Lógica do componente
}
