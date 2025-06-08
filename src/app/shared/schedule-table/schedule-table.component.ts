import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { CelulaQuadroComponent } from '../celula-quadro/celula-quadro.component';
import { InfoComponent } from "../modals/ui/modal-info-reserva/modal-info.component";
import { HeaderQuadroComponent } from "../header-quadro/header-quadro.component";

@Component({
  selector:'dhc-schedule-table', 
  standalone: true, 
  imports: [CommonModule, CelulaQuadroComponent, InfoComponent, NgIf], 
  templateUrl: './schedule-table.component copy.html', 
  styleUrls: ['./schedule-table.component copy.scss'] 
})
export class ScheduleTableComponent {

  showPopup = false;

  closePopup() {
    this.showPopup = false;
  }
}