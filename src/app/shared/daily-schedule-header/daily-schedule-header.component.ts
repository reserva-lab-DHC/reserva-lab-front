import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, DatePipe } from '@angular/common'; // Adicionado NgIf e DatePipe para standalone components

interface CalendarDay {
  dayNumber: number | '';
  empty: boolean;
  date?: Date; // Opcional, será preenchido para dias válidos
}

@Component({
  selector: 'dhc-daily-schedule-header',
  standalone: true,
  imports: [CommonModule, NgIf, DatePipe], // DatePipe é necessário para o pipe 'date' no template
  templateUrl: './daily-schedule-header.component.html',
  styleUrls: ['./daily-schedule-header.component.scss']
})
export class DailyScheduleHeaderComponent implements OnInit {

  showCalendar = false;
  currentCalendarDate: Date = new Date(); // Controla o mês e ano do calendário pop-up
  selectedMainDate: Date = new Date();    // A data principal exibida e selecionada
  calendarDays: CalendarDay[] = [];       // Array para armazenar os dias a serem exibidos no calendário

  ngOnInit(): void {
    // Apenas para garantir que a data principal esteja inicialmente renderizada
    this.generateCalendarDays(); // Gera os dias do calendário ao iniciar
  }

  // Helper para capitalizar a primeira letra de cada palavra (útil para meses)
  titleCaseMonth(value: string): string {
    return value
      ? value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      : '';
  }

  toggleCalendar(): void {
    this.showCalendar = !this.showCalendar;
    if (this.showCalendar) {
      this.generateCalendarDays(); // Regenera os dias sempre que o calendário é aberto
    }
  }

  // --- Navegação da Data Principal (Header) ---
  goToPreviousDay(): void {
    this.selectedMainDate = new Date(this.selectedMainDate.setDate(this.selectedMainDate.getDate() - 1));
    this.currentCalendarDate = new Date(this.selectedMainDate); // Mantém o calendário sincronizado
    this.generateCalendarDays();
  }

  goToNextDay(): void {
    this.selectedMainDate = new Date(this.selectedMainDate.setDate(this.selectedMainDate.getDate() + 1));
    this.currentCalendarDate = new Date(this.selectedMainDate); // Mantém o calendário sincronizado
    this.generateCalendarDays();
  }

  // --- Navegação do Calendário Pop-up ---
  goToPreviousMonth(): void {
    this.currentCalendarDate = new Date(this.currentCalendarDate.getFullYear(), this.currentCalendarDate.getMonth() - 1, 1);
    this.generateCalendarDays();
  }

  goToNextMonth(): void {
    this.currentCalendarDate = new Date(this.currentCalendarDate.getFullYear(), this.currentCalendarDate.getMonth() + 1, 1);
    this.generateCalendarDays();
  }

  // --- Geração e Seleção de Dias do Calendário ---
  generateCalendarDays(): void {
    const year = this.currentCalendarDate.getFullYear();
    const month = this.currentCalendarDate.getMonth();

    const firstDay = new Date(year, month, 1);
    // getDay() retorna 0 para Domingo, 1 para Segunda...
    // Queremos 1 para Segunda, 7 para Domingo. Ajuste para o cálculo do grid.
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // 0=Dom vira 6 (último), 1=Seg vira 0 (primeiro)

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    this.calendarDays = [];

    // Adiciona espaços vazios (dias do mês anterior)
    for (let i = 0; i < startDay; i++) {
      this.calendarDays.push({ dayNumber: '', empty: true });
    }

    // Adiciona os dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      this.calendarDays.push({
        dayNumber: day,
        empty: false,
        date: new Date(year, month, day)
      });
    }
  }

  onDaySelected(date: Date): void {
    this.selectedMainDate = date; // Atualiza a data principal
    this.showCalendar = false;    // Fecha o calendário
    // Não precisa mais de updateMainDateDisplay() nem de document.getElementById('mainDateDisplay').innerText
    // O binding {{ selectedMainDate | date }} no HTML já lida com a atualização.
  }

  // Métodos para aplicar classes CSS dinamicamente
  isSelectedDate(date: Date): boolean {
    return this.selectedMainDate.toDateString() === date.toDateString();
  }

  isCurrentDay(date: Date): boolean {
    const today = new Date();
    return today.toDateString() === date.toDateString();
  }
}