import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dhc-daily-schedule-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily-schedule-header.component.html',
  styleUrls: ['./daily-schedule-header.component.scss']
})
export class DailyScheduleHeaderComponent implements OnInit, AfterViewInit {

  showCalendar = false;
  currentCalendarDate: Date = new Date();
  selectedMainDate: Date = new Date();

  titleCase(value: string): string {
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
  }

  titleCaseMonth(value: string): string {
    return value
      ? value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      : '';
  }
  toggleCalendar(): void {
   this.showCalendar = !this.showCalendar;
 }


  ngOnInit(): void {
    this.updateMainDateDisplay();
  }

  updateMainDateDisplay(): void {
    // Implement your logic here, for example:
    // This could update a display string or perform other actions
    // For now, we'll just log the selectedMainDate
    console.log('Main date display updated:', this.selectedMainDate);
  }

    ngAfterViewInit(): void {
      this.generateCalendarDays();
      // this.addEventListeners(); // Removed or comment out this line to fix the error
    }
  
    generateCalendarDays(): void {

      const calendarGrid = document.getElementById('calendarGrid');
  if (!calendarGrid) return;

  // Limpa os dias anteriores
  calendarGrid.innerHTML = '';

  const year = this.currentCalendarDate.getFullYear();
  const month = this.currentCalendarDate.getMonth();

  // Primeiro dia do mês
  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay() || 7; // Domingo vira 7

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Adiciona espaços vazios
  for (let i = 1; i < startDay; i++) {
    const span = document.createElement('span');
    span.classList.add('empty');
    calendarGrid.appendChild(span);
  }

  // Adiciona os dias
  for (let day = 1; day <= daysInMonth; day++) {
    const span = document.createElement('span');
    span.innerText = String(day);

    span.addEventListener('click', () => {
      this.onDaySelected(year, month, day);
    });

    calendarGrid.appendChild(span);
  }
}
;
  onDaySelected(year: number, month: number, day: number): void {
  this.selectedMainDate = new Date(year, month, day);
  this.updateMainDateDisplay();
  this.showCalendar = false; // fecha o calendário

  // Atualiza a data no DOM
  const dateDisplay = document.getElementById('mainDateDisplay');
  if (dateDisplay) {
    dateDisplay.innerText = this.selectedMainDate.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  }
 
}