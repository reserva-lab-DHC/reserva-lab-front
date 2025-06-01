import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef, Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common'; // Importa formatDate para uso de locale

// --- Pipe Personalizado para Capitalizar a Primeira Letra ---
// Será necessário declarar este pipe em um módulo (ex: AppModule)
@Pipe({
  name: 'titlecase' // Nome do pipe a ser usado no HTML
})
export class TitleCaseCustomPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}

// --- Pipe Personalizado para Capitalizar o Mês (para nomes de meses compostos) ---
@Pipe({
  name: 'titlecaseMonth'
})
export class TitleCaseMonthPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }
    // Divide por espaços, capitaliza cada palavra e junta novamente
    return value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
}

@Component({
  selector: 'app-date-navigation-header', // O seletor que você usará no HTML do componente pai
  templateUrl: './date-navigation-header.component.html',
  styleUrls: ['./date-navigation-header.component.scss']
})
export class DateNavigationHeaderComponent implements OnInit, OnDestroy {
  @ViewChild('calendarContainer', { static: true }) calendarContainer!: ElementRef;

  showCalendar: boolean = false;
  currentCalendarDate: Date = new Date(); // Data atualmente exibida no pop-up do calendário
  selectedMainDate: Date = new Date();   // Data principal exibida no cabeçalho

  weekDays: string[] = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']; // Dias da semana para o cabeçalho do calendário

  constructor() { }

  ngOnInit(): void {
    // Inicializa o calendário com a data principal ao carregar o componente
    this.generateCalendarDays();
  }

  // Listener para fechar o calendário quando clicar fora dele
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    // Verifica se o clique não foi dentro do container do calendário
    if (this.showCalendar && !this.calendarContainer.nativeElement.contains(event.target)) {
      this.showCalendar = false;
    }
  }

  ngOnDestroy(): void {
    // No Angular, @HostListener cuida da remoção dos listeners
  }

  /**
   * Avança para o próximo dia.
   */
  goToNextDay(): void {
    this.selectedMainDate.setDate(this.selectedMainDate.getDate() + 1);
    this.currentCalendarDate = new Date(this.selectedMainDate); // Mantém o calendário sincronizado
    this.generateCalendarDays(); // Regenera o calendário para refletir a nova data principal
  }

  /**
   * Volta para o dia anterior.
   */
  goToPrevDay(): void {
    this.selectedMainDate.setDate(this.selectedMainDate.getDate() - 1);
    this.currentCalendarDate = new Date(this.selectedMainDate); // Mantém o calendário sincronizado
    this.generateCalendarDays(); // Regenera o calendário para refletir a nova data principal
  }

  /**
   * Alterna a visibilidade do calendário pop-up.
   */
  toggleCalendar(): void {
    this.showCalendar = !this.showCalendar;
    // Sincroniza o calendário com a data principal do cabeçalho ao abrir
    if (this.showCalendar) {
      this.currentCalendarDate = new Date(this.selectedMainDate);
    }
    this.generateCalendarDays(); // Sempre regenera os dias para garantir que estejam corretos
  }

  /**
   * Gera os dias do calendário para o mês e ano atuais.
   */
  generateCalendarDays(): void {
    this.calendarDays = [];
    const year = this.currentCalendarDate.getFullYear();
    const month = this.currentCalendarDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    let startDay = firstDayOfMonth.getDay();
    startDay = startDay === 0 ? 6 : startDay - 1; // Ajusta Domingo (0) para 6 e os outros -1

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Preenche os dias "vazios" antes do primeiro dia do mês
    for (let i = 0; i < startDay; i++) {
      this.calendarDays.push({ dayNumber: '', date: null });
    }

    // Preenche os dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
      this.calendarDays.push({
        dayNumber: i,
        date: new Date(year, month, i)
      });
    }

    // Opcional: preencher os dias "vazios" após o último dia do mês para completar a grade
    const totalCells = 42; // 6 semanas * 7 dias
    while (this.calendarDays.length < totalCells) {
      this.calendarDays.push({ dayNumber: '', date: null });
    }
  }

  /**
   * Navega para o mês anterior no calendário pop-up.
   */
  prevMonth(): void {
    this.currentCalendarDate.setMonth(this.currentCalendarDate.getMonth() - 1);
    this.generateCalendarDays();
  }

  /**
   * Navega para o próximo mês no calendário pop-up.
   */
  nextMonth(): void {
    this.currentCalendarDate.setMonth(this.currentCalendarDate.getMonth() + 1);
    this.generateCalendarDays();
  }

  /**
   * Verifica se uma data é a data principal selecionada.
   * @param date A data a ser verificada.
   * @returns True se for a data selecionada, False caso contrário.
   */
  isSelected(date: Date | null): boolean {
    if (!date || !this.selectedMainDate) {
      return false;
    }
    return date.toDateString() === this.selectedMainDate.toDateString();
  }

  /**
   * Verifica se uma data é o dia atual (hoje).
   * @param date A data a ser verificada.
   * @returns True se for o dia atual, False caso contrário.
   */
  isCurrentDay(date: Date | null): boolean {
    if (!date) {
      return false;
    }
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  /**
   * Seleciona uma data do calendário, atualiza a data principal e fecha o calendário.
   * @param date A data selecionada.
   */
  selectDate(date: Date | null): void {
    if (date) {
      this.selectedMainDate = new Date(date); // Atualiza a data principal
      this.toggleCalendar();                   // Fecha o calendário (e regenera os dias)
    }
  }
}